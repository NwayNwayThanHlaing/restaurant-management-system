import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// adding menu items via the database
const menuData = [
  {
    name: "Pulled Pork Nachos (GF)",
    price: 3.99,
    spice: "🌶️🌶️",
    category: {
      connect: {
        id: 1,
      },
    },
    calories: "Calories: 352",
    allergens: "Allergens: milk",
    description: "Nachos topped with cheese and pulled pork.",
    image: "nachos.jpg",
  },
  {
    name: "Bean Soup (V, Ve, GF, DF)",
    price: 5.99,
    spice: "",
    category: {
      connect: {
        id: 1,
      },
    },
    calories: "Calories: 129",
    allergens: "",
    description: "A warming, spiced soup topped with guacamole.",
    image: "soup.jpg",
  },
  {
    name: "Beef and Cheese Taquitos (GF)",
    price: 5.99,
    spice: "🌶️",
    category: {
      connect: {
        id: 1,
      },
    },
    calories: "Calories: 240",
    allergens: "Allergens: milk",
    description: "Crispy taquitos filled with beef and melted cheese.",
    image: "taquitos.jpg",
  },
  {
    name: "Chicken Empanadas",
    price: 4.99,
    spice: "🌶️",
    category: {
      connect: {
        id: 1,
      },
    },
    calories: "Calories: 261",
    allergens: "Allergens: egg, gluten",
    description: "Pastry filled with juicy chicken.",
    image: "empanadas.jpg",
  },
  {
    name: "Black Bean Dip (V, GF)",
    price: 4.99,
    spice: "",
    category: {
      connect: {
        id: 1,
      },
    },
    calories: "Calories: 70",
    allergens: "Allergens: milk",
    description: "Black beans blended with spices and served with sour cream.",
    image: "dip.jpg",
  },
  {
    name: "Crunchy Chicken Tacos (GF)",
    price: 7.99,
    spice: "🌶️🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 785",
    allergens: "Allergens: milk",
    description:
      "Chicken, peppers and our special sauce wrapped in crunchy taco.",
    image: "crunchychicken.jpg",
  },
  {
    name: "Crunchy Beef Tacos (GF)",
    price: 8.99,
    spice: "🌶️🌶️🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 920",
    allergens: "Allergens: milk",
    description:
      "Beef, lettuce and our special sauce wrapped in a crunchy taco.",
    image: "crunchybeef.jpg",
  },
  {
    name: "Soft Chicken Tacos",
    price: 7.99,
    spice: "🌶️🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 785",
    allergens: "Allergens: milk, gluten",
    description:
      "Chicken, peppers and our special sauce wrapped in a soft taco.",
    image: "softchicken.jpg",
  },
  {
    name: "Soft Beef Tacos",
    price: 8.99,
    spice: "🌶️🌶️🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 920",
    allergens: "Allergens: milk, gluten",
    description: "Beef, lettuce and our special sauce wrapped in a soft taco.",
    image: "softbeef.jpg",
  },
  {
    name: "Chicken Burrito (DF)",
    price: 9.99,
    spice: "🌶️🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 820",
    allergens: "Allergens: gluten",
    description: "Chicken, rice and our special sauce wrapped in a tortilla.",
    image: "chickenburrito.jpg",
  },
  {
    name: "Veggie Burrito (V, Ve, DF)",
    price: 6.99,
    spice: "🌶️🌶️🌶️",
    category: {
      connect: {
        id: 2,
      },
    },
    calories: "Calories: 450",
    allergens: "Allergens: gluten",
    description:
      "A mix of vegetables, rice and our special vegetarian sauce wrapped in a tortilla.",
    image: "veggie.jpg",
  },
  {
    name: "Chips and Dips (V, Ve, GF, DF)",
    price: 1.99,
    spice: "🌶️",
    category: {
      connect: {
        id: 3,
      },
    },
    calories: "Calories: 233",
    allergens: "",
    description: "Crunchy tortilla crisps with an assortment of dips.",
    image: "chips.jpg",
  },
  {
    name: "Seasoned Rice (V, Ve, GF, DF)",
    price: 2.99,
    spice: "🌶️🌶️",
    category: {
      connect: {
        id: 3,
      },
    },
    calories: "Calories: 160",
    allergens: "",
    description: "Flavourful rice.",
    image: "rice.jpg",
  },
  {
    name: "Quesadilla",
    price: 4.99,
    spice: "🌶️",
    category: {
      connect: {
        id: 3,
      },
    },
    calories: "Calories: 293",
    allergens: "Allergens: milk, gluten",
    description: "Quesadilla with cheese and meat, served with salsa",
    image: "quesadilla.jpg",
  },
  {
    name: "Courgette Chips (V, Ve, GF, DF)",
    price: 3.99,
    spice: "",
    category: {
      connect: {
        id: 3,
      },
    },
    calories: "Calories: 79",
    allergens: "",
    description: "Courgettes sliced and cooked until crisp.",
    image: "courgettechips.jpg",
  },
  {
    name: "Corn and Tomato Salad (V, GF)",
    price: 4.99,
    spice: "",
    category: {
      connect: {
        id: 3,
      },
    },
    calories: "Calories: 52",
    allergens: "Allergens: milk",
    description: "Fresh corn and tomato tossed with salad dressing.",
    image: "salad.jpg",
  },
  {
    name: "Churros (V)",
    price: 6.99,
    spice: "",
    category: {
      connect: {
        id: 4,
      },
    },
    calories: "Calories: 425",
    allergens: "Allergens: milk, gluten",
    description: "Delicious churros coated in a salted caramel sauce.",
    image: "churros.jpg",
  },
  {
    name: "Mangonada Sorbet (V, Ve, GF, DF)",
    price: 4.99,
    spice: "🌶️🌶️",
    category: {
      connect: {
        id: 4,
      },
    },
    calories: "Calories: 210",
    allergens: "",
    description: "Spicy and fresh mango sorbet.",
    image: "mango.jpg",
  },
  {
    name: "Fried Ice Cream (V)",
    price: 4.99,
    spice: "",
    category: {
      connect: {
        id: 4,
      },
    },
    calories: "Calories: 381",
    allergens: "Allergens: milk, gluten",
    description: "Like fried food and ice cream, why not combine?",
    image: "icecream.jpg",
  },
  {
    name: "Flan (GF)",
    price: 6.99,
    spice: "",
    category: {
      connect: {
        id: 4,
      },
    },
    calories: "Calories: 237",
    allergens: "Allergens: milk",
    description: "Calling all caramel lovers! This one's for you.",
    image: "flan.jpg",
  },
  {
    name: "Tres Leches (V)",
    price: 7.99,
    spice: "",
    category: {
      connect: {
        id: 4,
      },
    },
    calories: "Calories: 190",
    allergens: "Allergens: milk, gluten",
    description: "An Oaxaca favourite.",
    image: "tresleches.jpg",
  },
  {
    name: "Still Water",
    price: 1.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "water.jpg",
  },
  {
    name: "Sparkling Water",
    price: 2.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "sparkling.jpg",
  },
  {
    name: "Cola",
    price: 3.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "cola.jpg",
  },
  {
    name: "Lemonade",
    price: 2.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "lemonade.jpg",
  },
  {
    name: "Orange Juice",
    price: 2.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "orange.jpg",
  },
  {
    name: "Cappuccino",
    price: 4.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "cappuccino.jpg",
  },
  {
    name: "Margarita",
    price: 7.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "marg.jpg",
  },
  {
    name: "Mojito",
    price: 6.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "mojito.jpg",
  },
  {
    name: "Michelada",
    price: 7.99,
    spice: "",
    category: {
      connect: {
        id: 5,
      },
    },
    calories: "",
    allergens: "",
    description: "",
    image: "mich.jpg",
  },
];

// creating the menu with the database
export const seedMenus = async () => {
  for (const m of menuData) {
    const menu = await prisma.menu.create({
      data: m,
    });
    console.log(`Created menu with id: ${menu.id}`);
  }
};
