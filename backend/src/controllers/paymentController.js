const Payment = require("../models/paymentModel");
const User = require('../models/userModel')
var http = require("http"),
  fs = require("fs"),
  ccav = require("../../ccavutil"),
  crypto = require("crypto"),
  qs = require("querystring");

// OrderId generator
function generateOrderID() {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random(10000) * 1000); // Add a random component
  const uniqueID = `${randomPart}-${timestamp}`;
  return uniqueID;
}

const postReq = async function (request, response) {
  try {
    const { userId, courseName, amount } = request.body;
    const order_id = generateOrderID();

    const merchant_id = process.env.MERCHANT_ID;
    const workingKey = process.env.WORKING_KEY;
    const accessCode = process.env.ACCESS_CODE;

    const Body = {
      merchant_id: merchant_id,
      product: courseName,
      order_id: order_id,
      currency: "INR",
      amount: Number(amount),
      redirect_url: "http://localhost:3000/ccavResponseHandler",
      cancel_url: "http://localhost:3000/ccavResponseHandler",
      billing_name: "myyearbook",
      billing_address: "Gurgaon",
      billing_city: "New Delhi",
      billing_state: "HR",
      billing_zip: "123106",
      billing_country: "India",
      billing_tel: "9876543210",
      billing_email: "testing@domain.com",
      language: "EN",
      integration_type: "iframe_normal",
      promo_code: "",
      merchant_param1: userId,
      merchant_param2: courseName
    };

    // Convert the body object to a URL-encoded string
    const formData = qs.stringify(Body);

    // Generate MD5 hash for the key and then convert to base64 string
    const md5 = crypto.createHash("md5").update(workingKey).digest();
    const keyBase64 = Buffer.from(md5).toString("base64");

    // Initializing Vector and then convert to base64 string
    const ivBase64 = Buffer.from([
      0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
      0x0c, 0x0d, 0x0e, 0x0f,
    ]).toString("base64");

    // Encrypt the form data
    const encRequest = ccav.encrypt(formData, keyBase64, ivBase64);

    // Construct the final URL for the payment page
    const redirect_url = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${merchant_id}&encRequest=${encRequest}&access_code=${accessCode}`;

    const resData = {
      order_id: order_id,
      amount: Number(amount),
      user_id: userId,
      redirect_url: redirect_url,
    };
    response.status(200).json(resData);
  } catch (error) {
    console.error("An error occurred:", error);
    return response.status(500).json({ error: "An error occurred" });
  }
};

//generate response

const postRes = function (request, response) {
  console.log(request)
  var paymentDetails;
  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = process.env.WORKING_KEY, //Put in the 32-Bit key provided by CCAvenues.
    ccavPOST = "";

  //Generate Md5 hash for the key and then convert in base64 string
  var md5 = crypto.createHash("md5").update(workingKey).digest();
  var keyBase64 = Buffer.from(md5).toString("base64");

  //Initializing Vector and then convert in base64 string
  var ivBase64 = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]).toString("base64");

  request.on("data", async function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
    // convert response into json
    paymentDetails = qs.parse(ccavResponse);
    console.log(paymentDetails)
    // save Payment details in database
    const params = {
      orderStatus: {
        orderStatus: paymentDetails.order_status,
        orderMsg: paymentDetails.failure_message,
        orderCode: paymentDetails.status_code
      },
      orderId: paymentDetails.order_id,
      txnId: paymentDetails.tracking_id,
      bankTxnId: paymentDetails.bank_ref_no,
      txnAmount: paymentDetails.mer_amount,
      refundAmt: paymentDetails.amount,
      paymentMode: paymentDetails.payment_mode,
      userId: paymentDetails.merchant_param1,
      courseName: paymentDetails.merchant_param2,
      paidAt: paymentDetails.trans_date,
    };
    addPayment(params);
  });

  request.on("end", async function () {
    let resData = {
      orderStatus: paymentDetails.order_status,
      orderId: paymentDetails.order_id,
      txnId: paymentDetails.tracking_id,
      userId: paymentDetails.merchant_param1,
      courseName: paymentDetails.merchant_param2
    };


    let addPaidCourse = await User.updateOne({ _id: paymentDetails.merchant_param1 }, { $set: resData })

    console.log(resData)
    response.status(200).render(resData);
    response.end();
  });
};

//save payment
async function addPayment(data) {
  try {
    await Payment.create(data);
  } catch (error) {
    console.log("Payment failed!", error.message)
  }
}

const htmlTest = (req, res) => {
  res.render("success")
}

module.exports = { postReq, postRes, htmlTest };
