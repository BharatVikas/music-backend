const path = require("path");
const Event = require("../models/Event");
const Customer = require("../models/Customer");

const insertcustomer = async (req, res) => {
    try {
        const input = req.body;
        const customer = new Customer(input);
        await customer.save();
        res.status(201).send("Registered Successfully");
    } catch (error) {
        console.error("Error inserting customer:", error);
        res.status(500).send(error.message);
    }
};

const checkcustomerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email, password });

        if (!customer) {
            return res.status(401).send("Invalid email or password");
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error("Error in customer login:", error);
        res.status(500).send(error.message);
    }
};

const viewevents = async (req, res) => {
    try {
        const events = await Event.find();

        // Ensure each event's file field contains a full Cloudinary URL
        const updatedEvents = events.map((event) => ({
            ...event._doc,
            file: `https://res.cloudinary.com/dqambv5lh/video/upload/v1738730377/events/${event.file}`
        }));

        console.log(updatedEvents);
        res.status(200).json(updatedEvents);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eventaudio = async (req, res) => {
    try {
        const filename = req.params.filename;

        // Validate file extension
        const ext = path.extname(filename).toLowerCase();
        const validExtensions = [".mp3", ".wav", ".ogg", ".m4a"];

        if (!validExtensions.includes(ext)) {
            return res.status(400).send("Invalid audio file format");
        }

        // Construct the correct Cloudinary URL with 'events/' prefix
        const cloudinaryUrl = `https://res.cloudinary.com/dqambv5lh/video/upload/v1738730377/events/${filename}`;

        // Redirect to Cloudinary-hosted audio file
        res.redirect(cloudinaryUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving audio file");
    }
};

module.exports = { insertcustomer, checkcustomerlogin, viewevents, eventaudio };
