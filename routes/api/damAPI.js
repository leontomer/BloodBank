const router = require("express").Router();
const dam = require("../../models/donate.model");
const damBank = require("../../models/allblood.model");
const logs = require("../../models/log.model");
const auth = require("../../middleware/auth");
const user = require("../../models/user.model");
const { findById } = require("../../models/donate.model");
const adminAuth = require("../../middleware/adminAuth");
const studentAuth = require("../../middleware/studentAuth");
//const { findOne } = require("../../models/donate.model");
const donationTable = {
  "A+": {
    DonateTo: ["A+", "AB+"],
    RecieveFrom: ["A+", "A-", "O+", "O-"],
  },
  "O+": {
    DonateTo: ["O+", "A+", "B+", "AB+"],
    RecieveFrom: ["O+", "O-"],
  },
  "B+": {
    DonateTo: ["B+", "AB+"],
    RecieveFrom: ["B+", "B-", "O+", "O-"],
  },
  "AB+": {
    DonateTo: ["AB+"],
    RecieveFrom: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
  },
  "A-": {
    DonateTo: ["A+", "A-", "AB+", "AB-"],
    RecieveFrom: ["A-", "O-"],
  },
  "O-": {
    DonateTo: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
    RecieveFrom: ["O-"],
  },
  "B-": {
    DonateTo: ["B+", "B-", "AB+", "AB-"],
    RecieveFrom: ["B-", "O-"],
  },
  "AB-": {
    DonateTo: ["AB+", "AB-"],
    RecieveFrom: ["AB-", "A-", "B-", "O-"],
  },
};
const donationPriorityQueue = [
  "O-",
  "O+",
  "A-",
  "B-",
  "A+",
  "B+",
  "AB-",
  "AB+",
];

router.post("/addBlood", auth, async (req, res) => {
  try {
    const { bloodType, amount, name, phoneNumber } = req.body;
    const donator = await dam.findOne({ phoneNumber: phoneNumber });
    if (donator && donator.name !== name) {
      return res.status(400).json({
        title: "Error",
        msg: "Your donator's phone already exists with a different name",
      });
    }

    if (donator && donator.bloodType !== bloodType) {
      return res.status(400).json({
        title: "Error",
        msg: "Your deposit exists with a different blood type",
      });
    }
    if (!donator) {
      const newDonator = new dam({
        bloodType: bloodType,
        bloodAmount: amount,
        name: name,
        phoneNumber: phoneNumber.toString(),
      });
      const blood = await damBank.findOne({ bloodType: bloodType });
      if (!blood) {
        let blood = new damBank({
          bloodType: bloodType,
          bloodAmount: amount,
        });
        await blood.save();
      } else {
        blood.bloodAmount = blood.bloodAmount + amount;
        await blood.save();
      }
      await newDonator.save();
    } else {
      donator.bloodAmount = donator.bloodAmount + amount;
      await donator.save();
    }
    MyUser = await user.findById(req.user.id);

    newlog = new Log({ actionName: "Donate", user: MyUser.email });
    await newlog.save();
    res.status(200).json({
      title: "Thanks for donating",
      msg: "Your response has been successfully registered in the bank",
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

router.get("/getAllDonators", adminAuth, async (req, res) => {
  try {
    const bloodbank = await dam.find();
    res.json({ bloodbank });
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/deleteBank").delete(adminAuth, async (req, res) => {
  await dam.deleteMany();
  await damBank.deleteMany();
  MyUser = await user.findById(req.user.id);
  newlog = new Log({ actionName: "Delete Bank Data", user: MyUser.email });
  await newlog.save();
  res.status(200).json({ msg: "deleted" });
});
router.route("/extractEmergency").post(auth, async (req, res) => {
  try {
    const { amount } = req.body;
    let allBloodDonations = [];
    let unableToGetAmount = amount;

    for (let i = 0; i < donationPriorityQueue.length; i++) {
      const bloodMatchingType = await dam.find({
        bloodType: donationPriorityQueue[i],
      });
      if (bloodMatchingType.length > 0) {
        const { donatorsList, collectedBloodAmount: remainingBlood } =
          await loopOverAndFindDonators(bloodMatchingType, amount);

        allBloodDonations = allBloodDonations.concat([...donatorsList]);
        unableToGetAmount = remainingBlood;
        if (remainingBlood === 0) break;
      }
    }
    MyUser = await user.findById(req.user.id);

    newlog = new Log({
      actionName: "Got Blood For Emergency",
      user: MyUser.email,
    });
    await newlog.save();
    return res.json({ allBloodDonations, remainsToCollect: unableToGetAmount });
  } catch (error) {
    console.error("error", error);
    res.status(400).json("Error: " + error);
  }
});

const loopOverAndFindDonators = async (bloodMatchingType, amount) => {
  let collectedBloodAmount = amount;
  let donatorsList = [];

  for (let i = 0; i < bloodMatchingType.length; i++) {
    const isDonatorHaveBloodAndBloodRequired =
      collectedBloodAmount > 0 &&
      collectedBloodAmount >= bloodMatchingType[i].bloodAmount &&
      bloodMatchingType[i].bloodAmount !== 0;

    const isDonatorHaveBloodAndBloodRequiredIsSmallerThenDonatorBlood =
      collectedBloodAmount > 0 &&
      collectedBloodAmount < bloodMatchingType[i].bloodAmount &&
      bloodMatchingType[i].bloodAmount !== 0;

    const bloodWasCollected = collectedBloodAmount == 0;

    if (isDonatorHaveBloodAndBloodRequired) {
      blood = await damBank.findOne({
        bloodType: bloodMatchingType[i].bloodType,
      });
      blood.bloodAmount = blood.bloodAmount - amount;
      await blood.save();
      collectedBloodAmount =
        collectedBloodAmount - bloodMatchingType[i].bloodAmount;
      const needToCollect = bloodMatchingType[i].bloodAmount;
      bloodMatchingType[i].bloodAmount = 0;
      donatorsList.push({
        _id: bloodMatchingType[i]._id,
        amountToTake: needToCollect,
        phoneNumber: bloodMatchingType[i].phoneNumber,
        name: bloodMatchingType[i].name,
        bloodType: bloodMatchingType[i].bloodType,
      });
      await bloodMatchingType[i].save();
    } else if (isDonatorHaveBloodAndBloodRequiredIsSmallerThenDonatorBlood) {
      bloodMatchingType[i].bloodAmount =
        bloodMatchingType[i].bloodAmount - collectedBloodAmount;
      blood = await damBank.findOne({
        bloodType: bloodMatchingType[i].bloodType,
      });
      blood.bloodAmount = blood.bloodAmount - amount;
      await blood.save();
      const needToCollect = collectedBloodAmount;
      donatorsList.push({
        _id: bloodMatchingType[i]._id,
        amountToTake: needToCollect,
        phoneNumber: bloodMatchingType[i].phoneNumber,
        name: bloodMatchingType[i].name,
        bloodType: bloodMatchingType[i].bloodType,
      });
      await bloodMatchingType[i].save();
      collectedBloodAmount = 0;
      break;
    } else if (bloodWasCollected) {
      break;
    }
  }
  return { donatorsList, collectedBloodAmount };
};

router.route("/getBlood").get(studentAuth, async (req, res) => {
  try {
    blood = await damBank.find();
    res.json(blood);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/getLogs").get(adminAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    finalLogs = await logs.find({
      actionDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    res.json(finalLogs);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/extractBloodDonation").post(adminAuth, async (req, res) => {
  try {
    const { amount, bloodType } = req.body;
    const bloodMatchingType = await dam.find({ bloodType });
    let allBloodDonations = [];
    let unableToGetAmount = amount;

    if (bloodMatchingType.length > 0) {
      const { donatorsList, collectedBloodAmount: remainsToCollect } =
        await loopOverAndFindDonators(bloodMatchingType, amount);
      allBloodDonations = allBloodDonations.concat([...donatorsList]);
      unableToGetAmount = remainsToCollect;
    }
    const efficientQueue = donationPriorityQueue.reverse();

    if (unableToGetAmount == 0) {
      MyUser = await user.findById(req.user.id);

      newlog = new Log({ actionName: "Got Blood", user: MyUser.email });
      await newlog.save();
      return res.json({
        allBloodDonations,
        remainsToCollect: unableToGetAmount,
      });
    }
    for (let i = 0; i < efficientQueue.length; i++) {
      if (donationTable[efficientQueue[i]].DonateTo.includes(bloodType)) {
        const bloodMatchingType = await dam.find({
          bloodType: efficientQueue[i],
        });
        if (bloodMatchingType.length > 0) {
          const { donatorsList, collectedBloodAmount: remainingBlood } =
            await loopOverAndFindDonators(bloodMatchingType, unableToGetAmount);
          allBloodDonations = allBloodDonations.concat([...donatorsList]);
          unableToGetAmount = remainingBlood;
          if (remainingBlood === 0) break;
        }
      }
    }
    MyUser = await user.findById(req.user.id);

    newlog = new Log({ actionName: "Got Blood", user: MyUser.email });
    await newlog.save();
    return res.json({ allBloodDonations, remainsToCollect: unableToGetAmount });
  } catch (error) {
    console.log("error", error);
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
