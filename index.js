const applePayContainer = document.getElementById('apple-pay-container');
const applePayButton = document.createElement('apple-pay-button');
const separatorLabel = document.createElement('div');
applePayContainer.appendChild(separatorLabel).setAttribute('class', 'separator-label');

const userInfo = document.getElementById('custId');
const parsedUserInfo = userInfo?.value
  ? JSON.parse(atob(userInfo.value))
  : null;


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