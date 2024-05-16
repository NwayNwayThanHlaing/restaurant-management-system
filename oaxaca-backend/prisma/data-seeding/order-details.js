import { PrismaClient } from "@prisma/client";

// create new prisma client instance
const prisma = new PrismaClient();

// function to seed order details into database
export const seedOrderDetails = async () => {
  try {
    // create order details data and insert into database
    const orderDetails = await prisma.orderdetails.create({
      data: {
        table_no: 1,
        Order: [
          {
            name: "Tacos",
            quantity: 2,
            details: "testing",
          },
        ],
      },
    });
    // log creation of order details
    console.log("Created order details:", orderDetails);
  } catch (error) {
    // log any errors that occur during seeding
    console.error("Error seeding order details:", error);
  }
};
