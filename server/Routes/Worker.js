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
const WorkerAccount = require("../Models/WorkerPay");
const WithdrawAccount = require("../Models/Withdraw");
const WorkerTrack = require("../Models/WorkerTrack");




//Withdraw Accounts
router.post("/withdrawAccount", fetchuser, async (req, res) => {
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

        const { BankAccount, Account_No, Account_Title } = req.body;

        const workeraccount = await WorkerAccount.create({
            User_id: req.user.id,
            BankAccount,
            Account_No,
            Account_Title
        });

        success = true;
        res.json({ success, workeraccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ AdminPayment
router.get("/getaccount", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }
        const WokerAccount = await WorkerAccount.findOne({ User_id: req.user.id });
        if (!WokerAccount) {
            return res.status(404).json({ success: false, message: 'Admin payment not found' });
        }
        res.json({ success: true, WokerAccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// UPDATE AdminPayment
router.put("/workeraccount/:id", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }

        const WokerAccount = await WorkerAccount.findOne({ User_id: req.user.id });
        if (!WokerAccount) {
            return res.status(404).json({ success: false, message: 'No Account Find for this User' });
        }

        const { BankAccount, Account_No, Account_Title } = req.body;
        const adminPayment = await WorkerAccount.findByIdAndUpdate(WokerAccount._id, {
            BankAccount,
            Account_No,
            Account_Title
        }, { new: true });

        if (!adminPayment) {
            return res.status(404).json({ success: false, message: 'Admin payment not found' });
        }

        res.json({ success: true, adminPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});




//Withdraws
//
// Create Withdraw
router.post("/createwithdraw", fetchuser, async (req, res) => {
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

        const { Amount } = req.body;

        const workerearning = await Worker.findOne({ User_id: req.user.id })
        if (!workerearning) {
            return res.status(404).json({ success: false, message: 'Transactions not found' });
        }

        if (Amount > workerearning?.Earning) {
            return res.status(404).json({ success: false, message: "You Have Incufficient Balance" })
        }
        const newEarning = workerearning?.Earning - Amount;


        const withdraw = await WithdrawAccount.create({
            User_id: req.user.id,
            Channel,
            Amount: Amount,
            Status: "Pending"
        });

        const updatefund = await Worker.findOneAndUpdate({ User_id: req.user.id }, { Earning: newEarning })

        success = true;
        res.json({ success, withdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/withdaws", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        const withdraw = await WithdrawAccount.find({ User_id: req.user.id });
        if (!withdraw || withdraw.length === 0) {
            return res.status(404).json({ success: false, message: 'Services not found' });
        }

        res.json({ success: true, withdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});


//Earn Amount
router.get("/YoutubeView", fetchuser, async (req, res) => {
    try {
        const { IP_Address } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        // Find services not used by the user
        const userServices = await WorkerTrack.find({ User_id: userId }).distinct('Service_id');

        // Find services used by the IP address
        const ipServices = await WorkerTrack.find({ IP_Address: IP_Address }).distinct('Service_id');

        // Find services not used by the user or the IP address
        const unusedServices = await Service.find({
            _id: { $nin: [...userServices, ...ipServices] },
            Channel: "Youtube",
            Service: "Youtube Views"
        });

        if (!unusedServices.length) {
            return res.status(404).json({ message: 'No unused service found.' });
        }

        // Pick a random unused service
        const randomIndex = Math.floor(Math.random() * unusedServices.length);
        const randomService = unusedServices[randomIndex];

        return res.json(randomService);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/YoutubeViewEarn', fetchuser, async (req, res) => {
    try {
        const { IP_Address, service_id } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        let service = await Service.findById(service_id);

        let workertrack = await WorkerTrack.create({
            User_id: userId,
            Service_id: service_id,
            IP_Address: IP_Address
        })

        let trackcount = await WorkerTrack.find({ Service_id: service_id }).countDocuments();

        if (trackcount == service.Amount) {
            await Service.findByIdAndUpdate(service_id, { Status: "Completed" })
            await WorkerTrack.deleteMany({ Service_id: service_id })
        }

        let = await Earning.findOne({ Service: "Youtube View" });

        let workerAmount = await Worker.findOne({ User_id: userId })

        let newEarning = ServiceEarning.Price + workerAmount.Earning

        WorkerUpdated = await Worker.findOneAndUpdate({ User_id: userId }, { Earning: newEarning });

        return res.json({ success: true, message: "Successfully Earning Added" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get("/YoutubeWatchTime", fetchuser, async (req, res) => {
    try {
        const { IP_Address } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        // Find services not used by the user
        const userServices = await WorkerTrack.find({ User_id: userId }).distinct('Service_id');

        // Find services used by the IP address
        const ipServices = await WorkerTrack.find({ IP_Address: IP_Address }).distinct('Service_id');

        // Find services not used by the user or the IP address
        const unusedServices = await Service.find({
            _id: { $nin: [...userServices, ...ipServices] },
            Channel: "Youtube",
            Service: "Youtube Watch Time"
        });

        if (!unusedServices.length) {
            return res.status(404).json({ message: 'No unused service found.' });
        }

        // Pick a random unused service
        const randomIndex = Math.floor(Math.random() * unusedServices.length);
        const randomService = unusedServices[randomIndex];

        return res.json(randomService);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/YoutubeWatchEarn', fetchuser, async (req, res) => {
    try {
        const { IP_Address, service_id } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        let service = await Service.findById(service_id);

        let workertrack = await WorkerTrack.create({
            User_id: userId,
            Service_id: service_id,
            IP_Address: IP_Address
        })

        let trackcount = await WorkerTrack.find({ Service_id: service_id }).countDocuments();

        if (trackcount == service.Amount) {
            await Service.findByIdAndUpdate(service_id, { Status: "Completed" })
            await WorkerTrack.deleteMany({ Service_id: service_id })
        }

        let = await Earning.findOne({ Service: "Youtube Watch Time" });

        let workerAmount = await Worker.findOne({ User_id: userId })

        let newEarning = ServiceEarning.Price + workerAmount.Earning

        WorkerUpdated = await Worker.findOneAndUpdate({ User_id: userId }, { Earning: newEarning });

        return res.json({ success: true, message: "Successfully Earning Added" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get("/YoutubeSubscriber", fetchuser, async (req, res) => {
    try {
        const { IP_Address } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        // Find services not used by the user
        const userServices = await WorkerTrack.find({ User_id: userId }).distinct('Service_id');

        // Find services used by the IP address
        const ipServices = await WorkerTrack.find({ IP_Address: IP_Address }).distinct('Service_id');

        // Find services not used by the user or the IP address
        const unusedServices = await Service.find({
            _id: { $nin: [...userServices, ...ipServices] },
            Channel: "Youtube",
            Service: "Youtube Subscriber"
        });

        if (!unusedServices.length) {
            return res.status(404).json({ message: 'No unused service found.' });
        }

        // Pick a random unused service
        const randomIndex = Math.floor(Math.random() * unusedServices.length);
        const randomService = unusedServices[randomIndex];

        return res.json(randomService);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/YoutubeSubscriberEarn', fetchuser, async (req, res) => {
    try {
        const { IP_Address, service_id } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        let service = await Service.findById(service_id);

        let workertrack = await WorkerTrack.create({
            User_id: userId,
            Service_id: service_id,
            IP_Address: IP_Address
        })

        let trackcount = await WorkerTrack.find({ Service_id: service_id }).countDocuments();

        if (trackcount == service.Amount) {
            await Service.findByIdAndUpdate(service_id, { Status: "Completed" })
            await WorkerTrack.deleteMany({ Service_id: service_id })
        }

        let = await Earning.findOne({ Service: "Youtube Subscriber" });

        let workerAmount = await Worker.findOne({ User_id: userId })

        let newEarning = ServiceEarning.Price + workerAmount.Earning

        WorkerUpdated = await Worker.findOneAndUpdate({ User_id: userId }, { Earning: newEarning });

        return res.json({ success: true, message: "Successfully Earning Added" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get("/GoogleViews", fetchuser, async (req, res) => {
    try {
        const { IP_Address } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        // Find services not used by the user
        const userServices = await WorkerTrack.find({ User_id: userId }).distinct('Service_id');

        // Find services used by the IP address
        const ipServices = await WorkerTrack.find({ IP_Address: IP_Address }).distinct('Service_id');

        // Find services not used by the user or the IP address
        const unusedServices = await Service.find({
            _id: { $nin: [...userServices, ...ipServices] },
            Channel: "Google",
            Service: "Google Views"
        });

        if (!unusedServices.length) {
            return res.status(404).json({ message: 'No unused service found.' });
        }

        // Pick a random unused service
        const randomIndex = Math.floor(Math.random() * unusedServices.length);
        const randomService = unusedServices[randomIndex];

        return res.json(randomService);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/GoogleViewsEarn', fetchuser, async (req, res) => {
    try {
        const { IP_Address, service_id } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        let service = await Service.findById(service_id);

        let workertrack = await WorkerTrack.create({
            User_id: userId,
            Service_id: service_id,
            IP_Address: IP_Address
        })

        let trackcount = await WorkerTrack.find({ Service_id: service_id }).countDocuments();

        if (trackcount == service.Amount) {
            await Service.findByIdAndUpdate(service_id, { Status: "Completed" })
            await WorkerTrack.deleteMany({ Service_id: service_id })
        }

        let = await Earning.findOne({ Service: "Google View" });

        let workerAmount = await Worker.findOne({ User_id: userId })

        let newEarning = ServiceEarning.Price + workerAmount.Earning

        WorkerUpdated = await Worker.findOneAndUpdate({ User_id: userId }, { Earning: newEarning });

        return res.json({ success: true, message: "Successfully Earning Added" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.get("/GoogleAddViews", fetchuser, async (req, res) => {
    try {
        const { IP_Address } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        // Find services not used by the user
        const userServices = await WorkerTrack.find({ User_id: userId }).distinct('Service_id');

        // Find services used by the IP address
        const ipServices = await WorkerTrack.find({ IP_Address: IP_Address }).distinct('Service_id');

        // Find services not used by the user or the IP address
        const unusedServices = await Service.find({
            _id: { $nin: [...userServices, ...ipServices] },
            Channel: "Google",
            Service: "Google Add Views"
        });

        if (!unusedServices.length) {
            return res.status(404).json({ message: 'No unused service found.' });
        }

        // Pick a random unused service
        const randomIndex = Math.floor(Math.random() * unusedServices.length);
        const randomService = unusedServices[randomIndex];

        return res.json(randomService);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/GoogleAddViewsEarn', fetchuser, async (req, res) => {
    try {
        const { IP_Address, service_id } = req.body
        const userId = req.user.id;
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "You have no access for this" });
        }

        let service = await Service.findById(service_id);

        let workertrack = await WorkerTrack.create({
            User_id: userId,
            Service_id: service_id,
            IP_Address: IP_Address
        })

        let trackcount = await WorkerTrack.find({ Service_id: service_id }).countDocuments();

        if (trackcount == service.Amount) {
            await Service.findByIdAndUpdate(service_id, { Status: "Completed" })
            await WorkerTrack.deleteMany({ Service_id: service_id })
        }

        let = await Earning.findOne({ Service: "Google Add View" });

        let workerAmount = await Worker.findOne({ User_id: userId })

        let newEarning = ServiceEarning.Price + workerAmount.Earning

        WorkerUpdated = await Worker.findOneAndUpdate({ User_id: userId }, { Earning: newEarning });

        return res.json({ success: true, message: "Successfully Earning Added" })

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



//Earning PLANS
router.get("/getEarningPlans", async (req, res) => {
    try {
        const earning = await Earning.find();
        if (!earning) {
            return res.status(404).json({ success: false, message: 'Earning Plans not found' });
        }
        res.json({ success: true, earning });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Worker
router.get("/getworker", fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Your Have No-Access for this" });
        }

        const worker = await Worker.findOne({ User_id: req.user.id }).populate('User_id', 'Name Email ProfilePhoto')
        if (!worker) {
            return res.status(404).json({ success: false, message: 'Transactions not found' });
        }
        res.json({ success: true, woker: worker });
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