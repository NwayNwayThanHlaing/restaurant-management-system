import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bodyParser from "body-parser";
import adminRouter from "./routes/admin.js";
import { seedCallWaiter } from "./prisma/data-seeding/WaiterRequest.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const port = 3333;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// creating a Socket.IO instance
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("a user connected");

  // handling new order event
  socket.on("new-order", (order) => {
    console.log("New order");
    socket.broadcast.emit("new-order", order);
  });

  // handling status changed event
  socket.on("status-changed", (order) => {
    console.log("Status changed");
    socket.broadcast.emit("status-changed", order);
  });
});

// admin router for routes starting with /admin
app.use("/admin", adminRouter);

// endpoint to get all categories
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({});

  res.json({
    categories,
  });
});

// endpoint to create a new category
app.post("/categories", async (req, res) => {
  const { name } = req.body;

  // creating a new category in the database
  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  res.json({
    category,
  });
});

// endpoint to get all menu items
app.get("/menu", async (req, res) => {
  const menus = await prisma.menu.findMany({
    include: {
      category: true,
    },
  });

  res.json({
    menus,
  });
});

// enpoint to create new menu item
app.post("/menu", async (req, res) => {
  const { name, price, category, description, calories, allergens } = req.body;

  // creating a new menu item in the database
  const menu = await prisma.menu.create({
    data: {
      name,
      price: parseInt(price),
      category: {
        connect: {
          id: parseInt(category),
        },
      },
      description: description,
      image: "backgroundg.png",
      calories: "Calories: " + calories + " kcal" || "",
      spice: "",
      allergens: allergens,
    },
  });

  res.json({
    menu,
  });
});

// endpoint to create a new assistance request
app.post("/AssistanceRequests", async (req, res) => {
  const RequestData = req.body;
  const tableNumber = parseInt(RequestData.tableNumber);
  const Reason = RequestData.reason;
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

// endpoint to get all assistance requests
app.get("/staff/Assistance", async (req, res) => {
  try {
    const requests = await prisma.CallWaiter.findMany();
    res.json({ requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// endpoint to delete assistance requests by table number
app.delete("/staff/AssistanceDelete/:tableNo", async (req, res) => {
  const tableNo = parseInt(req.params.tableNo);
  try {
    // deleting assistance requests from the database
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

// starting the server and listening on specified port
server.listen(port, () => {
  console.log(`Oaxaca backend is listening on port ${port}`);
});
