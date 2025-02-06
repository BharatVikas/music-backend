require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Allow CORS for all origins
app.use(cors());

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB Atlas Successfully"))
    .catch(err => console.log(err.message));

app.use(express.json());

const adminrouter = require("./routes/adminroutes");
const customerrouter = require("./routes/customerroutes");
const managerrouter = require("./routes/managerroutes");

app.use("/admin", adminrouter);
app.use("/customer", customerrouter);
app.use("/manager", managerrouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
