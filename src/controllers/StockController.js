import prisma from "../db/prismaClient.js";

// Get stock management page
const getStockPage = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { stock: true },
    });
    res.render("stock/index", { products });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Failed to load stock information",
    });
  }
};

// Update product stock
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await prisma.stock.update({
      where: { productId: parseInt(id) },
      data: { quantity: parseInt(quantity) },
    });

    res.redirect("/stock");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to update stock" });
  }
};

export { getStockPage, updateStock };
