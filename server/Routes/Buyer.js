const express = require("express");
const router = express.Router();
const fetchuser = require('../midelware/Fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const multer = require('multer');

const User = require("../Models/User");
const OTP = require("../Models/EmailOtp");
const Plan = require("../Models/Services");
const Earning = require("../Models/EarningPrice");
const Buyer = require("../Models/Buyer");
const Worker = require("../Models/Worker");
const Transaction = require("../Models/BuyerTransaction");
const AdminAccount = require("../Models/AdminPayment");
const Service = require("../Models/ServiceTaken");


//Transaction
// CREATE Service
router.post("/createTransactions", fetchuser, async (req, res) => {
    let success = false;
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }
        const { TID, Amount } = req.body;
        const transaction = await Transaction.create({
            User_id: req.user.id,
            Status: 'Pending',
            Amount,
            TID
        });

        success = true;
        res.json({ success, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/getTransaction", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }

        const transaction = await Transaction.find({ User_id: req.user.id }).populate('User_id', 'Name Email')
        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transactions not found' });
        }
        res.json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});




//Service Taken
//

// Create Service
router.post("/createService", fetchuser, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }

        const { Channel, Servicetaken, Amount, URL, Total } = req.body;

        const buyerfund = await Buyer.findOne({ User_id: req.user.id })
        if (!buyerfund) {
            return res.status(404).json({ success: false, message: 'Transactions not found' });
        }

        if (Total > buyerfund?.Funds) {
            return res.status(404).json({ success: false, message: "You Have Incufficient Balance" })
        }
        const newfund = buyerfund?.Funds - Total;


        const service = await Service.create({
            User_id: req.user.id,
            Channel,
            Service: Servicetaken,
            Amount,
            Total:Total,
            URL,
            Status: "Approved"
        });

        const updatefund = await Buyer.findOneAndUpdate({ User_id: req.user.id }, { Funds: newfund })

        success = true;
        res.json({ success, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/ServicesTaken", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        const services = await Service.find({ User_id: req.user.id });
        if (!services || services.length === 0) {
            return res.status(404).json({ success: false, message: 'Services not found' });
        }

        const serviceIds = services.map(service => service._id); // Extracting service ids

        const serviceWithWorkerTrackCount = await Service.aggregate([
            {
                $match: { _id: { $in: serviceIds } } // Filter based on service ids
            },
            {
                $lookup: {
                    from: "workertracks",
                    localField: "_id",
                    foreignField: "Service_id",
                    as: "workerTracks"
                }
            },
            {
                $addFields: {
                    workerTrackCount: { $size: "$workerTracks" } // Count the number of worker tracks
                }
            },
            {
                $project: { workerTracks: 0 }
            }
        ]);

        res.json({ success: true, services: serviceWithWorkerTrackCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



//PLANS
router.get("/getPlans", async (req, res) => {
    try {
        const plan = await Plan.find();
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        res.json({ success: true, plan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//BUYER
router.get("/getbuyer", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }

        const buyer = await Buyer.findOne({ User_id: req.user.id }).populate('User_id', 'Name Email ProfilePhoto')
        if (!buyer) {
            return res.status(404).json({ success: false, message: 'Transactions not found' });
        }
        res.json({ success: true, buyer: buyer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ AdminPayment
router.get("/PaymentAccount", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }
        const account = await AdminAccount.find();
        if (!account) {
            return res.status(404).json({ success: false, message: 'Admin payment not found' });
        }
        res.json({ success: true, account });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

module.exports = router