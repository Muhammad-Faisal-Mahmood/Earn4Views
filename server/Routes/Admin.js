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
        const { User_id, Channel, Service, Amount, URL } = req.body;
        const service = await Service.create({
            User_id,
            Channel,
            Service,
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
router.get("/getNewServices", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.find({ Status: "Pending" });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ New Service Request
router.get("/ApprovedServices", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.find({ Status: "Approved" });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

// READ Delined Service Request
router.get("/DeclinedServices", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.find({ Status: "Declined" });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
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
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.find({ Status: "Declined" });
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
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const service = await Service.findById(req.params.id);
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

        const { User_id, Channel, Service, Amount, URL } = req.body;
        const service = await Service.findByIdAndUpdate(req.params.id, {
            User_id,
            Channel,
            Service,
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

//Decline Service
router.put("/DeclineService/:id", fetchadmin, async (req, res) => {
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

        const withdraw = await WithdrawAccount.find({ Status: "Pending" });
        if (!withdraw) {
            return res.status(404).json({ success: false, message: 'Service not found' });
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

        const widthdraw = await WithdrawAccount.findByIdAndUpdate(req.params.id, { Status: "Approved" }, { new: true });

        if (!widthdraw) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

//Declined Withdraw
router.put("/DeclinedWithdraw/:id", fetchadmin, async (req, res) => {
    try {
        let admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "You Have no Access" });
        }

        const widthdraw = await WithdrawAccount.findByIdAndUpdate(req.params.id, { Status: "Declined" }, { new: true });

        if (!widthdraw) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }
});

module.exports = router