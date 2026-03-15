const CreateMandateRequest = require('../models/createMnadate');
const { createMandateWithSetu } = require('./setuApis');

const test = (req, res) => {
    res.status(200).json({ message: 'Controller is working!' });
}

const payment_req = {"original_payment":{
    "merchantId":"M123",
    "transactionId": "TNX1234",
    "amount": 25000,
    "status" : "SUCCESS",
    "paymentMode" : "UPI",
    "upiTransactionId" : "1234567890",
    "checksum": "axywjkha.."
    },
    "wallet_request": {
        "merchantId":"PiggyApp_Merchant",
        "transactionId": "TNX1234",
        "amount": 5000,
        "status" : "SUCCESS",
        "paymentMode" : "UPI",
        "upiTransactionId" : "1234567890",
        "checksum": "axywjkha.."
    }}
const transaction = (req, res) => {
    res.status(200).json({ message: 'entered transaction' });
}

const createMandate = async (req, res) => {
    var validatedPayload;
    try {

    validatedPayload = await CreateMandateRequest.validate(req.body);
    if (validatedPayload.error) {
        return res.status(400).json(validatedPayload);
    }
    //return res.status(201).json(validatedPayload);
    
  } catch (error) {
    next(error);
  }
  //console.log(validatedPayload);
  try {
    const setuResponse = await createMandateWithSetu(validatedPayload);
    //console.log(setuResponse);
    if (setuResponse.error) {
      return res.status(400).json(setuResponse);
    }
    return res.status(201).json(setuResponse);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {test, transaction, createMandate}