require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Configure CORS to Allow Your Frontend
app.use(cors({
    origin: "https://music-frontend-omega.vercel.app", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// ✅ Connect to MongoDB
const dburl = process.env.DB_URL;
mongoose.connect(dburl)
    .then(() => console.log("Connected to MongoDB Atlas Successfully"))
    .catch((err) => console.log(err.message));

app.use(express.json());

// ✅ Load Routes
const adminrouter = require("./routes/adminroutes");
const customerrouter = require("./routes/customerroutes");
const managerrouter = require("./routes/managerroutes");

app.use("/admin", adminrouter);
app.use("/customer", customerrouter);
app.use("/manager", managerrouter);

// ✅ Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
