const applePayContainer = document.getElementById('apple-pay-container');
const applePayButton = document.createElement('apple-pay-button');
applePayContainer.appendChild(applePayButton);
applePayButton.addEventListener("click", onApplePayButtonClicked);

if (!window.ApplePaySessions) {
    // alert('Apple Pay is not available');
}

function onApplePayButtonClicked() {
    // Define ApplePayPaymentRequest

    //apple pay request with required fields
    const applePayTransactionRequest = {
        "countryCode": 'US',
        "currencyCode": 'USD',
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
            "label": 'Mimi',
            "amount": 20.00,
            "type": "final"
        }
    };

    // Generating new applepay session
    const applePaySession = new ApplePaySession(3, applePayTransactionRequest);

    //starts the session
    applePaySession.begin();

    // verifies merchant identity
    applePaySession.onvalidatemerchant = async function (event) {
        const url = 'example.com/validate-merchant';
        // call your server to get nerchant session
        const headers = {
            'Content-Type': 'application/json',
        }
        const body = {
            'validationUrl': event.validationURL,
            'displayName': 'Mimi',
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: headers,
        }).then(res => res.json())
            .then(merchantSession => {
                applePaySession.completeMerchantValidation(merchantSession);
            })
            .catch(err => {
                alert(`Error in validating merchant: ${err}`);
            });
    };

    // triggers on card selection
    applePaySession.onpaymentmethodselected = event => {
        applePaySession.completePaymentMethodSelection(applePayTransactionRequest.total);
    };

    // authorize payments
    applePaySession.onpaymentauthorized = event => {
        const result = {
            "status": ApplePaySession.STATUS_SUCCESS
        };
        //on successfull Apple Pay payment
        applePaySession.completePayment(result);
    }


    applePaySession.oncancel = event => {
        const result = {
            "status": ApplePaySession.STATUS_FAILURE
        };
        //on cancel Apple Pay payment
        applePaySession.completePayment(result);
        alert('Payment cancelled');
    };


};