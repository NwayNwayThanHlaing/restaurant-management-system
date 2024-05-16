import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

// create new prisma client instance
const prisma = new PrismaClient();

// generate salt for password hashing
var salt = bcrypt.genSaltSync(10);

// array containing user data to be seeded into database
const userData = [
  {
    username: "staff1",
    password: "staff1",
    firstname: "Nway Nway Than",
    lastname: "Hlaing",
    email: "nwaynwaythanhlaing@gmail.com",
    role: Role.ADMIN,
    lastLogin: null,
  },
  {
    username: "staff2",
    password: "staff2",
    firstname: "Nway Nway Than",
    lastname: "Hlaing",
    email: "nwaynwaythanhlaing@gmail.com",
    role: Role.WAITER,
    lastLogin: null,
  },
  {
    username: "staff3",
    password: "staff3",
    firstname: "Nway Nway Than",
    lastname: "Hlaing",
    email: "nwaynwaythanhlaing@gmail.com",
    role: Role.KITCHEN_STAFF,
    lastLogin: null,
  },
  {
    username: "staff4",
    password: "staff4",
    firstname: "kingswood",
    lastname: "bel gi",
    email: "kingswoodbelgi@gmail.com",
    role: Role.KITCHEN_STAFF,
    lastLogin: null,
  },
];

// function to seed users into the database
export const seedUsers = async () => {
  // iterate over userData array and create users
  for (const u of userData) {
    // update user object
    const user = await prisma.user.create({
      data: u,
    });
    // log creation of users
    console.log(`Created user with id: ${user.id}`);
  }
};
