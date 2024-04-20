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
const path = require('path')


const upload = multer({ storage: multer.memoryStorage() });

const JWT_KEY = "EarnFarooqWithViews";


const PhotosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(9)
        return cb(null, './uploads/UserProfile');
        console.log(8)
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const PhotosUploader = multer({ storage: PhotosStorage });


const CNICStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads/UserCNIC");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const CNICUploader = multer({ storage: CNICStorage });


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ipocryptos@gmail.com', // Your Gmail email address
        pass: 'ixbw rudr efft hedl', // Your Gmail app password or an app-specific password
    },
})

const sendOTPEmail = async (id, email, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        const mailOptions = {
            from: "ipocryptos@gmail.com",
            to: email,
            subject: `Verify Your Email`,
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the proccess of Signup</p>
            <p>This OTP will expire in 15 Minute</p>`
        }


        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds)

        await OTP.deleteMany({ UserID: id });

        const otpresponse = await OTP.create({
            UserID: id,
            OTP: hashedOTP,
            createdAt: new Date(),
            expireAt: new Date(Date.now() + 240000)
        })

        await transporter.sendMail(mailOptions)

        return {
            status: "Pending",
            message: "Verification otp email send",
        };
    } catch (error) {
        return {
            status: "Failed",
            message: error.message,
        };
    }
}

///////
//API's Start
/////
//Create a user 
router.post("/createuser", async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        let user = await User.findOne({ Email: req.body.Email })
        if (user) {
            return res.status(404).json({ success, error: "This Email already exist" })
        }


        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.Password, Salt)

        user = await User.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Role: req.body.Role,
            Password: SecPassword
        })

        if(req.body.Role=='Buyer'){
            let buyer = await Buyer.create({
                User_id: user.id,
                Funds: 0,
            })
        }else if(req.body.Role=='Worker'){
            let worker = await Worker.create({
                User_id: user.id,
                Earning: 0,
            })
        }


        const response = await sendOTPEmail(user._id, req.body.Email, res);

        const data = {
            user: {
                id: user.id,
            }
        }
        const AuthToken = jwt.sign(data, JWT_KEY);

        success = true;
        res.json({ success, AuthToken, Role: req.body.Role, response })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Verify OTP
router.post("/verifyOTP", async (req, res) => {
    try {
        let { token, otp } = req.body;
        const password = jwt.verify(token, JWT_KEY);
        const userID = password.user.id;
        if (!userID || !otp) {
            res.json({
                status: "Failed",
                message: "Empty otp details are not allowed"
            });
        } else {
            const otpVerification = await OTP.findOne({ UserID: userID });

            if (!otpVerification) {
                res.json({
                    success: false,
                    message: "Account record doesn't exist"
                });
            } else {
                const { expireAt } = otpVerification;
                const hashedOTP = otpVerification.OTP;

                if (expireAt < new Date()) {
                    await OTP.deleteMany({ UserID: userID });
                    res.json({
                        success: false,
                        message: "Code has expired. Please request again"
                    });
                } else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        res.json({
                            success: false,
                            message: "Invalid code passed. Check your inbox"
                        });
                    } else {
                        await User.updateOne({ _id: userID }, { Is_Verfied: true });
                        await OTP.deleteMany({ UserID: userID });

                        res.json({
                            success: true,
                            message: "User Email verified successfully"
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Send OTP Again
router.post("/SendOTPagain", async (req, res) => {
    try {
        const { token } = req.body;
        const password = jwt.verify(token, JWT_KEY);
        const userID = password.user.id;

        // Delete existing OTP verification document
        await OTP.deleteMany({ UserID: userID });

        // Fetch user data by userID
        const user = await User.findOne({ _id: userID });

        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const email = user.Email;

        // Send new OTP email
        await sendOTPEmail(userID, email);

        res.json({
            success: true,
            message: "OTP Sent Successfully"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Send OTP for forget Password
router.post("/SendOTPemail", async (req, res) => {
    try {
        const { email } = req.body;

        // Fetch user data by userID
        const user = await User.findOne({ Email: email });


        if (!user) {
            res.json({
                success: false,
                message: "No User with this Email"
            });
            return;
        }

        await OTP.deleteMany({ UserID: user._id });


        // Send new OTP email
        await sendOTPEmail(user._id, email);

        res.json({
            success: true,
            id: user._id,
            message: "OTP Sent Successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

//Login a user
router.post("/loginuser", async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Password } = req.body;

    try {
        let user = await User.findOne({ Email: Email })
        if (!user) {
            return res.status(400).json({ Message: "Account doesn't Fine" })
        }

        const passwordCompare = await bcrypt.compare(Password, user.Password)
        if (!passwordCompare) {
            return res.status(400).json({ Message: "UserName or Password Does not Find" })
        }

        const Payload = {
            user: {
                id: user.id,
            }
        }

        const AuthToken = jwt.sign(Payload, JWT_KEY);
        success = true;
        
        if (!user.Is_Verfied) {
            await sendOTPEmail(user._id, user.Email);
            return res.json({ success: true, Email: false, Message: "Email Verification Required", AuthToken });
        }

        res.json({ success, AuthToken })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Upload Profile Image
router.put("/UpProImg", fetchuser, PhotosUploader.single('Proimg'), async (req, res) => {
        try {
            let userid = req.user.id;
            console.log(1)
            console.log(req.file)
            let path = req.file.path;
            console.log(2)
            let remainingUrl = path.replace('uploads/', '')
            console.log(3)
            
            const user = await User.findById({ _id: userid }).select("ProfilePhoto");
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            await User.findOneAndUpdate(
                { _id: userid },
                { ProfilePhoto: remainingUrl }
            );
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            console.log(error);
            res.status(500).send('Error occurred');
        }
});

//Get User Data
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById({ _id: userid });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ProfilePhoto) {
            const userData = { ...user.toObject(), ProfilePhoto: undefined };
            res.json({ success: true, userData: userData });

        } else {
            res.json({ success: true, userData: user });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Get Profile Image
router.get("/getProImg", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById({ _id: userid }).select("ProfilePhoto");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.ProfilePhoto) {
            res.json({ success: true, ImageData: false });
        } else {
            res.json({ success: true, ImageData: true, user: user });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

//Update User Data 
router.put("/UpdateUser",
    fetchuser,
    PhotosUploader.fields([
        { name: 'ProfilePhoto', maxCount: 1 },
    ]), async (req, res) => {
        try {
            const { Name, CNIC, Phone, Age, Gender } = req.body;

            const newUser = {};
            if (Name) newUser.Name = Name;
            if (CNIC) newUser.CNIC = CNIC;
            if (Phone) newUser.Phone = Phone;
            if (Age) newUser.Age = Age;
            if (Gender) newUser.Gender = Gender;

            let user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            if (req.files) {
                if (req.files['ProfilePhoto']) {
                    let path = req.files['ProfilePhoto'][0].path;
                    let remainingUrl = path.replace('uploads/', '')
                    newUser.ProfilePhoto = remainingUrl;
                }
            }

            user = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true });
            res.json({ success: true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error occurred' });
        }
});

//Update CNIC
router.put("/UpdateCNIC", fetchuser,
    CNICUploader.fields([
        { name: 'CNIC_Front', maxCount: 1 },
        { name: 'CNIC_Back', maxCount: 1 }
    ]), async (req, res) => {
        try {

            let user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({ error: "Account not found" });
            }

            const newUser = {};

            if (req.files) {
                if (req.files['CNIC_Front']) {
                    let path = req.files['CNIC_Front'][0].path;
                    let remainingUrl = path.replace('uploads/', '')
                    newUser.CNIC_Front = remainingUrl;
                }
                if (req.files['CNIC_Back']) {
                    let path = req.files['CNIC_Back'][0].path;
                    let remainingUrl = path.replace('uploads/', '')
                    newUser.CNIC_Back = remainingUrl;
                }
            }

            user = await User.findByIdAndUpdate(req.user.id, { $set: newUser }, { new: true });
            if (!user) {
                return res.status(404).json({ success: false, message: "Beautician not found" });
            }

            res.json({ success: true });

        } catch (error) {
            // if (req.files) {
            //     Object.values(req.files).forEach(async (fileArray) => {
            //         await Promise.all(fileArray.map(async (file) => {
            //             await fs.unlink(file.path);
            //         }));
            //     });
            // }

            console.log(error)

            res.status(500).json({ success: false, message: 'Error occurred' });
        }
});

//Change Password
router.put("/ChangePassword", fetchuser, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const passwordCompare = await bcrypt.compare(oldPassword, user.Password);

        if (!passwordCompare) {
            return res.json({ success: false, message: "Invalid Old Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

//Forget Password 
router.put("/forgetPassword", fetchuser, async (req, res) => {
    try {
        const { OTPReq, NewPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const otpVerification = await OTP.findOne({ UserID: req.user.id });

        if (!otpVerification) {
            return res.json({
                success: false,
                message: "Request OTP Again"
            });
        }

        const { expireAt } = otpVerification;
        const hashedOTP = otpVerification.OTP;

        if (expireAt < new Date()) {
            await OTP.deleteMany({ UserID: req.user.id });
            return res.json({
                success: false,
                message: "Code has expired. Please request again"
            });
        }

        const validOTP = await bcrypt.compare(OTPReq, hashedOTP);

        if (!validOTP) {
            return res.json({
                success: false,
                message: "Invalid code passed. Check your inbox"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(NewPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        // Delete the OTP verification record
        await OTP.deleteMany({ UserID: req.user.id });

        res.json({
            success: true,
            message: "Password Updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

//Forget Password with email
router.put("/forgetPasswordemail", async (req, res) => {
    try {
        const { OTPReq, NewPassword, id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ error: "Account not found" });
        }

        const otpVerification = await OTP.findOne({ UserID: id });

        if (!otpVerification) {
            return res.json({
                success: false,
                message: "Request OTP Again"
            });
        }

        const { expireAt } = otpVerification;
        const hashedOTP = otpVerification.OTP;

        if (expireAt < new Date()) {
            await OTP.deleteMany({ UserID: id });
            return res.json({
                success: false,
                message: "Code has expired. Please request again"
            });
        }

        const validOTP = await bcrypt.compare(OTPReq, hashedOTP);

        if (!validOTP) {
            return res.json({
                success: false,
                message: "Invalid code passed. Check your inbox"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(NewPassword, salt);

        // Update the user's password in MongoDB
        user.Password = hashedNewPassword;
        await user.save();

        // Delete the OTP verification record
        await OTP.deleteMany({ UserID: id });

        res.json({
            success: true,
            message: "Password Updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred');
    }
});



//Get plans
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


//Get Earning Pricing
router.get("/getEarnings", async (req, res) => {
    try {
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


module.exports = router