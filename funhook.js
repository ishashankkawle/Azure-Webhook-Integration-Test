var Crypto = require('crypto');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var hmac = Crypto.createHmac("sha1", "EoLCcRRDuqeNjJnLtIvcCItQnRYTdZdTQHGFgV5sKel9iYgV1SM2sA==");
    var signature = hmac.update(JSON.stringify(req.body)).digest("hex");

    var shaSig = `sha1=${signature}`;

    var gitSig = req.headers["x-hub-signature"];


    if (!shaSig.localeCompare(gitSig)) 
    {
        if (req.body.pages[0].title) 
        {
            context.res = 
            {
                // status: 200, /* Defaults to 200 */
                body: "There has bee update in  " + req.body.pages[0].title
            };
        }
        else {
            context.res = 
            {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
        }
    }
    else
    {
        context.res = {status:400,
        body: "KEY MATCH FAILED" }
    }

};
