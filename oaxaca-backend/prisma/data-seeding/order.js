import { PrismaClient, Status } from "@prisma/client";

// create new prisma client instance
const prisma = new PrismaClient();

// function to seed orders into the database
export const seedOrders = async () => {
  try {
    // create order data and insert into the database using prisma client
    const orders = await prisma.order.createMany({
      data: [
        {
          table_no: 1,
          status: Status.PROCESSING,
          order_menus: {
            create: [
              {
                menu: {
                  connect: {
                    id: 1,
                  },
                },
                quantity: 2,
              },
              {
                menu: {
                  connect: {
                    id: 2,
                  },
                },
                quantity: 1,
              },
            ],
          },
        },
        {
          table_no: 2,
          status: Status.COMPLETED,
          order_menus: {
            create: [
              {
                menu: {
                  connect: {
                    id: 3,
                  },
                },
                quantity: 1,
              },
              {
                menu: {
                  connect: {
                    id: 4,
                  },
                },
                quantity: 1,
              },
            ],
          },
        },
      ],
    });
    // log creation of orders
    console.log("Created orders:");
  } catch (error) {
    // log errors that occur during seeding
    console.error("Error seeding order details:", error);
  }
};
