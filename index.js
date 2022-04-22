const applePayContainer = document.getElementById('apple-pay-container');
const applePayButton = document.createElement('apple-pay-button');
const separatorLabel = document.createElement('div');
applePayContainer.appendChild(separatorLabel).setAttribute('class', 'separator-label');

const parsedUserInfo = JSON.parse(atob("eyJzdWNjZXNzX3VybCI6ICJodHRwczovL2dvb2dsZS5jb20iLCAiZmFpbHVyZV91cmwiOiAiaHR0cHM6Ly95b3V0dWJlLmNvbSIsICJkZWNsaW5lZF91cmwiOiAiaHR0cHM6Ly9nb29nbGUuY29tIiwgIm1pZCI6ICIwMDA2MDkxMiIsICJ0aWQiOiAiOTkwNjA5MTIiLCAiYW1vdW50IjogIjAuMDUiLCAiY3VycmVuY3kiOiAiQ0hGIiwgInN0b3JlX25hbWUiOiAiTmV3IHBsYWNlIGZvciBzdG9yZSBuYW1lIiwgInNhbGVfZW5kcG9pbnRfdXJsIjogImh0dHBzOi8venVpYmRudm9wMS5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS92MS9wYXltZW50cGFnZS9hY2Q3ODdmZi1mMDMzLTQ2NmEtOGUwMS1lMjAzNDA0NDQyNjMvc2FsZSIsICJzdGF0dXNfZW5kcG9pbnRfdXJsIjogImh0dHBzOi8venVpYmRudm9wMS5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS92MS9wYXltZW50cGFnZS9hY2Q3ODdmZi1mMDMzLTQ2NmEtOGUwMS1lMjAzNDA0NDQyNjMvc3RhdHVzIiwgImRlbGV0ZV90b2tlbnNfdXJsIjogImh0dHBzOi8venVpYmRudm9wMS5leGVjdXRlLWFwaS5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS92MS9wYXltZW50cGFnZS9hY2Q3ODdmZi1mMDMzLTQ2NmEtOGUwMS1lMjAzNDA0NDQyNjMvdG9rZW5zIiwgImRlbGV0ZV90b2tlbl91cmwiOiAiaHR0cHM6Ly96dWliZG52b3AxLmV4ZWN1dGUtYXBpLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL3YxL3BheW1lbnRwYWdlL2FjZDc4N2ZmLWYwMzMtNDY2YS04ZTAxLWUyMDM0MDQ0NDI2My90b2tlbnMvJHtUT0tFTl9JRH0iLCAidXBkYXRlX3Rva2VuX3VybCI6ICJodHRwczovL3p1aWJkbnZvcDEuZXhlY3V0ZS1hcGkuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vdjEvcGF5bWVudHBhZ2UvYWNkNzg3ZmYtZjAzMy00NjZhLThlMDEtZTIwMzQwNDQ0MjYzL3Rva2Vucy8ke1RPS0VOX0lEfSIsICJ0b2tlbnMiOiAiW3tcInRva2VuXCI6IFwiNjMwZmZhZWMtZjZiZC00YjZlLTkzZDktZWJlZTNmOTk5NzE0XCIsIFwidG9rZW5fdHlwZVwiOiBcIk9uZUNsaWNrUGF5bWVudFwiLCBcIm1lcmNoYW50X3Nob3BwZXJfcmVmZXJlbmNlXCI6IFwic29tZWVtYWlsQGdtYWlsLmNvbVwiLCBcImNhcmRfaW5mb3JtYXRpb25cIjoge1wiY2FyZGhvbGRlcl9uYW1lXCI6IFwiU2VydGFyIFZpcm9uXCIsIFwiYnJhbmRcIjogXCJNYXN0ZXJDYXJkXCIsIFwiZmlyc3RfZGlnaXRzXCI6IFwiNTUyMjAwXCIsIFwibGFzdF9kaWdpdHNcIjogXCIwNzUwXCIsIFwiZXhwaXJ5X3llYXJcIjogXCIzNFwiLCBcImV4cGlyeV9tb250aFwiOiBcIjEyXCJ9LCBcImlzX2RlZmF1bHRcIjogZmFsc2V9LCB7XCJ0b2tlblwiOiBcIjgxMzlhZjIxLTUxOTQtNDlhMC1iMGIyLTVmZDMwMDUxNDMzMVwiLCBcInRva2VuX3R5cGVcIjogXCJPbmVDbGlja1BheW1lbnRcIiwgXCJtZXJjaGFudF9zaG9wcGVyX3JlZmVyZW5jZVwiOiBcInNvbWVlbWFpbEBnbWFpbC5jb21cIiwgXCJjYXJkX2luZm9ybWF0aW9uXCI6IHtcImNhcmRob2xkZXJfbmFtZVwiOiBcIlRhcnluIE1lcnZpc1wiLCBcImJyYW5kXCI6IFwiTWFzdGVyQ2FyZFwiLCBcImZpcnN0X2RpZ2l0c1wiOiBcIjUzMjY1N1wiLCBcImxhc3RfZGlnaXRzXCI6IFwiNTc4M1wiLCBcImV4cGlyeV95ZWFyXCI6IFwiMjVcIiwgXCJleHBpcnlfbW9udGhcIjogXCIxMVwifSwgXCJpc19kZWZhdWx0XCI6IHRydWV9XSIsICJtZXJjaGFudF9zaG9wcGVyX3JlZmVyZW5jZSI6ICJzb21lZW1haWxAZ21haWwuY29tIiwgInRva2VuX3JlZ2lzdHJhdGlvbl9wcm9jZXNzIjogIk9wdGlvbmFsIiwgInRva2VuX3R5cGUiOiAiT25lQ2xpY2tQYXltZW50IiwgIm1pZF9jb3VudHJ5X2NvZGUiOiAiQ0giLCAibWVyY2hhbnRfZGlzcGxheV9uYW1lIjogIkFQYXkgbWVyY2hhbnQifQ=="));
console.log(parsedUserInfo);

/**
 * Displays Applepay button if the browser and device supports Apple Pay and can make payments.
 */
if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
    separatorLabel.innerHTML = "OR";
    applePayContainer.appendChild(applePayButton).setAttribute('type', 'plain');
    applePayButton.addEventListener("click", onApplePayButtonClicked);
}

/**
 * To set up Apple Pay payment
 * Triggers on ApplePayt button click.
 * Creates ApplePay session and then fetches merchant session from Truevo API, allows user to select cards and authorize payment.
 */
function onApplePayButtonClicked() {
    // Define ApplePayPaymentRequest
    const request = {
        "countryCode": parsedUserInfo.mid_country_code, 
        "currencyCode": parsedUserInfo.currency,
        "merchantCapabilities": [
            "supports3DS",
            "supportsDebit",
            "supportsCredit"
        ],
        "supportedNetworks": [
            "visa",
            "masterCard"
        ],
        "total": {
            "label": parsedUserInfo.merchant_display_name,
            "amount": parsedUserInfo.amount,
            "type": "final"
        }
    };

    // Creating applepay session
    const session = new ApplePaySession(3, request);

    /**
     * Triggers automatically by Applepay
     * To Verifies merchant and fetches merchant session from Truevo API
     * @param event 
     */
    session.onvalidatemerchant = async function (event) {
        const url = `${parsedUserInfo.sale_endpoint_url.replace('/sale', '/applePay/getSession')}`;
        const currentDomain = document.location.host;
        
        const definedBody = {
            "domain": currentDomain
        }
        const headers = {
            "Content-Type": "application/json",
        };
        fetch(url, {
            method: "POST",
            body: definedBody ? JSON.stringify(definedBody) : null,
            headers: headers,
        }).then(res => res.json())
            .then(merchantSession => {
                // passing merchant session to complete merchant validation
                session.completeMerchantValidation(JSON.parse(merchantSession.appleSession));
            })
            .catch(err => {

            });
    };

    /**
     * Triggers automatically by Applepay on payment card selection.
     * @param event 
     */
    session.onpaymentmethodselected = event => {
        session.completePaymentMethodSelection(request.total);
    };
    
    /**
     * Triigers when user authorizes applepay payment.
     * Fetches sale detail from Truevo API and completes payment.
     * @param {*} event conatins token information 
     */
    session.onpaymentauthorized = event => {
        // passing apple pay token to sale url
        if (event.payment && event.payment.token) {
            fetchSell(event.payment.token).then((data) => {
                if (data) {
                    const result = {
                        "status": ApplePaySession.STATUS_SUCCESS
                    };

                    //on successfull Apple Pay payment
                    session.completePayment(result);
                    pollStatus(data);
                }
            });
        }
    };

    /**
     * Triggers when user cancel payment.
     */
    session.oncancel = event => {
    };

    /**
     * starts Apple Pay Session
     */
    session.begin();
}
