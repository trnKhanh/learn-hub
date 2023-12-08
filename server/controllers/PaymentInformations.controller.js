const PaymentInformation = require("../models/PaymentInformations.model");

const createPaymentInformation = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    const payment_information = await PaymentInformation.create({
      user_id: req.user.id,
      ...req.body,
    });
    res.status(201).json({
      message: "PaymentInformation has been created",
      payment_information: payment_information,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "ER_BAD_FIELD_ERROR") {
      res.status(400).json({
        message: "Wrong fields",
      });
      return;
    }
    if (err.code == "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "Duplicate card",
      });
      return;
    }
    res.status(500).json({
      message: "Errors occur when adding course to cart",
    });
  }
};

const getPaymentInformations = async (req, res) => {
  try {
    const paymentInformations = await PaymentInformation.findAll({
      user_id: req.user.id,
    });
    res.status(200).json({
      message: "Retrieve payment information's information successfully",
      payment_informations: paymentInformations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        "Errors occur when getting all payment informations' information",
    });
  }
};

// Delete payment_information information
const deletePaymentInformation = async (req, res) => {
  if (!req.body || !req.body.card) {
    res.status(400).send({
      message: "Invalid content",
    });
    return;
  }
  try {
    const paymentInformation = await PaymentInformation.delete(
      req.user.id,
      req.body.card,
    );
    if (!paymentInformation) {
      res.status(404).json({
        message: "No matching payment information existed",
      });
    } else {
      res.status(200).json({
        message: "PaymentInformation has been updated",
        payment_information: paymentInformation,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Errors occur when updating payment information",
    });
  }
};
module.exports = {
  createPaymentInformation,
  deletePaymentInformation,
  getPaymentInformations,
};
