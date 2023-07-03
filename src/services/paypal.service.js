const axios = require('axios');
const qs = require('qs');

const clientId = process.env.PAYPAL_CLIENT_ID;
//console.log('clientId: ', clientId);
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
//console.log('clientSecret: ', clientSecret);

const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
console.log('authString: ', authString);


const generateAccessToken = async () => {

    let data = qs.stringify({
        'grant_type': 'client_credentials',
        'ignoreCache': 'true',
        'return_authn_schemes': 'true',
        'return_client_metadata': 'true',
        'return_unconsented_scopes': 'true'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + authString
        },
        data: data
    };

    const accessResponse = await axios.request(config)
    if (accessResponse.status >= 200 && accessResponse.status < 300) {
        return accessResponse.data;
    } else {
        return null;
    }
}

const createSubscription = async (body) => {
    const access_token = await generateAccessToken();

    if (access_token) {
        const token = access_token.access_token;
        console.log('token: ', token);
        let data = JSON.stringify({
            "plan_id": body.plan_id,
            "start_time": tomorrowsDate(),
            "shipping_amount": {
                "currency_code": "USD",
                "value": "0.99"
            },
            "subscriber": {
                "name": {
                    "given_name": body.firstName,
                    "surname": body.lastName,
                },
                "email_address": body.email,
                "shipping_address": {
                    "name": {
                        "full_name": body.firstName + " " + body.lastName
                    },
                    "address": {
                        "address_line_1": "2211 N First Street",
                        "address_line_2": "Building 17",
                        "admin_area_2": "0",
                        "admin_area_1": "Nairobi",
                        "postal_code": "95131",
                        "country_code": "KE"
                    }
                }
            },
            "application_context": {
                "brand_name": "Example Inc",
                "locale": "en-US",
                "shipping_preference": "SET_PROVIDED_ADDRESS",
                "user_action": "SUBSCRIBE_NOW",
                "payment_method": {
                    "payer_selected": "PAYPAL",
                    "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                },
                "return_url": "https://salesy.aiceafrica.com/admin/subscriptions",
                "cancel_url": "https://example.com/cancel"
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-m.sandbox.paypal.com/v1/billing/subscriptions',
            headers: {
                'Content-Type': 'application/json',
                'PayPal-Request-Id': 'e8fb9279-7c06-4ecc-b238-968fb53b9cc5',
                'Prefer': 'return=representation',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        const subscriptionResponse = await axios.request(config)
        if (subscriptionResponse.status >= 200 && subscriptionResponse.status < 300) {
            return subscriptionResponse.data;
        } else {
            return null;
        }
    }
}

const getPlans = async () => {
    const access_token = await generateAccessToken();

    if (access_token) {
        const token = access_token.access_token;
        console.log('token: ', token);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-m.sandbox.paypal.com/v1/billing/plans?page_size=10&page=1&total_required=true',
            headers: {
                'Prefer': 'return=representation',
                'Authorization': 'Bearer ' + token
            }
        };

        const plansResponse = await axios.request(config)
        if (plansResponse.status >= 200 && plansResponse.status < 300) {
            return plansResponse.data;
        } else {
            return null;
        }
    } else {
        return null;
    }
}


function tomorrowsDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString();
}

module.exports = {
    generateAccessToken,
    createSubscription,
    getPlans
}