import { PrismaClient } from "@prisma/client";

// create new prisma client instance
const prisma = new PrismaClient();

// function to seed call waiter requests into database
export const seedCallWaiter = async (tableNumber, Reason) => {
  try {
    // conver table num to integer
    const tableNumberInt = parseInt(tableNumber);
    // create new call waiter request
    const WaiterRequest = await prisma.callWaiter.create({
      data: {
        table_no: tableNumberInt,
        reason: Reason,
      },
    });
    // log creation of call waiter request
    console.log("Created order details:", WaiterRequest);
  } catch (error) {
    // log errors that occur during seeding
    console.error("Error seeding order details:", error);
  }
};
