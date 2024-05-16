import { PrismaClient } from "@prisma/client";

// create new prisma client instance
const prisma = new PrismaClient();

// array of category data to seed the database
const categoryData = [
  {
    name: "Starters",
  },
  {
    name: "Mains",
  },
  {
    name: "Sides",
  },
  {
    name: "Desserts",
  },
  {
    name: "Drinks",
  },
];

// function to seed categories into database
export const seedCategories = async () => {
  // iterate over each category in the catergoryData array
  for (const c of categoryData) {
    // create new category in database using Prisma client
    const category = await prisma.category.create({
      data: c,
    });
    // log creation of each category with its ID
    console.log(`Created category with id: ${category.id}`);
  }
};
