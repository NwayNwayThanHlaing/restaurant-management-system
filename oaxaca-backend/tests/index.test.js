const request = require("supertest");
const express = require("express");
const adminRouter = require("../routes/admin");
const bodyParser = require("body-parser");
const app = express();

// Import the routes and middleware
// Mock data
const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "Starters" },
  { id: 3, name: "Main Course" },
  { id: 4, name: "Desserts" },
  { id: 5, name: "Drinks" },
];

const menus = [
  {
    name: "Churros",
    price: 3.4,
    image: "churros.jpg",
    description: "Delicious churros with chocolate sauce",
    categoryId: 4,
  },
  // ... other menu items
];

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/admin", adminRouter);

app.get("/categories", (req, res) => {
  res.json({ categories });
});

app.post("/categories", (req, res) => {
  const newCategory = req.body;
  categories.push(newCategory);
  res.status(201).json({ category: newCategory });
});

app.get("/menu", (req, res) => {
  res.json({ menus });
});

app.post("/menu", (req, res) => {
  const newMenuItem = req.body;
  menus.push(newMenuItem);
  res.status(201).json({ menu: newMenuItem });
});

// Tests
describe("GET /categories", () => {
  it("should respond with an array of categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("categories");
    expect(Array.isArray(response.body.categories)).toBe(true);
    expect(response.body.categories.length).toBeGreaterThan(0);
  });
});

describe("POST /categories", () => {
  it("should create a new category", async () => {
    const newCategory = { id: 6, name: "New Category" };
    const response = await request(app).post("/categories").send(newCategory);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("category");
    expect(response.body.category).toEqual(newCategory);
  });
});

describe("GET /menu", () => {
  it("should respond with an array of menu items", async () => {
    const response = await request(app).get("/menu");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("menus");
    expect(Array.isArray(response.body.menus)).toBe(true);
    expect(response.body.menus.length).toBeGreaterThan(0);
  });
});

describe("POST /menu", () => {
  it("should create a new menu item", async () => {
    const newMenuItem = {
      name: "New Menu Item",
      price: 9.99,
      image: "new-item.jpg",
      description: "A delicious new menu item",
      categoryId: 1,
    };
    const response = await request(app).post("/menu").send(newMenuItem);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("menu");
    expect(response.body.menu).toEqual(newMenuItem);
  });
});

app.get("/categories", (req, res) => {
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Starters" },
    { id: 3, name: "Main Course" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Drinks" },
  ];

  res.json({ categories });
});

app.get("/menu", (req, res) => {
  const menus = [
    {
      name: "Churros",
      price: 3.4,
      image: "churros.jpg",
      description: "Delicious churros with chocolate sauce",
      categoryId: 4,
    },
    // ... other menu items
  ];

  res.json({ menus });
});

describe("GET /categories", () => {
  it("should respond with an array of categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("categories");
    expect(Array.isArray(response.body.categories)).toBe(true);
    expect(response.body.categories.length).toBeGreaterThan(0);
  });
});

describe("GET /menu", () => {
  it("should respond with an array of menu items", async () => {
    const response = await request(app).get("/menu");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("menus");
    expect(Array.isArray(response.body.menus)).toBe(true);
    expect(response.body.menus.length).toBeGreaterThan(0);

    const firstMenuItem = response.body.menus[0];
    expect(firstMenuItem).toHaveProperty("name");
    expect(firstMenuItem).toHaveProperty("price");
    expect(firstMenuItem).toHaveProperty("image");
    expect(firstMenuItem).toHaveProperty("description");
    expect(firstMenuItem).toHaveProperty("categoryId");
  });
});
