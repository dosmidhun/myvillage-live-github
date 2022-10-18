jQuery.noConflict();
jQuery(function ($) {
    $("#schedule_popup_now").removeClass('loading');
  $(window).load(function ()  {


    setTimeout(function () {
console.log('Running');
    $("#call_back_btn button").click(function () {

     console.log('Find Outside------',$(".bta-product-widget"));
        

            var targetNode = $(".bta-product-widget")[0];
            $('#schedule_inner .modal-body').empty();
            $('#schedule_inner .modal-body').append($(".bta-product-widget"));
             console.log('Find------',$(".bta-product-widget"));
            

        


    });
}, 1500);

      
});
  
    $(window).load(function ()  {
          if($('#create_customer').find('.note.form-error').length){
            console.log("Test Length");
           $('#membership_popup').modal('show');
            

          }

  });
  
    // $("#schedule_btn_in").click(function () {

    //     $("#call_back_btn button").trigger('click');


    //     $("#call_back_btn button").hide();
    //     $('#schedule_call_btn').modal('show');
    //     $('#schedule_inner').modal('hide');
    //     MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    //     var observer = new MutationObserver(function (mutations) {
    //         mutations.forEach(function (mutation) {
    //             if (mutation.attributeName === 'style') {


    //                 if ($('#call_back_btn .bta-product-widget').css('display') == 'none') {



    //                     $('#schedule_call_btn').modal('hide');
    //                 }
    //             }
    //         });
    //     });

    //     // Notify me of style changes
    //     var observerConfig = {
    //         attributes: true,
    //         attributeFilter: ["style"]
    //     };


    //     setTimeout(function () {

    //         var targetNode = $("#call_back_btn .bta-widget-modal-back")[0];

    //         observer.observe(targetNode, observerConfig);

    //     }, 1000);


    // });


    $(document).on('keyup keydown paste focusout keypress', '#customFields_mvg-membership input[name=n_60701]', function (e) {
        $(this).attr('maxlength', 10);
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }


    });

    $("#popup_sec .buy_btn").on("click", function () {
      console.log("clicked");
       $('#membership_popup').modal('show');
    

        $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_register_fields .bold-form-group").addClass("step1");
        $("#mvg-membership_membership_container").find("#form_mvg-membership #customFields_mvg-membership .bold-form-group").slice(0, 2).addClass("step1");
        // $("#mvg-membership_membership_container").find("#form_mvg-membership #customFields_mvg-membership .bold-form-group").slice(2).addClass("step2");
        $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").hide();
        //       $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_free").remove();

    });

    $("a.login_btn").click(function () {
        $(".create-an-account").hide();
        $(".login-page").show();
    });

    $("a.create_acc_btn").click(function () {
        $(".create-an-account").show();
        $(".login-page").hide();
    });


    $("#membership_popup .next_step_btn").on("click", function () {

        var er = 0;
        $("#mvg-membership_membership_container").find("#form_mvg-membership .step1").each(function () {

            var v = $(this).find("input").val();
            if (v == "") {
                er = 1;
                $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").click();
                return false;
            }

        });

        if (er == 0) {
            $("#mvg-membership_membership_container").find("#form_mvg-membership .step1").hide();
            $("#mvg-membership_membership_container").find("#form_mvg-membership .step2").show();
            $("#membership_popup .step1").hide();
            $("#membership_popup .step2").show();
        }
    });

    $("#membership_popup .pay_btn").on("click", function () {

        $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").click();

    });
    $(document).on("keyup keydown paste focusout", "input[name='n_66533']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_66533-error,#n_66533-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 1000) {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_66533-error" class="my-error-class" for="n_66533" style="display: block;">Weight not greater than 1000 lbs.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",true);
            $(this).closest('form').append('<label id="n_66533-error-1" class="my-error-class" style="display:inherit;">Weight not greater than 1000 lbs.</label>');
        }
    });

    $(document).on("keyup keydown paste focusout", "input[name='n_66532']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_66532-error,#n_66532-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 108) {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_66532-error" class="my-error-class" for="n_66532" style="display: block;">Height not greater than 108 inch.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", true);
            $(this).closest('form').append('<label id="n_66532-error-1" class="my-error-class" style="display:inherit;">Height not greater than 108 inch.</label>')
        }
    });

    $(document).on("keyup keydown paste focusout", "input[name='n_66531']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_66531-error,#n_66531-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 108) {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_66531-error" class="my-error-class" for="n_66531" style="display: block;">Age not greater than 120.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", true);
            $(this).closest('form').append('<label id="n_66531-error-1" class="my-error-class" style="display:inherit;">Age not greater than 120.</label>');
        }
    });

});

function turnup(r) {
    console.log(r);
    $('#lap_report .lap_table').find("#more-" + r).hide();
    $('#lap_report .lap_table').find("#shortsummary-" + r).show();
}

var loadFile = function (event) {
    var output = document.getElementById('profile_image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};

function login() {
    var data = $("#customer_login").serialize();
    var promise = $.ajax({
        url: '/account/login',
        method: 'post',
        data: data,
        dataType: 'html',
        async: true
    });

    return promise;
}