import prisma from "../db/prismaClient.js";

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { stock: true },
    });
    res.render("products/index", { products });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Failed to load products",
    });
  }
};

// Display product creation form
const createProductForm = (req, res) => {
  res.render("products/create");
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, quantity } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: {
          create: {
            quantity: parseInt(quantity),
          },
        },
      },
    });

    res.redirect("/products");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to create product" });
  }
};

export { getAllProducts, createProductForm, createProduct };
