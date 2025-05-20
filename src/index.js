import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import productsRouter from "./routes/products.js";
import stockRouter from "./routes/stock.js";
import purchasesRouter from "./routes/purchases.js";
import { getDashboard } from "./controllers/DashboardController.js";

const app = express();
const port = process.env.PORT || 3000;

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Set up EJS with layouts
app.use(expressLayouts);
app.set("layout", "layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.get("/dashboard", getDashboard);

app.use("/products", productsRouter);
app.use("/stock", stockRouter);
app.use("/purchases", purchasesRouter);

// Server
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Admin page app running on http://localhost:${port}`);
  });
}

// Export app for Vercel
export default app;
