const express = require("express");


const Admin = require("../Models/Admin")
const User = require("../Models/User")

const router = express.Router();
const fetchadmin = require('../midelware/FetchAdmin')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const AdminAccount = require("../Models/AdminPayment");
const Plan = require("../Models/Services");
const Earning = require("../Models/EarningPrice");
const Service = require("../Models/ServiceTaken");
const WithdrawAccount = require("../Models/Withdraw");
const Transaction = require("../Models/BuyerTransaction");
const Buyer = require("../Models/Buyer");
const Worker = require("../Models/Worker");
const WorkerAccount = require("../Models/WorkerPay");


const upload = multer({ storage: multer.memoryStorage() });

const JWT_KEY = "OnDemandServiceAppBeautician";

const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads/AdminProfile");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const PhotosUploader = multer({ storage: PhotosStorage });



//Create a admin 
router.post("/createAdmin", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        admin = await Admin.findOne({ Email: req.body.Email })
        if (admin) {
            return res.status(404).json({ success, error: "this account already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)
        admin = await Admin.create({
            Email: req.body.Email,
            Name: req.body.Name,
            Password: SecPassword,
        })

        const data = {
            admin: {
                id: admin.id,
            }
        }

        const AdminODSToken = jwt.sign(data, JWT_KEY);

        success = true;
        res.json({ success, AdminODSToken })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Login a admin
router.post("/loginAdmin", async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;

    try {
        let admin = await Admin.findOne({ Email: Email })
        if (!admin) {
            return res.status(400).json({ success: false, Message: "Account does not Exist" })
        }

        const passwordCompare = await bcrypt.compare(Password, admin.Password)

        if (!passwordCompare) {
            return res.status(400).json({ success: false, Message: "Email or Password is Incorrect" })
        }

        const Payload = {
            admin: {
                id: admin.id,
            }
        }
        const AdminODSToken = jwt.sign(Payload, JWT_KEY);
        success = true;
        res.json({ success, AdminODSToken })

    } catch (error) {
        console.error(error)
        res.status(500).send({ success: false, Message: 'Error occured' })
    }
})

router.put("/UpdateAdmin",
    fetchadmin,
    PhotosUploader.fields([
        { name: 'ProfilePhoto', maxCount: 1 },
    ]), async (req, res) => {
        try {
            const { Name } = req.body;

            const newAdmin = {};
            if (Name) newAdmin.Name = Name;

            let admin = await Admin.findById(req.admin.id);
            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }

            if (req.files) {
                if (req.files['ProfilePhoto']) {
                    let path = req.files['ProfilePhoto'][0].path;
                    let remainingUrl = path.replace('uploads/', '')
                    newAdmin.ProfilePhoto = remainingUrl;
                }
            }

            admin = await Admin.findByIdAndUpdate(req.admin.id, { $set: newAdmin }, { new: true });
            res.json({ success: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error occurred' });
        }
});


//Create Admin Payment
router.post("/adminPayment", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { BankAccount, Account_No, Account_Title } = req.body;

        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const adminPayment = await AdminAccount.create({
            BankAccount,
            Account_No,
            Account_Title
        });

        success = true;
        res.json({ success, adminPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ AdminPayment
router.get("/adminPayment", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const adminPayment = await AdminAccount.find();
        if (!adminPayment) {
            return res.status(404).json({ success: false, message: 'Admin payment not found' });
        }
        res.json({ success: true, adminPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// UPDATE AdminPayment
router.put("/adminPayment/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const { BankAccount, Account_No, Account_Title } = req.body;
        const adminPayment = await AdminAccount.findByIdAndUpdate(req.params.id, {
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

// DELETE AdminPayment
router.delete("/adminPayment/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const adminPayment = await AdminAccount.findByIdAndDelete(req.params.id);
        if (!adminPayment) {
            return res.status(404).json({ success: false, message: 'Admin payment not found' });
        }
        res.json({ success: true, message: 'Admin payment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



//Plans
// CREATE Plan
router.post("/createPlan", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }


        const { Channel, Service, Price } = req.body;
        const plan = await Plan.create({
            Channel,
            Service,
            Price
        });

        success = true;
        res.json({ success, plan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ Plan by ID
router.get("/getPlans", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

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

// Specfic Plan
router.get("/getPlan/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const plan = await Plan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        res.json({ success: true, plan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// UPDATE Plan by ID
router.put("/updatePlan/:id", fetchadmin, async (req, res) => {
    try {
        const { Channel, Service, Price } = req.body;
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const plan = await Plan.findByIdAndUpdate(req.params.id, {
            Channel,
            Service,
            Price
        }, { new: true });

        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        res.json({ success: true, plan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// DELETE Plan by ID
router.delete("/deletePlan/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }
        res.json({ success: true, message: 'Plan deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



// CREATE Earning
router.post("/createEarning", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const { Channel, Service, Price } = req.body;
        const earning = await Earning.create({
            Channel,
            Service,
            Price
        });

        success = true;
        res.json({ success, earning });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ All
router.get("/getEarnings", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const earning = await Earning.find();
        if (!earning) {
            return res.status(404).json({ success: false, message: 'Earning not found' });
        }
        res.json({ success: true, earning });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ Earning by ID
router.get("/getEarning/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const earning = await Earning.findById(req.params.id);
        if (!earning) {
            return res.status(404).json({ success: false, message: 'Earning not found' });
        }
        res.json({ success: true, earning });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// UPDATE Earning by ID
router.put("/updateEarning/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const { Channel, Service, Price } = req.body;
        const earning = await Earning.findByIdAndUpdate(req.params.id, {
            Channel,
            Service,
            Price
        }, { new: true });

        if (!earning) {
            return res.status(404).json({ success: false, message: 'Earning not found' });
        }

        res.json({ success: true, earning });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// DELETE Earning by ID
router.delete("/deleteEarning/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const earning = await Earning.findByIdAndDelete(req.params.id);
        if (!earning) {
            return res.status(404).json({ success: false, message: 'Earning not found' });
        }
        res.json({ success: true, message: 'Earning deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



// CREATE Service
router.post("/createService", fetchadmin, async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }
        const { Channel, Servicetaken, Amount, URL } = req.body;
        const service = await Service.create({
            Channel,
            Service: Servicetaken,
            Amount,
            URL,
            Status: "Approved"
        });

        success = true;
        res.json({ success, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ New Service Request
router.get("/GoingOnServices", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // const service = await Service.find({ Status: "Approved" }).populate('User_id', 'Name Email')
        // if (!service) {
        //     return res.status(404).json({ success: false, message: 'Service not found' });
        // }

        const services = await Service.find({ Status: "Approved" }).populate('User_id', 'Name Email')
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

        res.json({ success: true, service:serviceWithWorkerTrackCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ Completed Service Request
router.get("/CompletedServices", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" })
        }

        const service = await Service.find({ Status: "Completed" }).populate('User_id', 'Name Email')
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ Service by ID
router.get("/getService/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" })
        }

        const service = await Service.findById(req.params.id).populate('User_id', 'Name Email CNIC ProfilePhoto Phone Gender Age')
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// UPDATE Service by ID
router.put("/updateService/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const { User_id, Channel, Servicetaken, Amount, URL } = req.body;
        const service = await Service.findByIdAndUpdate(req.params.id, {
            User_id,
            Channel,
            Service: Servicetaken,
            Amount,
            URL
        }, { new: true });

        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Approve Service
router.put("/ApproveService/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.findByIdAndUpdate(req.params.id, { Status: "Approved" }, { new: true });

        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// DELETE Service by ID
router.delete("/deleteService/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



//Withdraw
// READ New Withdraw Request
router.get("/getNewWithdraw", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const withdrawals = await WithdrawAccount.find({ Status: "Pending" }).populate('User_id', 'Name Email');
        if (!withdrawals) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        // Fetch worker account details for each withdrawal
        const withdrawalsWithWorkerAccounts = [];
        for (const withdrawal of withdrawals) {
            const workerAccount = await WorkerAccount.findOne({ User_id: withdrawal.User_id });
            if (workerAccount) {
                withdrawalsWithWorkerAccounts.push({
                    withdrawal: {
                        _id: withdrawal._id,
                        User_id: withdrawal.User_id,
                        WithdrawDate: withdrawal.WithdrawDate,
                        Amount: withdrawal.Amount,
                        Status: withdrawal.Status,
                        Approved_Date: withdrawal.Approved_Date
                    },
                    workerAccount
                });
            } else {
                // If worker account not found, include null
                withdrawalsWithWorkerAccounts.push({
                    withdrawal: {
                        _id: withdrawal._id,
                        User_id: withdrawal.User_id,
                        WithdrawDate: withdrawal.WithdrawDate,
                        Amount: withdrawal.Amount,
                        Status: withdrawal.Status,
                        Approved_Date: withdrawal.Approved_Date
                    },
                    workerAccount: null
                });
            }
        }

        res.json({ success: true, withdrawals: withdrawalsWithWorkerAccounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});


router.get("/ApprovedWithdraw", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Calculate the date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Find transactions within the last 30 days and with status "Approved"
        const withdraw = await WithdrawAccount.find({
            Status: "Approved",
            WithdrawDate: { $gte: thirtyDaysAgo } // Filter transactions within the last 30 days
        }).populate('User_id', 'Name Email')

        if (!withdraw) {
            return res.status(404).json({ success: false, message: 'No approved Withdraw found in the last 30 days' });
        }

        res.json({ success: true, withdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/DeclineWithdraw", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Calculate the date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Find transactions within the last 30 days and with status "Approved"
        const withdraw = await WithdrawAccount.find({
            Status: "Declined",
            WithdrawDate: { $gte: thirtyDaysAgo } // Filter transactions within the last 30 days
        }).populate('User_id', 'Name Email')

        if (!withdraw) {
            return res.status(404).json({ success: false, message: 'No Decline Withdraw found in the last 30 days' });
        }

        res.json({ success: true, withdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Approve Withdraw
router.put("/ApproveWithdraw/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const widthdraw = await WithdrawAccount.findByIdAndUpdate(req.params.id, { Status: "Approved", Approved_Date: new Date }, { new: true });
        if (!widthdraw) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, widthdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Declined Withdraw
router.put("/DeclineWithdraw/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const widthdraw = await WithdrawAccount.findByIdAndUpdate(req.params.id, { Status: "Declined" }, { new: true });

        if (!widthdraw) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        const user = await Worker.findOne({ User_id: widthdraw.User_id })
        if (!user) {
            return res.status(404).json({ success: false, message: 'No User Made this Transaction' });
        }
        const balance = user.Earning;
        const newBalance = balance + widthdraw.Amount

        user.Earning = newBalance;
        user.save()

        res.json({ success: true, widthdraw });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



//Transactions
// READ New Transaction Request
router.get("/getNewTransaction", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const transaction = await Transaction.find({ Status: "Pending" }).populate('User_id', 'Name Email')
        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Approned Transations
router.get("/ApprovedTransaction", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        // Calculate the date 30 days ago
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Find transactions within the last 30 days and with status "Approved"
        const transactions = await Transaction.find({
            Status: "Approved",
            Date: { $gte: thirtyDaysAgo } // Filter transactions within the last 30 days
        }).populate('User_id', 'Name Email')

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ success: false, message: 'No approved transactions found in the last 30 days' });
        }

        res.json({ success: true, transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Declined Transations
router.get("/DeclinedTransaction", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const transaction = await Transaction.find({
            Status: "Declined",
            Date: { $gte: thirtyDaysAgo } // Filter transactions within the last 30 days
        }).populate('User_id', 'Name Email')

        if (!transaction || transaction.length === 0) {
            return res.status(404).json({ success: false, message: 'No approved transactions found in the last 30 days' });
        }

        res.json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Approve Transaction
router.put("/ApproveTransaction/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { Status: "Approved" }, { new: true });

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        const user = await Buyer.findOne({ User_id: transaction.User_id })
        if (!user) {
            return res.status(404).json({ success: false, message: 'No User Made this Transaction' });
        }
        const balance = user.Funds;
        const newBalance = balance + transaction.Amount

        user.Funds = newBalance;
        user.save()

        res.json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Declined Transaction
router.put("/DeclineTransaction/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { Status: "Declined" }, { new: true });

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



// //
// //
// Users
// //
// //
router.get("/BuyersList", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" })
        }

        const buyers = await Buyer.find().populate('User_id', 'Name Email CNIC ProfilePhoto CNIC_Front CNIC_Back Phone Age Gender Date')
        if (!buyers) {
            return res.status(404).json({ success: false, message: 'No Buyer Found' });
        }
        res.json({ success: true, buyers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.get("/WorkerList", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" })
        }

        const worker = await Worker.find().populate('User_id', 'Name Email CNIC ProfilePhoto CNIC_Front CNIC_Back Phone Age Gender Date')

        if (!worker) {
            return res.status(404).json({ success: false, message: 'No Workers Found' });
        }
        res.json({ success: true, worker });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.delete("/deleteBuyer/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const buyer = await Buyer.findByIdAndDelete(req.params.id);
        if (!buyer) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = await User.findByIdAndDelete(buyer.User_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

router.delete("/deleteWorker/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const worker = await Worker.findByIdAndDelete(req.params.id);
        if (!worker) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = await User.findByIdAndDelete(worker.User_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});



module.exports = router