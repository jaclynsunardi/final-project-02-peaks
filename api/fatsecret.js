import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });

const KEY = process.env.FATSECRET_KEY
const SECRET = process.env.FATSECRET_CONSECRET
const URL = "https://platform.fatsecret.com/rest/server.api"

const payload = {
    oauth_consumer_key: KEY,
    oauth_signature_method:"HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_nonce:"abc",
    oauth_version: "1.0"
    
}

console.log(KEY, SECRET)

// I'm leaving this here just for reference. The FatSecret API uses OAuth 2.0 which requires us to
// manually specify IP addresses in order to make requests. 
// 
// Since we are deploying on Vercel, we won't be able to get a set IP address in order for the API 
// to work as Vercel uses a range of dynamic IP addresses. (https://vercel.com/guides/can-i-get-a-fixed-ip-address)
//
// this means we would need to setup a proxy server in order for the API to work properly, which
// is out of scope for this project anyways.