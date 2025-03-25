import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import ownersRoutes from "./routes/owners.routes.js";
import customerRoutes from "./routes/customers.routes.js";
import businessRoutes from "./routes/businesses.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import reviewRoutes from "./routes/reviews.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.use(indexRoutes);
app.use(
  "/api",
  servicesRoutes,
  ownersRoutes,
  customerRoutes,
  businessRoutes,
  reviewRoutes,
  categoryRoutes
);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
