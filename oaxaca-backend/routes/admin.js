import express from "express";
import { Status } from "@prisma/client";
import prisma from "../lib/prisma.js";

const router = express.Router();

// api handler for user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  // find user by username
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // check if user exists
  if (!user) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }

  // check if password matches
  if (user.password === password) {
    res.json({
      user,
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
});

// get all users
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});

  res.json({
    users,
  });
});

// endpoint to get all users
router.post("/users", async (req, res) => {
  const { username, role, firstname, lastname, email, password } = req.body;
  // create user in the database
  const user = await prisma.user.create({
    data: {
      username,
      role,
      firstname,
      lastname,
      email,
      password,
    },
  });

  res.json({
    user,
  });
});

// endpoint to update a user
router.put("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const editingUser = req.body;

  const { username, role, firstname, lastname, email, password } = editingUser;
  try {
    // update user in the databse
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        role,
        firstname,
        lastname,
        email,
        password,
      },
    });
    res.json({ user: updatedUser });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to update menu
router.put("/menu/:menuId", async (req, res) => {
  const menuId = parseInt(req.params.menuId);
  const editingItem = req.body;
  try {
    const updatedMenu = await prisma.menu.update({
      where: {
        id: menuId,
      },
      data: {
        name: editingItem.name,
        price: parseFloat(editingItem.price),
        categoryId: editingItem.categoryId,
        description: editingItem.description,
        image: editingItem.image,
      },
    });
    res.json({ item: updatedMenu });
    return updatedMenu;
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to update categories
router.put("/categories/:categoryId", async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const editingCategory = req.body;
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: editingCategory.name,
      },
    });
    res.json({ category: updatedCategory });
    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to delete a user
router.delete("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  console.log("userId:", userId);
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to delete menu
router.delete("/menu/:menuId", async (req, res) => {
  const menuId = parseInt(req.params.menuId);

  console.log("menuId:", menuId);
  try {
    await prisma.menu.delete({
      where: {
        id: menuId,
      },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to delete a category
router.delete("/category/:categoryId", async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  console.log("categoryId:", categoryId);
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get all orders based on the filters
router.get("/orders", async (req, res) => {
  const { status } = req.query;

  try {
    if (status) {
      const orders = await prisma.order.findMany({
        where: {
          status,
        },
        include: {
          order_menus: {
            include: {
              menu: true,
            },
          },
        },
      });
      return res.json({ orders });
    }

    const orders = await prisma.order.findMany({
      include: {
        order_menus: {
          include: {
            menu: true,
          },
        },
      },
    });
    return res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create an order
router.post("/orders", async (req, res) => {
  const orderData = req.body;
  const items = orderData.items;

  try {
    const responseData = await prisma.order.create({
      data: {
        table_no: parseInt(orderData.table_no),
        order_menus: {
          create: items.map((item) => {
            return {
              menu: {
                connect: {
                  id: item.id,
                },
              },
              quantity: item.quantity,
            };
          }),
        },
        status: "PROCESSING",
      },
    });

    res.status(201).json({
      ...responseData,
      order_menus: items,
    });
  } catch (error) {
    console.error("Error seeding order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update order status to paid
router.put("/orders/paid", async (req, res) => {
  const requestBody = req.body;
  const orderIds = requestBody.orderIds;

  try {
    await prisma.order.updateMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      data: {
        status: Status.PAID,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update order status to cancelled
router.put("/orders/:orderId/cancel", async (req, res) => {
  console.log(req.params.orderId);

  const orderId = parseInt(req.params.orderId);

  try {
    const updatedOrder = await updateOrderStatus(orderId, "CANCELLED");
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update order status to ready to deliver
router.put("/orders/:orderId/ready-to-deliver", async (req, res) => {
  console.log(req.params.orderId);

  const orderId = parseInt(req.params.orderId);

  try {
    const updatedOrder = await updateOrderStatus(orderId, Status.READY);
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update order status to delivered
router.put("/orders/:orderId/delivered", async (req, res) => {
  console.log(req.params.orderId);

  const orderId = parseInt(req.params.orderId);

  try {
    const updatedOrder = await updateOrderStatus(orderId, "DONE");
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete an order
router.delete("/orders/:orderId", async (req, res) => {
  const orderId = parseInt(req.params.orderId);

  console.log("orderId:", orderId);
  try {
    await prisma.orderMenu.deleteMany({
      where: {
        orderId,
      },
    });
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    res.json({ success: true, deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// helper function to update order status
const updateOrderStatus = async (orderId, status) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};

// api handler for calling waiter
router.post("/AssistanceRequests", async (req, res) => {
  const RequestData = req.body;
  const tableNumber = parseInt(RequestData.tableNumber);
  const Reason = RequestData.reason;
  console.log("Received request body:", RequestData);
  try {
    console.log(
      "Calling seedCallWaiter with tableNumber:",
      RequestData.tableNumber,
      "and reason:",
      RequestData.reason
    );
    await seedCallWaiter(tableNumber, Reason);
    res.status(201).json(RequestData);
  } catch (error) {
    console.error("Error seeding order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// list all assistance requests
router.get("/staff/Assistance", async (req, res) => {
  try {
    const requests = await prisma.CallWaiter.findMany();
    res.json({ requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete an assistance request
router.delete("/staff/AssistanceDelete/:tableNo", async (req, res) => {
  const tableNo = parseInt(req.params.tableNo);
  try {
    const deletedRequest = await prisma.CallWaiter.deleteMany({
      where: {
        table_no: tableNo,
      },
    });
    res.json({ success: true, deletedRequest });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
