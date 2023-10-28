const aws = require("aws-sdk");

aws.config.update({
    accessKeyId:"AKIA6DNK6D2UYNXDWQGT",
    secretAccessKey:"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",
    region: "ap-south-1"
})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2012-10-17' }); // we will be using the s3 service of aws

        var uploadParams = {
            ACL: "public-read",
            Bucket: "myyearbook",  //HERE
            Key: "9'th/English/Beehive/" + file.originalname, //HERE 
            Body: file.buffer
        }
        // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
        // Please convert to `await client.upload(params, options).promise()`, and re-run aws-sdk-js-codemod.
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)

        })

    });
}


module.exports.uploadFile=uploadFile