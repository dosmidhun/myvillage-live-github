jQuery(document).ready(function($){

   console.log('syncing..2');

        var fname = $("#mvg_customer_first_name").val();
        var lname = $("#mvg_customer_last_name").val();
        var email = $("#mvg_customer_email").val();
        var pass = $("#mvg_customer_email").val();
		if(!($("#mvg_customer_first_name").val().length)){
			fname=email;
		}
        var data = {
            "fname": fname,
            "lname": lname,
            "email": email,
            "password": pass,
            "iqyou_welcome_email": false
        };
        // console.log(data);
         $.post("https://app.iqyouhealth.com/api/sign-up?api_key=c6701296-5027-4076-b80c-d64a77c2ddc7", JSON.stringify(data), function (res) {
            console.log("Response From IQYou");
            console.log(res);
            if (res.success) {
               console.log('Iqyou Account sucessfully Created.');
               window.location.href='https://myvillagegreen.com/pages/membership-dashboard';
            } else if (res.message === 'An account already exists with this email address. Please re-enter your email address and password. If you already have an account please login using the above link!') {
                 console.log(res.message);
				window.location.href='https://myvillagegreen.com/pages/membership-dashboard';
            } else {
                console.log(res.message);
				window.location.href='https://myvillagegreen.com/pages/signup-landing';
               
            }
        });
   

});
