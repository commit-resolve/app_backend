const axios = require("axios");

async function createMandateWithSetu(payload) {

  const url = "https://umap.setu.co/api/v1/merchants/collect";

  const requestBody = {
    amount: payload.max_amount,
    currency: payload.currency,
    //customerVpa: payload.customer_vpa,
    expireAfter: 5,
    //merchantReferenceId: payload.mandate_id,
    //merchantVpa: process.env.MERCHANT_VPA,
    transactionNote: "Piggy savings mandate",
    metadata: {
      purpose: payload.purpose
    }
  };


//   const response = await axios.post(url, requestBody, {
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.SETU_ACCESS_TOKEN}`,
//       "merchantId": process.env.SETU_MERCHANT_ID
//     }
//   });
  response = {
  "id": "01ARZ3NDEKTSV4RRFFQ69G5FAV",
  "amount": 10000,
  "currency": "INR",
  "customerVpa": "user@okhdfc",
  "status": "active",
  "createdAt": "2023-09-04T12:08:20+0530",
  "merchantReferenceId": "mandate_123456"
}

  return response;
}

module.exports = {
  createMandateWithSetu
};