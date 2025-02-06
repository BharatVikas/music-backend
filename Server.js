require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Allow CORS for all requests
app.use(cors());

// ✅ Manually set CORS headers for preflight requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // ✅ Respond to preflight request
    }

    next();
});

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB Atlas Successfully"))
    .catch(err => console.log(err.message));

app.use(express.json());

// ✅ Ensure correct route paths
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
