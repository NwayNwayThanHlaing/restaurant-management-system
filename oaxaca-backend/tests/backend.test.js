//importing necessary modules for carrying out tests
const request = require("supertest");
const express = require("express");
const app = express();

//sending a request to fetch all menu categories
app.get("/categories", (req, res) => {
  const categories = [
    //categories stored inside an array once fetched
    { id: 1, name: "All" },
    { id: 2, name: "Starters" },
    { id: 3, name: "Main Course" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Drinks" },
  ];

  //JSON response sent to client in order to display all categories
  res.json({ categories });
});

//checking if menu items can be fetched individually with their corresponding details
app.get("/menu", (req, res) => {
  const menus = [
    {
      name: "Churros",
      price: 3.4,
      image: "churros.jpg",
      description: "Delicious churros with chocolate sauce",
      categoryId: 4,
    },
    {
      name: "Tacos",
      price: 2.5,
      image: "tacos.jpg",
      description: "Tacos with meat, salad and cheese, served with salsa",
      categoryId: 2,
    },
    {
      name: "Quesadilla",
      price: 4.5,
      image: "quesadilla.jpg",
      description: "Quesadilla with cheese and meat, served with salad",
      categoryId: 3,
    },
    {
      name: "Burrito",
      price: 5.5,
      image: "burrito.jpg",
      description: "Burrito with rice, beans, meat, salad and cheese",
      categoryId: 2,
    },
    {
      name: "Nachos",
      price: 6.5,
      image: "nachos.jpg",
      description: "Nachos with cheese, salsa, guacamole and sour cream",
      categoryId: 2,
    },
    {
      name: "Coke",
      price: 2,
      image: "coke.jpg",
      description: "Coke",
      categoryId: 5,
    },
  ];

  //JSON response sent to client in order to display the menu
  res.json({
    menus,
  });
});

//testing if correct route is followed when responding to the initial request for categories
//fetched from that location
describe("GET /categories", () => {
  it("should respond with an array of categories", async () => {
    const response = await request(app).get("/categories"); //waiting for server response
    expect(response.status).toBe(200); //status code 200 shows that the page has been loaded successfully
    expect(response.body).toHaveProperty("categories"); //checking for the name 'categories' ensures that the correct array has been fetched
    expect(Array.isArray(response.body.categories)).toBe(true); //checking that request response is in the form of an array
    expect(response.body.categories.length).toBeGreaterThan(0); //checking that the length of the array is greater than 0
  });
});

//testing if correct route is followed when the server responds to request for fetching menu items
describe("GET /menu", () => {
  it("should respond with an array of menu items", async () => {
    const response = await request(app).get("/menu"); //waiting for server response
    expect(response.status).toBe(200); //status code 200 shows that the page has been loaded successfully
    expect(response.body).toHaveProperty("menus"); //checking for the name 'menus' ensures that the correct array has been fetched
    expect(Array.isArray(response.body.menus)).toBe(true); //checking that request response is in the form of an array
    expect(response.body.menus.length).toBeGreaterThan(0); //checking that the length of the array is greater than 0

    const firstMenuItem = response.body.menus[0]; //choosing a random menu item for further testing
    expect(firstMenuItem).toHaveProperty("name"); //checking that menu item has a nem
    expect(firstMenuItem).toHaveProperty("price"); //checking that the menu item has a price
    expect(firstMenuItem).toHaveProperty("image"); //checking that the menu items is accompanied by an image
    expect(firstMenuItem).toHaveProperty("description"); //checking that the menu item has a short description for intuitive ordering
    expect(firstMenuItem).toHaveProperty("categoryId"); //checking that the menu item belongs to a specific category
  });
});

//mocking the Prisma user object to test waiter functionalities
const prisma = {
  user: {
    findUnique: jest.fn(),
  },
};

//router used for reaching locations that functions will be fetched from
const router = express.Router();

//sending a request to server for logging into waiter account
router.post("/login", async (req, res) => {
  const { username, password } = req.body; //storing user credentials

  const user = await prisma.user.findUnique({ where: { username } }); //searching for user in database by username
  if (!user || user.password !== password) {
    //checking if user credentials are valid
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ user });
});

app.use(express.json());
app.use("/api", router);

describe("POST /api/login", () => {
  it("should return user data if valid credentials are provided", async () => {
    //checking that necessary data is presented to waiter once logged in
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: "staff1",
      password: "staff1",
    });
    const response = await request(app)
      .post("/api/login")
      .send({ username: "staff1", password: "staff1" }); //looking up user in database to make sure they are authenticated
    expect(response.status).toBe(200); //status code checks if page loads up successfully
    expect(response.body).toHaveProperty("user");
  });

  //testing that invalid credentials are rejected
  it("should return an error message if invalid credentials are provided", async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null);
    const response = await request(app)
      .post("/api/login")
      .send({ username: "wrong_user", password: "wrong_password" });
    expect(response.status).toBe(400); //status code for not loading waiter home page if user is not authenticated
    expect(response.body).toEqual({ message: "Invalid credentials" }); //ensuring error message is correct
  });
});

//new prisma mock object for testing the fetching of orders
const prisma_new = {
  order: {
    findMany: jest.fn(),
  },
};

//testing the fetching of orders by sending a request to the server
router.get("/orders", async (req, res) => {
  try {
    const orders = await prisma_new.order.findMany({}); //waiting for orders to be sent back by server; checking that there are multiple orders
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error); //checking that appropriate error message is displayed if fetching cannot be completed
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.json());
app.use("/api", router);

//creating a set of mock orders to test if they are correctly fetched from the database
describe("GET /api/orders", () => {
  it("should return all orders", async () => {
    const mockOrders = [{ id: 1, total: 20 }]; //set number of orders is 20
    prisma_new.order.findMany.mockResolvedValueOnce(mockOrders); //mock orders stored in arrat
    const response = await request(app).get("/api/orders"); //requesting array of orders from server

    expect(response.status).toBe(200); //status code checks if page loads up
    expect(response.body).toEqual({ orders: mockOrders }); //checking that server responds with correct array
  });
});

//new mock prisma object for testing purposes
const prisma_ordering = { order: { create: jest.fn() } };

//requesting for an order to be sent to server
router.post("/orders", async (req, res) => {
  const orderData = req.body;
  try {
    //creating an order using necessary details
    await prisma_ordering.order.create({
      data: {
        table_no: parseInt(orderData.table_no),
        order_menus: {
          create: orderData.items.map(
            (
              item //mapping order to its corresponding details inside database
            ) => ({
              menu: { connect: { id: item.id } },
              quantity: item.quantity,
            })
          ),
        },
        status: "PROCESSING",
      },
    });
    res.status(201).json(orderData); //status code shows request has been fulfilled
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); //ensuring that error message is sent through if order cannot be created
  }
});
app.use(express.json());
app.use("/api", router);

//test case using specific values for order properties
describe("POST /api/orders", () => {
  const mockOrderData = {
    table_no: 1,
    items: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ],
  }; //values chosen at random as mock data

  it("should create an order", async () => {
    prisma_ordering.order.create.mockResolvedValueOnce(); //calling function for creating the order
    const response = await request(app).post("/api/orders").send(mockOrderData); //sending a request for it to be added to server and waiting for response
    expect(response.status).toBe(201); //status code ensures request has been fulfilled
    expect(response.body).toEqual(mockOrderData); //checking that the response includes the same set of data that was sent off
  });
});

//creating a mock user client to test deletion functionality
jest.mock("@prisma/client", () => ({
  PrismClient: jest.fn(() => ({
    orderMenu: {
      deleteMany: jest.fn(),
    },
    order: {
      delete: jest.fn(),
    },
  })),
}));

//testing that an order can be deleted from the database
describe("DELETE /orders/:orderId", () => {
  it("should delete the order and send back a success message", async () => {
    const orderId = 123; //random orderId to specify which order should be removed

    //initialising express application and telling it to use pre-defined routes through router
    const app = express();
    app.use(express.json());
    app.use(router);

    const response = await request(app).delete("/orders/${orderId}"); //requesting for order to be deleted from database and storing the response

    console.log(response.status); //showing response status code to check if the page has been loaded and data was retrieved correctly
    console.log(response.body); //prints out response body in terminal, used for debugging purposes
  });
});

//creating a mock user client to test order update functionality
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => ({
    order: {
      update: jest.fn(),
    },
  })),
}));

//testing that order status can be updated to CANCELLED
describe("PUT /orders/:orderId/cancel", () => {
  it("should update an order to appear as cancelled", async () => {
    const orderId = 456; ///example order ID to use for test
    const { PrismaClient } = require("@prisma/client"); //mock client for testing waiter functionalities
    const prisma = new PrismaClient();
    prisma.order.update.mockResolvedValueOnce({
      id: orderId,
      status: "CANCELLED",
    });

    const app = express();
    app.use(express.json());
    app.use(router);

    await request(app).put("/orders/${orderId}/cancel").send();
  });
});

//testing that order status can be updated to READY TO DELIVER
describe("PUT /orders/:orderId/ready-to-deliver", () => {
  it("should update order status to READY", async () => {
    const orderId = 789; //example order ID to use for test
    await request(app).put("/orders/${orderId}/ready-to-deliver").send(); //ensuring route for ready to deliver orders is correct
  });
});

//testing that order status can be updated to DELIVERED
describe("PUT /orders/:orderId/delivered", () => {
  it("should update order status to DELIVERED", async () => {
    const orderId = 256; //example order ID to use for test
    await request(app).put("/orders/${orderId}/delivered").send(); //ensuring route for delivered orders is correct
  });
});
