import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

import developGroupsRoutes from "./routes/developGroups";
import meetingsRoutes from "./routes/meetings";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootpassword",
  database: "appdb",
  dateStrings: true,
});


developGroupsRoutes(app, pool);
meetingsRoutes(app, pool);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});