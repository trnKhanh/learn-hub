const Payment = require("../models/Payments.model");
const PaymentInformation = require("../models/PaymentInformations.model");
const { validationResult, matchedData } = require("express-validator");

const createPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send(errors);
    return;
  }
  const data = matchedData(req);

  try {
    if (!PaymentInformation.findOne({ user_id: req.user.id })) {
      res.status(400).send({
        message: "User have no payment information",
      });
      return;
    }
    // execute payment here
    //
    // end execute
    const payment = await Payment.create(req.user.id, data);
    if (!payment) {
      res.status(400).json({
        message: "No course in cart",
      });
    } else {
      res.status(201).json({
        message: "Payment has been created",
        payment: payment,
      });
    }
  } catch (err) {
    console.log(err);

    // role back payment
    // 
    //
    if (err.code.includes("ER_NO_REFERENCED")) {
      res.status(404).json({
        message: "User is not a student",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when creating payment",
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      student_id: req.user.id,
    });
    res.status(200).json({
      message: "Retrieve all payments successfully",
      payments: payments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when getting all payments' information",
    });
  }
};

const getPaymentInfo = async (req, res) => {
  try {
    const payment = await Payment.getInfoById(req.params.id);
    if (!payment) {
      res.status(404).json({
        message: "No payment found",
      });
      return;
    }
    res.status(200).json({
      message: "Retrieve payment's information successfully",
      payment: payment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Errors occur when gettign payment's information",
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentInfo,
};
