import prisma from "../db/prismaClient.js";

// Get all purchases
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.render("purchases/index", { purchases });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Failed to load purchases",
    });
  }
};

// Get purchase creation form
const createPurchaseForm = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { stock: true },
    });
    res.render("purchases/create", { products });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      message: "Failed to load products for purchase",
    });
  }
};

// Create a new purchase
const createPurchase = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    // Parse items from form data
    const purchaseItems = Array.isArray(items) ? items : [items];

    // Calculate total amount and prepare items for creation
    let totalAmount = 0;
    const itemsToCreate = [];

    for (const item of purchaseItems) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(item.productId) },
        include: { stock: true },
      });

      if (!product) continue;

      const quantity = parseInt(item.quantity);
      const price = product.price;

      // Check if enough stock
      if (product.stock.quantity < quantity) {
        return res.status(400).render("error", {
          message: `Not enough stock for ${product.name}. Available: ${product.stock.quantity}`,
        });
      }

      totalAmount += price * quantity;

      itemsToCreate.push({
        productId: product.id,
        quantity,
        price,
      });

      // Update stock
      await prisma.stock.update({
        where: { productId: product.id },
        data: { quantity: product.stock.quantity - quantity },
      });
    }

    // Create purchase
    await prisma.purchase.create({
      data: {
        customerName,
        totalAmount,
        items: {
          create: itemsToCreate,
        },
      },
    });

    res.redirect("/purchases");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to create purchase" });
  }
};

// Cancel a purchase
const cancelPurchase = async (req, res) => {
  const { id } = req.params;

  try {
    // Get the purchase with its items
    const purchase = await prisma.purchase.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: true,
      },
    });

    if (!purchase) {
      return res.status(404).render("error", { message: "Purchase not found" });
    }

    if (purchase.status === "CANCELLED") {
      return res
        .status(400)
        .render("error", { message: "Purchase is already cancelled" });
    }

    // Return items to stock
    for (const item of purchase.items) {
      const stock = await prisma.stock.findUnique({
        where: { productId: item.productId },
      });

      if (stock) {
        await prisma.stock.update({
          where: { productId: item.productId },
          data: { quantity: stock.quantity + item.quantity },
        });
      }
    }

    // Update purchase status to CANCELLED
    await prisma.purchase.update({
      where: { id: parseInt(id) },
      data: { status: "CANCELLED" },
    });

    res.redirect("/purchases");
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Failed to cancel purchase" });
  }
};

export { getAllPurchases, createPurchaseForm, createPurchase, cancelPurchase };
