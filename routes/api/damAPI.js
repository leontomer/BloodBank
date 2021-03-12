const router = require("express").Router();
const express = require("express");
const dam = require("../../models/dam.model");
router.post("/addBlood", async (req, res) => {
  try {
    const { bloodType, amount } = req.body;
    const blood = await dam.findOne({ bloodType: bloodType });

    if (!blood) {
      let blood = new dam({
        bloodType: bloodType,
        bloodAmount: amount,
      });
      await blood.save();
    } else {
      blood.bloodAmount = blood.bloodAmount + amount;
      await blood.save();
    }
    res.json("ok");
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

router.route("/getBlood").get(async (req, res) => {
  try {
    blood = await dam.find();
    res.json(blood);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.route("/getUrgBlood").post(async (req, res) => {
  try {
    let { bloodAmount } = req.body;
    let msg = "got ";
    blood = await dam.findOne({ bloodType: "O-" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "O+" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        console.log("ent2");

        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "A-" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;

        blood.bloodAmount = 0;
        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "B-" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "A+" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;

        blood.bloodAmount = 0;
        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "B+" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "AB-" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;

        blood.bloodAmount = 0;
        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    }

    blood = await dam.findOne({ bloodType: "AB+" });
    if (blood && blood.bloodAmount > 0) {
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        msg += " , " + bloodAmount + " units of blood " + blood.bloodType;
        res.json(msg);
      } else {
        msg += " , " + blood.bloodAmount + " units of blood " + blood.bloodType;
        bloodAmount = bloodAmount - blood.bloodAmount;

        blood.bloodAmount = 0;
        await blood.save();
        if (bloodAmount == 0) res.json(msg);
      }
    } else {
      res.json("no sufficient blood available. only " + msg);
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.post("/subBlood", async (req, res) => {
  try {
    let { bloodType, bloodAmount } = req.body;
    let result, result2, result3, result4, result5, result6, result7, result8;
    const origBloodAmount = bloodAmount;

    let blood = await dam.findOne({ bloodType: bloodType });

    if (blood && blood.bloodAmount - bloodAmount > -1) {
      blood.bloodAmount = blood.bloodAmount - bloodAmount;
      await blood.save();
      res.json("got " + bloodAmount + " units of blood " + bloodType);
    }
    if (bloodType === "O-") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();
      res.json("got " + result + " units of O- available");
    }
    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "A-") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A- and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A- and only " +
            result2 +
            " units of type O-"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "B-") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type B- and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type B- and only " +
            result2 +
            " units of type O-"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "O+") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type O+ and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type O+ and only " +
            result2 +
            " units of type O-"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "A+") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+ and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "A-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+, " +
            result2 +
            " units of type O-, " +
            bloodAmount +
            " units of type A-"
        );
      } else {
        result3 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }
      blood = await dam.findOne({ bloodType: "O+" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type A-, " +
            bloodAmount +
            " units of type O+"
        );
      } else {
        result4 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type A- and only " +
            result4 +
            " units of type O+"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "B+") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type B+ and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "B-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type B+, " +
            result2 +
            " units of type O-, " +
            bloodAmount +
            " units of type B-"
        );
      } else {
        result3 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }
      blood = await dam.findOne({ bloodType: "O+" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            bloodAmount +
            " units of type O+"
        );
      } else {
        result4 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type A+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B- and only " +
            result4 +
            " units of type O+"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "AB-") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB- and " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "B-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB-, " +
            result2 +
            " units of type O-, " +
            bloodAmount +
            " units of type B-"
        );
      } else {
        result3 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }
      blood = await dam.findOne({ bloodType: "A-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB-, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            bloodAmount +
            " units of type A-"
        );
      } else {
        result4 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB-, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B- and only " +
            result4 +
            " units of type A-"
        );
      }
    }

    blood = await dam.findOne({ bloodType: bloodType });

    if (bloodType === "AB+") {
      bloodAmount = bloodAmount - blood.bloodAmount;
      result = blood.bloodAmount;
      blood.bloodAmount = 0;
      await blood.save();

      blood = await dam.findOne({ bloodType: "O-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            bloodAmount +
            " units of type O-"
        );
      } else {
        result2 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "B-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            bloodAmount +
            " units of type B-"
        );
      } else {
        result3 = blood.bloodAmount;
        bloodAmount = bloodAmount - blood.bloodAmount;
        blood.bloodAmount = 0;

        await blood.save();
      }
      blood = await dam.findOne({ bloodType: "A-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            bloodAmount +
            " units of type A-"
        );
      } else {
        result4 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "O+" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            result4 +
            " units of type A-" +
            bloodAmount +
            " units of type O+"
        );
      } else {
        result5 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "A+" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            result4 +
            " units of type A-" +
            result5 +
            " units of type O+" +
            bloodAmount +
            " units of type A+"
        );
      } else {
        result6 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "B+" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            result4 +
            " units of type A-" +
            result5 +
            " units of type O+" +
            result6 +
            " units of type A+" +
            bloodAmount +
            " units of type B+"
        );
      } else {
        result7 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
      }

      blood = await dam.findOne({ bloodType: "AB-" });
      if (blood.bloodAmount >= bloodAmount) {
        blood.bloodAmount = blood.bloodAmount - bloodAmount;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            result4 +
            " units of type A-" +
            result5 +
            " units of type O+" +
            result6 +
            " units of type A+" +
            result7 +
            " units of type B+" +
            bloodAmount +
            " units of type AB-"
        );
      } else {
        result8 = blood.bloodAmount;
        blood.bloodAmount = 0;
        await blood.save();
        res.json(
          "got " +
            result +
            " units of type AB+, " +
            result2 +
            " units of type O-, " +
            result3 +
            " units of type B-, " +
            result4 +
            " units of type A-," +
            result5 +
            " units of type O+," +
            result6 +
            " units of type A+," +
            result7 +
            " units of type B+, and only" +
            bloodAmount +
            " units of type AB-"
        );
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
