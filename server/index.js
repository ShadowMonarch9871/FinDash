import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis, products } from "./data/data.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);

// console.log("Working")
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server Port:${PORT}`);
    });
    //^Delete the existing data in the database;
    // await mongoose.connection.db.dropDatabase();
    //!Add data one time
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
  })
  .catch((error) => console.log(`${error} did not connect`));
