import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Modern Sofa",
      description: "Comfortable 3-seater sofa with plush cushions",
      price: 899.99,
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      stock: { quantity: 15 },
    },
    {
      name: "Dining Table",
      description: "Solid wood dining table for 6 people",
      price: 649.99,
      imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
      stock: { quantity: 10 },
    },
    {
      name: "Queen Bed Frame",
      description: "Modern queen-sized bed frame with headboard",
      price: 799.99,
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      stock: { quantity: 8 },
    },
    {
      name: "Coffee Table",
      description: "Glass and metal coffee table for living room",
      price: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1537182534312-f945134cce34",
      stock: { quantity: 20 },
    },
    {
      name: "Bookshelf",
      description: "Tall wooden bookshelf with 5 shelves",
      price: 249.99,
      imageUrl: "https://images.unsplash.com/photo-1593194329521-40c96e28a1bf",
      stock: { quantity: 12 },
    },
    {
      name: "Office Chair",
      description: "Ergonomic office chair with adjustable height",
      price: 179.99,
      imageUrl: "https://images.unsplash.com/photo-1589384267710-7a170981ca78",
      stock: { quantity: 25 },
    },
    {
      name: "TV Stand",
      description: "Modern TV stand with storage compartments",
      price: 349.99,
      imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      stock: { quantity: 15 },
    },
    {
      name: "Dresser",
      description: "6-drawer dresser for bedroom storage",
      price: 429.99,
      imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe",
      stock: { quantity: 10 },
    },
    {
      name: "Nightstand",
      description: "Bedside table with 2 drawers",
      price: 149.99,
      imageUrl: "https://images.unsplash.com/photo-1573593323953-232568b123f1",
      stock: { quantity: 18 },
    },
    {
      name: "Accent Chair",
      description: "Stylish accent chair for living room or bedroom",
      price: 249.99,
      imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
      stock: { quantity: 14 },
    },
  ];

  // Clear existing data
  await prisma.purchaseItem.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.product.deleteMany();

  // Insert products with stock
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: {
          create: {
            quantity: product.stock.quantity,
          },
        },
      },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
