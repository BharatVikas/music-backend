require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dburl = process.env.DB_URL; // Access DB URL from .env
mongoose.connect(dburl)
    .then(() => console.log("Connected to MongoDB Atlas Successfully"))
    .catch((err) => console.log(err.message));

const app = express();
app.use(cors());
app.use(express.json());

const adminrouter = require("./routes/adminroutes");
const customerrouter = require("./routes/customerroutes");
const managerrouter = require("./routes/managerroutes");

app.use("", adminrouter);
app.use("", customerrouter);
app.use("", managerrouter);

const port = process.env.PORT || 8000; // Use port from .env or default
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
