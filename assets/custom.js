jQuery.noConflict();
jQuery(function ($) {
    $("#schedule_popup_now").removeClass('loading');

    window.savedlast = false;


    $("#schedule_btn_in").click(function () {

        $("#call_back_btn button").trigger('click');


        $("#call_back_btn button").hide();
        $('#schedule_call_btn').modal('show');
        $('#schedule_inner').modal('hide');
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'style') {


                    if ($('#call_back_btn .bta-product-widget').css('display') == 'none') {



                        $('#schedule_call_btn').modal('hide');
                    }
                }
            });
        });

        // Notify me of style changes
        var observerConfig = {
            attributes: true,
            attributeFilter: ["style"]
        };


        setTimeout(function () {

            var targetNode = $("#call_back_btn .bta-widget-modal-back")[0];

            observer.observe(targetNode, observerConfig);

        }, 500);


    });



    $(document).on('keyup keydown paste focusout keypress', '#customFields_mvg-membership input[name=n_60701]', function (e) {
        $(this).attr('maxlength', 10);
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }


    });

    $("#popup_sec .member_btn").on("click", function () {
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


    $(".health_top .health_box").click(function () {

        $(".health_top .health_box").removeClass('active');
        var step = $(this).attr("data-step");
        $(this).addClass('active');
        $(".order_top h3 span:not(.order_arrow)").text($(this).find('h4').text());
        $(".questn_list>div").hide();
        $(".questn_list ." + step).show();
      	if (parseInt(step.substring(4)) == 2) {
          
          if( $('#qstn_family_modal').hasClass('in')){
            
          }else{
             $('#qstn_family_modal').modal('show');
          }
        
        
      }
      if (parseInt(step.substring(4)) == 6) {
          
          if( $('#qstn_smart_modal').hasClass('in')){
            
          }else{
             $('#qstn_smart_modal').modal('show');
          }
        
        
      }

    });

    //     $("button.close").click(function () {

    //         $('.modal').modal('hide');

    //     });

    var healthscore;
//     window.localStorage.setItem('cus_id', "not-set");
  
  function setRow(){
    
   var storage_local_string=window.localStorage.getItem('cus_row');
   var storage_local_json = JSON.parse(storage_local_string);
    if(storage_local_json.rows=="not-set"){
    	 storage_local_json.rows="set";
  		 localStorage.setItem('cus_row', JSON.stringify(storage_local_json));
    }
  
  }
  function checkRow(){
    
   var storage_local_string=window.localStorage.getItem('cus_row');
   var storage_local_json = JSON.parse(storage_local_string);
    if(storage_local_json.rows=="set"){
    	return true;
    }
    else{
      return false;
    }
  
  }

    
    $(".health_qstns_body .my_health").on("change", "form input[type='radio']", function () {

        var v = $(this).val();
        var r = $(this).attr("rel");
        if (r != undefined && v == 1) {
            $(".health_qstns_body .my_health").find("div[rel='" + r + "']").show();
        } else if (r != undefined && v == 0) {
            $(".health_qstns_body .my_health").find("div[rel='" + r + "']").hide();
        }


    });


    //      if(localStorage.getItem('rows')==="not-set"){


    //   }
    //     else{
    //       makeitred();
    //     }


    var form;
    var step;
    var id_global;
    var click_button = null;
    var proceed = false;
    $(document).on("click", "#proceed-anyway", function (e) {
        proceed = true;
        console.log(form);
        if (form === undefined) {
            form = $('.my_health  #intake-wizard-intake-form');
        }
        if (click_button == "next") {

            form.find('#edit-save').trigger('click');
        } else if (click_button == "previous") {
            form.find('#edit-previous').trigger('click');
        } else {
            form.find('#edit-submit').trigger('click');
        }


    });


    $(document).on('click', '#submitstate .form-submit,.form-submit', function (event) {
        event.preventDefault();



        var closestForm = $(this);


        setRow();
        if (checkRow()) {
            makeitred();
        }


        // $(document).on("click","#proceed-anyway",function(e){

        form = closestForm.closest('form');
		id_global=closestForm.attr("id");
        var value_name=closestForm.attr("value");
        var id = id_global;
        var box;
        step = $(".health_top .health_box.active").attr("data-step");
        var completedrow = false;
        if (id == 'edit-save') {
            click_button = "next";


        } else if (id == 'edit-previous') {
            click_button = "previous";
        } else {
            click_button = "save";

        }



        //              if($form.find('.questioncontainer .questionrow').length==$form.find('.questioncontainer .questionrow.modified').length){

        var diff = form.find('.questioncontainer .questionrow').length - form.find('.questioncontainer .questionrow.modified').length;
        console.log("Total", form.find('.questioncontainer .questionrow').length);
        console.log("Total", form.find('.questioncontainer .questionrow.modified').length);



        if (diff == form.find('.questioncontainer .questionrow').length) {
          
          console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
//             if (parseInt(step.substring(4)) == 3) {
//                 if (id == 'edit-previous') {
//                     $('#qstn_family_modal').modal('show');
//                 }

//                 //                

//             }
            if (id == 'edit-save') {
//               if(value_name==='Save and close questionnaire'){
//                 console.log('IF IF');
//                  box = "box" + parseInt(step.substring(4));
//               }
//               else{
//                 console.log('IF ELSE');
//                 box = "box" + parseInt(parseInt(step.substring(4)) + 1);
//               }
              box = "box" + parseInt(parseInt(step.substring(4)) + 1);
              if (parseInt(step.substring(4)) == 6) {
                  window.savedlast = true;
                 console.log('In if made true');
               }

               
              

            } else if (id == 'edit-previous') {
                box = "box" + parseInt(parseInt(step.substring(4)) - 1);
            } else {
                box = "box" + parseInt(step.substring(4));

            }
            step = "step" + parseInt(step.substring(4));

            $.ajax({
                url: 'https://app.iqyouhealth.com' + form.prop('action').replace(/^.*\/\/[^\/]+/, ''),
                type: 'POST',
                data: form.serialize(),
                success: function (response) {
                    $(".questn_list form").find(".msg").remove();
                    $(".health_top #" + box).click();
                    $(".questn_list ." + step + " form").append("<p class='msg'>" + response.message + "</p>");






                },
                complete: function (response) {
                    $('#qstn_confirm_modal').modal('hide');

                    if (window.savedlast === true) {

                        window.savedlast = false;
                        window.location.reload();

                    }
                }
            });

            completedrow = true;
        } else if (proceed) {
            console.log(parseInt(step.substring(4), 'Hiii'));
//             if (parseInt(step.substring(4)) == 1) {
//                 $('#qstn_family_modal').modal('show');
//                 //                

//             }
//             if (parseInt(step.substring(4)) == 3) {
//                 if (id == 'edit-previous') {
//                     $('#qstn_family_modal').modal('show');
//                 }

//                 //                

//             }
          
          

            if (id == 'edit-save') {

                box = "box" + parseInt(parseInt(step.substring(4)) + 1);
               if (parseInt(step.substring(4)) == 6) {
                  window.savedlast = true;
                 console.log('In if made true');
               }

            } else if (id == 'edit-previous') {
                box = "box" + parseInt(parseInt(step.substring(4)) - 1);
            } else {
                box = "box" + parseInt(step.substring(4));

            }
            step = "step" + parseInt(step.substring(4));

            $.ajax({
                url: 'https://app.iqyouhealth.com' + form.prop('action').replace(/^.*\/\/[^\/]+/, ''),
                type: 'POST',
                data: form.serialize(),
                success: function (response) {
                    $(".questn_list form").find(".msg").remove();
                    $(".health_top #" + box).click();
                    $(".questn_list ." + step + " form").append("<p class='msg'>" + response.message + "</p>");






                },
                complete: function (response) {
                    $('#qstn_confirm_modal').modal('hide');
					 console.log('Before complete if');
                    if (window.savedlast === true) {
						console.log('Inside complete if');
                        window.savedlast = false;
                        window.location.reload();

                    }
                }
            });
            $('#qstn_confirm_modal').modal('hide');
            proceed = false;

        } else {

            if (parseInt(step.substring(4)) == 5) {
                console.log('hi');
                if (id == 'edit-save') {

                    box = "box" + parseInt(parseInt(step.substring(4)) + 1);

                } else if (id == 'edit-previous') {
                    box = "box" + parseInt(parseInt(step.substring(4)) - 1);
                } else {
                    box = "box" + parseInt(step.substring(4));

                }
                step = "step" + parseInt(step.substring(4));

                $.ajax({
                    url: 'https://app.iqyouhealth.com' + form.prop('action').replace(/^.*\/\/[^\/]+/, ''),
                    type: 'POST',
                    data: form.serialize(),
                    success: function (response) {
                        $(".questn_list form").find(".msg").remove();
                        $(".health_top #" + box).click();
                        $(".questn_list ." + step + " form").append("<p class='msg'>" + response.message + "</p>");






                    },
                    complete: function (response) {
                        $('#qstn_confirm_modal').modal('hide');

                        if (window.savedlast === true) {

                            window.savedlast = false;
                            window.location.reload();

                        }
                    }
                });

            } else if (!completedrow) {
                makeitred();
                $('#qstn_confirm_modal').modal('show');
                return false;
            } else {


                if (id == 'edit-save') {

                    box = "box" + parseInt(parseInt(step.substring(4)) + 1);

                } else if (id == 'edit-previous') {
                    box = "box" + parseInt(parseInt(step.substring(4)) - 1);
                } else {
                    box = "box" + parseInt(step.substring(4));

                }
                step = "step" + parseInt(step.substring(4));

                $.ajax({
                    url: 'https://app.iqyouhealth.com' + form.prop('action').replace(/^.*\/\/[^\/]+/, ''),
                    type: 'POST',
                    data: form.serialize(),
                    success: function (response) {
                        $(".questn_list form").find(".msg").remove();
                        $(".health_top #" + box).click();
                        $(".questn_list ." + step + " form").append("<p class='msg'>" + response.message + "</p>");






                    },
                    complete: function (response) {
                        $('#qstn_confirm_modal').modal('hide');

                        if (window.savedlast === true) {

                            window.savedlast = false;
                            window.location.reload();

                        }
                    }
                });

            }



        }


























        // });














    });
    $(document).on("click", "#goback-finish", function (e) {
        setRow();
       

        makeitred();console.log(id_global,"sdddsdddddddddsssssssss",step.substring(4));
      if (parseInt(step.substring(4)) == 6) {
        
         if (id_global == 'edit-save') {
             box = "box" + 1;
        $(".health_top #" + box).click();


        }
        
        
       
         
        
        
      }
        // var notetodisplay='<div id="note-to-display"><p><strong>NOTE:</strong> <em>Unanswered questions are shown below in <strong style="color:red;">red</strong></em></p></div>';


        // if(closestForm.closest('form').find('#note-to-display').length===0){
        //     closestForm.closest('form').prepend(notetodisplay);
        // }
        $('#qstn_confirm_modal').modal('hide');
    });
    $(document).on("click", "#ok", function (e) {

        makeitred();
        // var notetodisplay='<div id="note-to-display"><p><strong>NOTE:</strong> <em>Unanswered questions are shown below in <strong style="color:red;">red</strong></em></p></div>';


        // if(closestForm.closest('form').find('#note-to-display').length===0){
        //     closestForm.closest('form').prepend(notetodisplay);
        // }
      
        $('#qstn_family_modal').modal('hide');
		$('#qstn_smart_modal').modal('hide');
    });

    function makeitred() {
        $('.questn_list form').find('.form-type-radios').each(function () {

            var line_is_normal = true;
            var each_line_food_diet_radio = $(this);
            $(each_line_food_diet_radio).find('input').each(function () {

                var each_input_food_diet_radio = $(this);

                if (each_input_food_diet_radio.is(':checked')) {
                    line_is_normal = false;
                }
                if (line_is_normal) {
                    each_line_food_diet_radio.prev().css("color", "red");
                    each_line_food_diet_radio.parent().addClass('modified');
                } else {
                    each_line_food_diet_radio.prev().css("color", "black");
                    each_line_food_diet_radio.parent().removeClass('modified');
                }
                each_input_food_diet_radio.click(function () {

                    $(this).parents('.form-type-radios').prev().css("color", "black");
                    $(this).parent('.form-type-radios').parent().removeClass('modified');
                });


            });



        });

        $('.questn_list form').each(function () {
            var modify_available = false;
            $(this).find('.form-type-radios').each(function () {

                var line_is_normal = true;
                var each_line_food_diet_radio = $(this);
                modify_available = false;
                $(each_line_food_diet_radio).find('input').each(function () {

                    var each_input_food_diet_radio = $(this);


                    if (each_line_food_diet_radio.parent().hasClass('modified')) {
                        modify_available = true;
                    }




                });


            });
            if (modify_available) {
                var notetodisplay = '<div id="note-to-display"><p><strong>NOTE:</strong> <em>Unanswered questions are shown below in <strong style="color:red;">red</strong></em></p></div>';


                if ($(this).find('#note-to-display').length === 0) {
                    $(this).prepend(notetodisplay);
                }
                modify_available = false;
            }

        });


    }

    $(document).on("click", "#qstn_confirm_modal closeit", function (e) {
        $('#qstn_confirm_modal').modal('hide');
    });

    $('#lap_report .lap_report_outer .update_health').text("Order Labs & DNA");
    $('#lap_report .lap_report_outer .update_health').attr("href", "/collections/labs-dna");
    $('#lap_report .lap_report_outer .update_health').removeAttr("data-toggle");
    $('#lap_report .lap_report_outer .update_health').removeAttr("data-target");

    


    $('.top_reommend_sec').on('click', '.reclink.colorbox-load', function (event) {
        event.preventDefault();
        $('#why_cont').html($(this).data('content'));
        $("#top_why_content").modal({
            'show': true
        });
    });

    


    // $(".top_reommend_sec").on("click","a.reclink",function(e){
    //         e.preventDefault();
    //         var href = $(this).attr("href");

    //         $("#why_cont").load('https://app.iqyouhealth.com'+href+' #content > *',{dateType:'jsonp'},function(){
    //             $("#top_why_content").modal({'show':true});
    //         });

    // });

    $(".top_reommend_sec").on("click", "ul#reccats li", function () {

        var c = $(this).attr("rel");
        $('.top_reommend_sec #recfilter #selectedcat').text($(this).text());
        $(".top_reommend_sec .recseeall,.top_reommend_sec .recrow").hide();

//         if (c != 'all' && $(".top_reommend_sec .recrow." + c).length > 5) {
//             $(".top_reommend_sec .recseeall").show();
//         }
        if (c == 'all') {
//             if ($(".top_reommend_sec .recrow").length > 5) {
//                 $(".top_reommend_sec .recseeall").show();
//             }
          
          
          
          
            $(".top_reommend_sec .recrow").show();
          $(".top_reommend_sec .recrow.botanicalmedicine").css("order","1");
           $(".top_reommend_sec .recrow.dietaryplans").css("order","2");
           $(".top_reommend_sec .recrow.environmentaltoxinreduction").css("order","3");
           $(".top_reommend_sec .recrow.foodchanges").css("order","4");
          $(".top_reommend_sec .recrow.lifestyleinterventions").css("order","5");
           $(".top_reommend_sec .recrow.nutrientchangesinthediet").css("order","6");
          $(".top_reommend_sec .recrow.nutritionalsupplementation").css("order","7");
        }
        $(".top_reommend_sec .recrow." + c ).show();

    });

//     $(".top_reommend_sec").on("click", ".recseeall", function () {
//         $(this).hide();
//         var s = $(".top_reommend_sec #selectedcat").text().trim();
//         s = s.split(' ').join('').toLowerCase();
//         if (s == 'all') {
//             $(".top_reommend_sec .recrow").show();
//         } else {
//             $(".top_reommend_sec .recrow." + s).show();
//         }
//     });


    $(".modal").on('show.bs.modal', function () {
        //$('.modal').not(this).modal('hide');
    });

    


    //     $("#create_customer").submit(function(){

    //       window.location = "/pages/signup";

    //     });

    /*$(document).on("click","#health_qstns_modal a.question",function(e){
        e.preventDefault();
          $("#qstn_desc_modal .modal-body").html('<iframe width="100%" height="500" src="https://app.iqyouhealth.com'+$(this).attr("href")+'" frameborder="0" allowfullscreen=""></iframe>');
          $("#qstn_desc_modal").modal({show:true});

    });*/

    /*$(document).on("click","#membership_popup input[value=Login]",function(e){
            e.preventDefault();
            login().done(function (html) {  
                console.log(html);
            });

    });*/


    $(document).on("keyup keydown paste focusout", "input[name='n_60705']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_60705-error,#n_60705-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 108) {
            /*$(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60705-error" class="my-error-class" for="n_60705" style="display: block;">Height not greater than 108 inch.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",true);
            $(this).closest('form').append('<label id="n_60705-error-1" class="my-error-class" style="display:inherit;">Height not greater than 108 inch.</label>')*/
        }
    });

    $(document).on("keyup keydown paste focusout", "input[name='n_60704']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_60704-error,#n_60704-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 108) {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60704-error" class="my-error-class" for="n_60704" style="display: block;">Height not greater than 108 inch.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", true);
            $(this).closest('form').append('<label id="n_60704-error-1" class="my-error-class" style="display:inherit;">Height not greater than 108 inch.</label>')
        }
    });

    $(document).on("keyup keydown paste focusout", "input[name='n_60703']", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        $(document).find("#n_60703-error,#n_60703-error-1").remove();
        $(this).removeClass('my-error-class');
        $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", false);
        if (parseFloat($(this).val()) > 108) {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60703-error" class="my-error-class" for="n_60703" style="display: block;">Age not greater than 120.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled", true);
            $(this).closest('form').append('<label id="n_60703-error-1" class="my-error-class" style="display:inherit;">Age not greater than 120.</label>');
        }
    });

    var url = $(location).attr('href'),
        parts = url.split("/"),
        last_part = parts[parts.length - 1];
    if (last_part == 'membership-dashboard') {
        Accentuate($("#metafields_form"), function (data) {
            $("#metafields_form").find("p.success").remove();
            if (data.status == 'OK') {
                $("#metafields_form").append('<p class="success">' + data.message + '</p>')
            }
        });
    }


    $(document).on('keyup', '#edit-drugsearch', function () {

        if ($(this).val().length >= 4) {

            $.ajax({

                url: 'https://app.iqyouhealth.com/api/medications?user_key=' + window.customer_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7&drugsearch=' + $(this).val(),
                type: 'GET',
                crossDomain: true,
                success: function (res) {
                    var ht = '';
                    ht += '<div id="autocomplete"><ul class="autoListing">'
                    $.each(res.matches, function (i, v) {
                        var pos = i.indexOf("(") + 1;
                        var remain = i.slice(pos, -1);
                        var rem_string = remain.split('-', 1)[0]
                        ht += '<li data-value=' + rem_string + '>' + v + '</li>';
                    });
                    ht += '</ul></div>';
                    $('.form-item-drugsearch').find('label').html(ht);

                    $(document).on('click', '#autocomplete .autoListing li', function () {
                        $('#autocomplete').css('display', 'none');
                        $('#edit-drugsearch').val($(this).text());
                        var li = $(this).attr('data-value');
                        //$('#questioncontainer-1 .questionrow').css('display','none');
                        $('#questioncontainer-1 .questionrow').each(function () {
                            if ($(this).attr('id') == 'table-' + li) {
                                $(this).css('display', 'block');
                            }
                        });
                    });
                },
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });
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