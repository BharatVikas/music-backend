require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dburl = process.env.DB_URL;
mongoose.connect(dburl)
    .then(() => console.log("Connected to MongoDB Atlas Successfully"))
    .catch((err) => console.log(err.message));

const app = express();
app.use(cors({ origin: "*" })); // ✅ Fix CORS
app.use(express.json());

const adminrouter = require("./routes/adminroutes");
const customerrouter = require("./routes/customerroutes");
const managerrouter = require("./routes/managerroutes");

app.use("/api/admin", adminrouter);
app.use("/api/customer", customerrouter);
app.use("/api/manager", managerrouter);

module.exports = app; // ✅ Important for Vercel
