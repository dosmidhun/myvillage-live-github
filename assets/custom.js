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

    if (window.cus_id) {
      
       

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/health-questions?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                $(".my_health").removeClass('loading-blue');

                

                // $("#schedule_popup_now").removeClass('loading');





                $(".my_health_step").text(res.completions_rate + '%');
                $(".health_qstns_body .my_health").html(res.intakeform);
                healthscore = parseInt(res.healthscore);
                $(".health_qstns_body .my_health input[type=radio]").each(function () {

                    var r = $(this).attr("rel");
                    var n = $(this).attr("name");
                    if (r != undefined) {

                        if ($(".health_qstns_body .my_health input[name='" + n + "']:checked").val() == 0 || $(".health_qstns_body .my_health input[name='" + n + "']:checked").length == 0) {
                            console.log(r);
                            $(".health_qstns_body .my_health").find("div[rel='" + r + "']").hide();
                        }


                    }

                });

                $('.collapsepage').each(function () {
                    id = $(this).attr('rel');
                    no = false;
                    $('#questioncontainer-' + id).find('.form-radio').each(function () {
                        rid = $(this).attr('id');
                        if ($(this).val() == 0) {
                            v = $(this).is(':checked');
                            if (v == true) {
                                no = true;
                            }

                        }


                    });
                    if (no == true) {
                        $('input:radio[id=toggle-' + id + ']')[1].checked = true;
                        $('#questioncontainer-' + id).css('display', 'none');
                    }

                    $(this).on('click', function () {
                        $(this).prop('checked', true);
                        colapse = $(this).val();
                        id = $(this).attr('rel');
                        if (colapse == 0) {
                            $('#questioncontainer-' + id).find('input[type=radio][value="0"]').prop('checked', true);
                        }

                    });
                });

                $('.expandpage').each(function () {
                    id = $(this).attr('rel');
                    yes = false;
                    $('#questioncontainer-' + id).find('.form-radio').each(function () {
                        rid = $(this).attr('id');
                        if ($(this).val() == 1) {
                            v = $(this).is(':checked');
                            if (v == true) {
                                yes = true;
                            }
                        }

                    });
                    if (yes == true) {
                        $('input:radio[id=toggle-' + id + ']')[0].checked = true;
                        $('#questioncontainer-' + id).css('display', 'block');
                        //$('input:radio[id=toggle-'+id+']')[0].trigger("click");
                    }

                    //else {
                    //$('input:radio[id=toggle-'+id+']')[1].checked = true;
                    //$('input:radio[id=toggle-'+id+']')[1].trigger("click");
                    //}  

                    $('#questioncontainer-' + id).find('a').each(function () {
                        var href = $(this).attr('href');
                        $(this).contents().unwrap().wrap('<span></span>');
                        //$(this).remove();
                        //$(this).text();
                        //$(this).attr('target', '_blank');
                        // $(this).attr('href', 'javascript:void(0);');
                    });


                });

            },
            complete: function (res) {
                if (checkRow()) {
                    makeitred();

                }
                // $(".my_health .form-type-radios").each(function(){

                //     var line_is_normal=true;
                //     var each_line_my_health_radio=  $(this);
                //     $(each_line_my_health_radio).find('input').each(function(){

                //         var each_input_my_health_radio=  $(this);

                //         if(each_input_my_health_radio.is(':checked')){
                //             line_is_normal=false;
                //         }
                //         if(line_is_normal){
                //             each_line_my_health_radio.prev().css( "color", "red" );
                //         }else{
                //             each_line_my_health_radio.prev().css( "color", "black" );
                //         }
                //         each_input_my_health_radio.click(function() {

                //             $(this).parents('.form-type-radios').prev().css( "color", "black" );

                //          });


                //     });



                // });
            },


            error: function (xhr, status, err) {
                console.log(err);
            }
        });


        $.get('https://app.iqyouhealth.com/api/completion?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {
            dataType: 'jsonp'
        }, function (res) {

            if (res.completion >= 100 && !res.newuser) {
                api_user_data();
                api_recommend_sec();
                metabolic_risk();
            } else {}

        });

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
//             if (parseInt(step.substring(4)) == 3) {
//                 if (id == 'edit-previous') {
//                     $('#qstn_family_modal').modal('show');
//                 }

//                 //                

//             }
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

    if (window.cus_id) {

        // $(".dashboard_templt").addClass('loading');
        $('#health_qstns_modal .close').click(function () {
            window.location.reload(true);
        });

        $('#lap_report .lap_table').on('click', '.view-dna-reports', function (event) {
            event.preventDefault();
            if (!$(this).hasClass('viewed')) {
                $('#lap_report .modal-body').addClass("loading");
                $.get('https://app.iqyouhealth.com/api/dna-reports?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {
                    dataType: 'jsonp'
                }, function (res) {
                    $('#lap_report').addClass('view_report');
                    $('#lap_report .lap_table').append(res.dna_reports);
                    $('#lap_report .lap_table').find('a.moreup').hide();
                    $('#lap_report .modal-body').removeClass("loading");
                    $('#lap_report .view-dna-reports').text('Hide').addClass('viewed');
                });
            } else {
                $('#lap_report #dnatable').slideToggle("fast", "linear", function () {

                    if ($('#lap_report #dnatable').is(":visible")) {
                        $('#lap_report .view-dna-reports').text('Hide');
                    } else {
                        $('#lap_report .view-dna-reports').text('View');
                    }

                });


            }
        });

        $('#lap_report .lap_table').on('click', '.download-dna-reports', function (event) {
            event.preventDefault();
            $.get('https://app.iqyouhealth.com/api/download-dna-reports?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {
                dataType: 'jsonp',
                xhrFields: {
                    responseType: 'blob'
                }
            }, function (res) {
                var blob = new Blob([res]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'DNA-Reports.pdf';
                link.click();
            });
        });

        $('#lap_report .lap_table').on('click', 'a.moredown,.moredown', function (event) {
            event.preventDefault();
            var r = $(this).attr("rel");
            $('#lap_report .lap_table').find("#more-" + r).show();
            $('#lap_report .lap_table').find("#shortsummary-" + r).hide();
        });

        $('#lap_report .lap_table').on('click', 'a.moreup,.moreup', function (event) {
            event.preventDefault();
            var r = $(this).attr("rel");
            $('#lap_report .lap_table').find("#more-" + r).hide();
            $('#lap_report .lap_table').find("#shortsummary-" + r).show();
        });

        function api_user_data() {
            $(".member_clickhere_sec").addClass('loading');
            $.ajax({

                url: 'https://app.iqyouhealth.com/api/user-data?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                type: 'GET',
                crossDomain: true,
                success: function (res) {
                    var healthscore = res.healthscore;
                    var metabolicscore = res.metabolic.score;
                    var toxinsscore = res.toxins.score;

                    var health_html = '<span>Health Score</span>' + healthscore;
                    var metabolic_html = '<span>Metabolic Score</span>' + metabolicscore;
                    var toxin_html = '<span>Toxin Score</span>' + toxinsscore;

                    $(".member_clickhere_sec a[data-target='#health_score']").html(health_html);
                    $(".member_clickhere_sec a[data-target='#health_score']").addClass('score_value_dis');
                    $("#health_score .your_score_detail h2 span").text(healthscore);
                    $("#health_score .your_score_detail .complete_qtns").remove();
                    $("#health_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                    $(".member_clickhere_sec a[data-target='#metabolic_score']").html(metabolic_html);
                    $(".member_clickhere_sec a[data-target='#metabolic_score']").addClass('score_value_dis');
                    $("#metabolic_score .your_score_detail h2 span").text(metabolicscore);
                    $("#metabolic_score .your_score_detail .complete_qtns").remove();
                    $("#metabolic_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                    $(".member_clickhere_sec a[data-target='#toxin_score']").html(toxin_html);
                    $(".member_clickhere_sec a[data-target='#toxin_score']").addClass('score_value_dis');
                    $("#toxin_score .your_score_detail h2 span").text(toxinsscore);
                    $("#toxin_score .your_score_detail .complete_qtns").remove();
                    $("#toxin_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                    if (res.dna_reports.has_report) {
                        $('#lap_report .lap_table').html('<div style="background: #eee; padding: 10px;"><span style="color: #222">DNA:</span> <strong>' +
                            res.dna_reports.name + '</strong>&nbsp;&nbsp; <a href="#" class="view-dna-reports">View</a>' +
                            '&nbsp;&nbsp; <a href="#" class="download-dna-reports">Download</a></div>'
                        );
                    } else {
                        $('#lap_report .lap_table').html('<p>You do not have any DNA or lab reports at this time</p><p> While you only need to do a DNA analysis once, we recommend doing a Wellness Panel annually.</p>');
                    }

                    $(".member_clickhere_sec").removeClass('loading');

                },
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });

        }

    } else {
        //$("#no_iqyou_account").modal({'show':true});
    }


    $('.top_reommend_sec').on('click', '.reclink.colorbox-load', function (event) {
        event.preventDefault();
        $('#why_cont').html($(this).data('content'));
        $("#top_why_content").modal({
            'show': true
        });
    });

    if (window.cus_id) {
        $(".lab_results").addClass('loading');

        function api_recommend_sec() {

            $(".top_reommend_sec").addClass('loading');

            $.ajax({

                url: 'https://app.iqyouhealth.com/api/recommendations?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                type: 'GET',
                crossDomain: true,
                success: function (res) {


                    var wrapper = $(".top_reommend_sec");
                    // console.log(res.recommendations);
                    wrapper.html(res.recommendations);
                    $.each(wrapper.find('.reclink.colorbox-load'), function (index, el) {

						$(el).text('?');
                        var label = $(el).closest('.recrow').find('.label');
                        label.find('a').remove();
                        label.find('div').remove();
                        $(el).prop('href', '#').data('content', label.text().trim());
                        var nextStep = $(el).closest('.recrow').find('.steps');
                        nextStep.find('.nextmenu').remove();

                        var l = "";
//                      var t = $(el).closest('.recrow').find('.rec').text().trim();
                        var t=$(el).closest('.recrow').find('.rec').text().replace('?', '').trim();
                        t = t.toLowerCase();
                        var btn_text = "Shop Now";
                        var action = label.text().trim();
                        console.log(t);
                        console.log(t.indexOf(('Take Garlic').toLowerCase()));
                        if (t===('Vitamin B1').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=thiamin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin B1 (thiamine)').toLowerCase()) {
                            action="Vitamin B1 is an essential water-soluble vitamin required for carbohydrate metabolism, glucose regulation, antioxidant functions and regulating heart and nerve function . ";
                            l = "https://myvillagegreen.com/search?type=product&q=thiamin*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin B2').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b2*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin B2 (riboflavin)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b2*";
                            btn_text = "Shop Now";
                        } else if (t===('Niacinamide').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=Niacinamide";
                            btn_text = "Shop Now";
                        } else if (t===('Supplement with niacinamide (Vitamin B3)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=Niacinamide";
                            btn_text = "Shop Now";
                        } else if (t===('Pantothenic Acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=Pantothenic*+Acid*";
                            btn_text = "Shop Now";
                        } else if (t===('Take pantothenic acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=Pantothenic*+Acid*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin B6').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b6*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin B6').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b6*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin B12').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b12*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin B12').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b12*";
                            btn_text = "Shop Now";
                        } else if (t===('Folic Acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=folic*+acid*";
                            btn_text = "Shop Now";
                        } else if (t===('Take folic acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=folic*+acid*";
                            btn_text = "Shop Now";
                        } else if (t===('Biotin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=biotin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Biotin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=biotin*";
                            btn_text = "Shop Now";
                        } else if (t===('Choline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=choline*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Choline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=choline*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin C').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+c*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin C').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+c*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin A').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+a*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin A').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+a*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin D').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+d*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin D').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+d*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin E').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+e*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin E').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=vitamin*+e*";
                            btn_text = "Shop Now";
                        } else if (t===('Mixed Carotenoids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=carotenoids*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Mixed Carotenoids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=carotenoids*";
                            btn_text = "Shop Now";
                        } else if (t===('Calcium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=calcium*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Calcium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=calcium*";
                            btn_text = "Shop Now";
                        } else if (t===('Copper').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=copper*";
                            btn_text = "Shop Now";
                        } else if (t===('Increase your Copper intake').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=copper*";
                            btn_text = "Shop Now";
                        } else if (t===('Iron').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=iron*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Iron').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=iron*";
                            btn_text = "Shop Now";
                        } else if (t===('Iodine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=iodine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Iodine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=iodine*";
                            btn_text = "Shop Now";
                        } else if (t===('Manganese').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=manganese*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Manganese').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=manganese*";
                            btn_text = "Shop Now";
                        } else if (t===('Magnesium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=magnesium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Magnesium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=magnesium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Potassium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=potassium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Potassium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=potassium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Phosphorus').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphorus*";
                            btn_text = "Shop Now";
                        } else if (t===('Increase your Phosphorus intake').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphorus*";
                            btn_text = "Shop Now";
                        } else if (t===('Selenium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=selenium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Selenium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=selenium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Zinc').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=zinc*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Zinc').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=zinc*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('S-Adenosylmethionine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=SAMe*";
                            btn_text = "Shop Now";
                        } else if (t===('Take S-Adenosylmethionine (SAM-e)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=SAMe*";
                            btn_text = "Shop Now";
                        } else if (t===('Betaine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=betaine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Betaine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=betaine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Coenzyme Q10 (Ubiquinone)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=coq10*";
                            btn_text = "Shop Now";
                        } else if (t===('Take CoQ10').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=coq10*";
                            btn_text = "Shop Now";
                        } else if (t===('Lipoic Acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lipoic*+acid*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lipoic acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lipoic*+acid*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Omega-3 fatty acids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=omega*+3*+fatty*+acids*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Omega-3 Fatty Acids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=omega*+3*+fatty*+acids*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Quercetin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=quercetin*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Quercetin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=quercetin*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Glutamine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=glutamine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Glutamine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=glutamine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Glycine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=glycine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Glycine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=glycine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('5-HTP').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=5-htp*";
                            btn_text = "Shop Now";
                        } else if (t===('Take 5-HTP').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=5-htp*";
                            btn_text = "Shop Now";
                        } else if (t===('Lactobacillus species').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=lactobacillus*";
                            btn_text = "Shop Now";
                        } else if (t===('Take the probiotic Lactobacillus').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=lactobacillus*";
                            btn_text = "Shop Now";
                        } else if (t===('Flavonoids, increase intake').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=flavonoids*";
                            btn_text = "Shop Now";
                        } else if (t===('Increase your Flavonoid intake').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=flavonoids*";
                            btn_text = "Shop Now";
                        } else if (t===('Melatonin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=melatonin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Melatonin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=melatonin*";
                            btn_text = "Shop Now";
                        } else if (t===('Vitamin K').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=vitamin*+k*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vitamin K').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=vitamin*+k*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Dehydroepiandrosterone (DHEA)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=dhea*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take DHEA').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=dhea*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('L-Carnitine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=dhea*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take L-carnitine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=dhea*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Branched-Chain Amino Acids (BCAA)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bcaa*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Branched-Chain Amino Acids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bcaa*";
                            btn_text = "Shop Now";
                        } else if (t===('Arginine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=arginine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Arginine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=arginine*";
                            btn_text = "Shop Now";
                        } else if (t===('Gamma-Linolenic Acid').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=gamma*+linolenic*+acid*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Gamma-Linolenic Acid (GLA)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=gamma*+linolenic*+acid*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Lycopene').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lycopene*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lycopene').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lycopene*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('N-acetylcysteine (NAC)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=n-acetyl*+cysteine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take N-acetylcysteine (NAC)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=n-acetyl*+cysteine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Soy Isoflavones').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Soy*+isoflavones*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Soy Isoflavones').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Soy*+isoflavones*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Ipriflavone').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Ipriflavone*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Ipriflavone').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Ipriflavone*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Vanadyl sulfate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Vanadium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Vanadium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Vanadium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Chromium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Chromium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Chromium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Chromium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Taurine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=taurine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Taurine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=taurine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Proanthocyanidins').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Proanthocyanidins*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Proanthocyanidins').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Proanthocyanidins*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Carnosine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=carnosine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Carnosine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=carnosine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Resveratrol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Resveratrol*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Resveratrol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Resveratrol*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Zinc Gluconate Lozenges').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Zinc*+Lozenges*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Zinc Gluconate lozenges').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Zinc*+Lozenges*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Betaine HCl').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=betaine*+hcl*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Betaine HCl').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=betaine*+hcl*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Strontium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Strontium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Strontium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Strontium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Medium chain triglycerides').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=mct*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Medium Chain Triglycerides (MCTs)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=mct*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Bile acids').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=bile*+acids*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Bile salts').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=bile*+acids*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('N-acetylglucosamine (NAG)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=NAG*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take N-acetylglucosamine (NAG)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=NAG*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Phosphatidylcholine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Phosphatidylcholine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Phosphatidylcholine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Phosphatidylcholine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Chondroitin Sulfate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Chondroitin*+Sulfate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Chondroitin Sulfate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Chondroitin*+Sulfate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Green-lipped mussel').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Green-lipped*+mussel*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Green-lipped Mussel').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Green-lipped*+mussel*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Glucosamine sulfate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Glucosamine*+sulfate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Glucosamine Sulfate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Glucosamine*+sulfate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Saccharomyces boulardii').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Saccharomyces*+boulardii*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Saccharomyces boulardii').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Saccharomyces*+boulardii*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Niacin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=niacin*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Niacin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=niacin*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Lipase').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Lipase*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lipase').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Lipase*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Lutein').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Lutein*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lutein').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Lutein*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Calcium D-glucarate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Calcium*+D-glucarate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Calcium D-glucarate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Calcium*+D-glucarate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Diindolylmethane (DIM)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=%28DIM%29*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Diindolylmethane (DIM)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=%28DIM%29*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('IP-6 (Phytate)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=IP-6*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take IP-6 (Phytate)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=IP-6*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Psyllium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Psyllium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Psyllium').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Psyllium*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Nicotinamidadenindinucleotide (NADH)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=NADH*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take NADH').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=NADH*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Acetylcarnitine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Acetylcarnitine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Acetylcarnitine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Acetylcarnitine*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Methylsulfonylmethane (MSM)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=msm*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Methylsulfonylmethane (MSM)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=msm*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Thymus extract').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=thymus*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Thymus Extract').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=thymus*";
                            btn_text = "Shop Now";
                        } else if (t===('Molybdenum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Molybdenum*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Molybdenum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Molybdenum*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Lactase, Oral').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lactase*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lactase Orally').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=lactase*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Inositol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Inositol*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Inositol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=Inositol*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('L-ornithine-L-aspartate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=L-ornithine-L-aspartate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take L-ornithine-L-aspartate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=L-ornithine-L-aspartate*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Multivitamin/mineral Supplement').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=multivitamin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take a Multivitamin/mineral').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=multivitamin*";
                            btn_text = "Shop Now";
                        } else if (t===('Alkali minerals').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Potassium Citrate').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
                            btn_text = "Shop Now";
                        } else if (t===('Citicoline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=citicoline*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Citicoline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=citicoline*";
                            btn_text = "Shop Now";
                        } else if (t===('Phosphatidylserine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Phosphatidylserine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
                            btn_text = "Shop Now";
                        } else if (t===('L-citrulline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=l-citruline*";
                            btn_text = "Shop Now";
                        } else if (t===('Take L-citrulline').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=l-citruline*";
                            btn_text = "Shop Now";
                        } else if (t===('Dehydroepiandrosterone (DHEA) cream').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dhea*";
                            btn_text = "Shop Now";
                        } else if (t===('Take DHEA (Dehydroepiandrosterone)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dhea*";
                            btn_text = "Shop Now";
                        } else if (t===('5-methyltetrahydrofolate (5-MTHF)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=mthf*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('N-acetylcarnosine, topical').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=n-acetyl*+carnosine*";
                            btn_text = "Shop Now";
                        } else if (t===('Apply N-acetylcarnosine topically').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=n-acetyl*+carnosine*";
                            btn_text = "Shop Now";
                        } else if (t===('Ear drops, herbal combination').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ear*+drops*";
                            btn_text = "Shop Now";
                        } else if (t===('Apply herbal ear drops').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ear*+drops*";
                            btn_text = "Shop Now";
                        } else if (t===('Garlic').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=garlic*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Garlic').toLowerCase()) {
                            action="Garlic is one of the most widely used and most well researched herbs in the world. Studies show that garlic is beneficial for heart health, promoting healthy blood lipids, and for supporting immune health."
                            l = "https://myvillagegreen.com/search?type=product&q=garlic*";
                            btn_text = "Shop Now";
                        } else if (t===('Ginkgo').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ginkgo*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Gingko').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ginkgo*";
                            btn_text = "Shop Now";
                        } else if (t===('Indian frankincense').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=boswellia*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Indian Frankincense (Boswellia)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=boswellia*";
                            btn_text = "Shop Now";
                        } else if (t===('Feverfew').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=feverfew*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Feverfew').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=feverfew*";
                            btn_text = "Shop Now";
                        } else if (t===('Peppermint oil, enteric coated').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=enteric*+coated*+peppermint*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Enteric Coated Peppermint Oil').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=enteric*+coated*+peppermint*";
                            btn_text = "Shop Now";
                        } else if (t===('Saint John\'s wort').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=st*+john%27s*+wort*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Saint John\'s Wort').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=st*+john%27s*+wort*";
                            btn_text = "Shop Now";
                        } else if (t===('Kava').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=kava*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Kava (Piper methysticum)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=kava*";
                            btn_text = "Shop Now";
                        } else if (t===('Ginger').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ginger*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Ginger').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ginger*";
                            btn_text = "Shop Now";
                        } else if (t===('Deglycyrrhizinated Licorice (DGL)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dgl*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Deglycyrrhizinated Licorice (DGL)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dgl*";
                            btn_text = "Shop Now";
                        } else if (t===('Indole-3-Carbinol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=indole*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Indole-3-Carbinol').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=indole*";
                            btn_text = "Shop Now";
                        } else if (t===('Chamomile').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=chamomile*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Chamomile').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=chamomile*";
                            btn_text = "Shop Now";
                        } else if (t===('Pectin, Modified Citrus (MCP)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=modified*+citrus*+pectin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Modified Citrus Pectin (MCP)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=modified*+citrus*+pectin*";
                            btn_text = "Shop Now";
                        } else if (t===('Green tea').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=green*+tea*+extract*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Green Tea Extract').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=green*+tea*+extract*";
                            btn_text = "Shop Now";
                        } else if (t===('Curcumin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=curcumin*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Curcumin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=curcumin*";
                            btn_text = "Shop Now";
                        } else if (t===('Bromelain').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bromelain*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Bromelain').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bromelain*";
                            btn_text = "Shop Now";
                        } else if (t===('Eleuthero').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Eleutherococcus (Siberian Ginseng)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
                            btn_text = "Shop Now";
                        } else if (t===('PSK').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=turkey*+tail*";
                            btn_text = "Shop Now";
                        } else if (t===('Take PSK').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=turkey*+tail*";
                            btn_text = "Shop Now";
                        } else if (t===('Silymarin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Silymarin').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
                            btn_text = "Shop Now";
                        } else if (t===('Ashwagandha').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ashwagandha*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Ashwagandha').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=ashwagandha*";
                            btn_text = "Shop Now";
                        } else if (t===('Korean Ginseng').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=korean*+ginseng*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Korean Ginseng').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=korean*+ginseng*";
                            btn_text = "Shop Now";
                        } else if (t===('Bitter Melon').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bitter*+melon*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Bitter Melon').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bitter*+melon*";
                            btn_text = "Shop Now";
                        } else if (t===('Gymnema').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=gymnema*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Gynmema').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=gymnema*";
                            btn_text = "Shop Now";
                        } else if (t===('Butterbur').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=butterbur*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Butterbur').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=butterbur*";
                            btn_text = "Shop Now";
                        } else if (t===('Rhodiola').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=rhodiola*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Fenugreek').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=fenugreek*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Fenugreek').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=fenugreek*";
                            btn_text = "Shop Now";
                        } else if (t===('Cordyceps').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cordyceps*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Cordyceps').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cordyceps*";
                            btn_text = "Shop Now";
                        } else if (t===('Chasteberry').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=chaste*+tree*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Chasteberry').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=chaste*+tree*";
                            btn_text = "Shop Now";
                        } else if (t===('Cinnamon').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cinnamon*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Cinnamon').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cinnamon*";
                            btn_text = "Shop Now";
                        } else if (t===('Bilberry').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bilberry*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Bilberry').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=bilberry*";
                            btn_text = "Shop Now";
                        } else if (t===('Black cohosh').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=black*+cohosh*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Black Cohosh').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=black*+cohosh*";
                            btn_text = "Shop Now";
                        } else if (t===('Cats Claw').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cats*+claw*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Cat\'s Claw').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cats*+claw*";
                            btn_text = "Shop Now";
                        } else if (t===('Saw palmetto').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=saw*+palmetto*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Saw Palmetto').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=saw*+palmetto*";
                            btn_text = "Shop Now";
                        } else if (t===('Forskolin').toLowerCase()) {
                            l = "https://myvillagegreen.com/products/coleus-forskohlii-extract?_pos=5&_sid=d7f04984e&_ss=r";
                            btn_text = "Shop Now";
                        } else if (t===('Take Forskolin').toLowerCase()) {
                            l = "https://myvillagegreen.com/products/coleus-forskohlii-extract?_pos=5&_sid=d7f04984e&_ss=r";
                            btn_text = "Shop Now";
                        } else if (t===('Goldenseal').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=goldenseal*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Goldenseal').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=goldenseal*";
                            btn_text = "Shop Now";
                        } else if (t===('Mastic gum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=mastic*+gum*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Mastic Gum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=mastic*+gum*";
                            btn_text = "Shop Now";
                        } else if (t===('White Willow Bark').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=willow*+bark*";
                            btn_text = "Shop Now";
                        } else if (t===('Take White Willow Bark').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=willow*+bark*";
                            btn_text = "Shop Now";
                        } else if (t===('Echinacea').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=echinacea*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Echinacea').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=echinacea*";
                            btn_text = "Shop Now";
                        } else if (t===('Hawthorn').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=hawthorn*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Hawthorn').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=hawthorn*";
                            btn_text = "Shop Now";
                        } else if (t===('Berberine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=berberine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Berberine').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=berberine*";
                            btn_text = "Shop Now";
                        } else if (t===('Huperzine-A').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=huperzine*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Huperzine-A').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=huperzine*";
                            btn_text = "Shop Now";
                        } else if (t===('Yohimbe').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=yohimbe*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Yohimbe').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=yohimbe*";
                            btn_text = "Shop Now";
                        } else if (t===('Dong quai').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dong*+quai*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Dong quai').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=dong*+quai*";
                            btn_text = "Shop Now";
                        } else if (t===('Devil\'s Claw').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=devil%27s*+claw*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Devil\'s Claw').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=devil%27s*+claw*";
                            btn_text = "Shop Now";
                        } else if (t===('Valerian').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=valerian*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Valerian').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=valerian*";
                            btn_text = "Shop Now";
                        } else if (t===('Licorice').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=licorice*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Licorice').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=licorice*";
                            btn_text = "Shop Now";
                        } else if (t===('Oregano').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=oregano*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Oregano').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=oregano*";
                            btn_text = "Shop Now";
                        } else if (t===('Cascara').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cascara*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Cascara').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=cascara*";
                            btn_text = "Shop Now";
                        } else if (t===('Senna').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=senna*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Senna').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=senna*";
                            btn_text = "Shop Now";
                        } else if (t===('Andrographis').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=andrographis*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Andrographis').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=andrographis*";
                            btn_text = "Shop Now";
                        } else if (t===('Phytosterols').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phytosterols*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Phytosterols').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=phytosterols*";
                            btn_text = "Shop Now";
                        } else if (t===('Red clover').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=red*+clover*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Red Clover').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=red*+clover*";
                            btn_text = "Shop Now";
                        } else if (t===('Pygeum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=pygeum*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Pygeum').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=pygeum*";
                            btn_text = "Shop Now";
                        } else if (t===('Stinging nettle').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=stinging*+nettle*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Stinging Nettle').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=stinging*+nettle*";
                            btn_text = "Shop Now";
                        } else if (t===('American Ginseng').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=american*+ginseng*";
                            btn_text = "Shop Now";
                        } else if (t===('Take American Ginseng').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=american*+ginseng*";
                            btn_text = "Shop Now";
                        } else if (t===('Passionflower').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=passionflower*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Passionflower').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=passionflower*";
                            btn_text = "Shop Now";
                        } else if (t===('California poppy (Eschscholzia californica)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=california*+poppy*";
                            btn_text = "Shop Now";
                        } else if (t===('Take California Poppy').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=california*+poppy*";
                            btn_text = "Shop Now";
                        } else if (t===('Lemon balm (Melissa officinalis)').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=lemon*+balm*";
                            btn_text = "Shop Now";
                        } else if (t===('Take Lemon Balm').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?type=product&q=lemon*+balm*";
                            btn_text = "Shop Now";
                        } else if (t===('Elderberry').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=elderberry*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Take Elderberry ').toLowerCase()) {
                            l = "https://myvillagegreen.com/search?q=elderberry*&type=product";
                            btn_text = "Shop Now";
                        } else if (t===('Decrease your intake of foods containing Histamine').toLowerCase()) {
                            action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your intake of Histamines').toLowerCase()) {
                            action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
                            btn_text = "Learn More";
                        } else if (t===('Remove Gluten-containing foods from your diet').toLowerCase()) {
                            action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid gluten').toLowerCase()) {
                            action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid consuming foods containing Tyramine').toLowerCase()) {
                            action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid dietary Tyramines').toLowerCase()) {
                            action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce the amount of Iron you consume').toLowerCase()) {
                            action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on dietary Iron').toLowerCase()) {
                            action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
                            btn_text = "Learn More";
                        } else if (t===('Increase the amount of protein in your diet').toLowerCase()) {
                            action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your protein intake').toLowerCase()) {
                            action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your dietary fiber').toLowerCase()) {
                            action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your fiber intake').toLowerCase()) {
                            action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your total dietary fat').toLowerCase()) {
                            action = "Reduce your intake of dietary fats (see the HOW guide) - typically around 20% is considered a reasonable goal.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on dietary fat').toLowerCase()) {
                            action = "Reduce your intake of dietary fats - typically around 20% is considered a reasonable goal.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your intake of sugar').toLowerCase()) {
                            action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on Dietary Sugar').toLowerCase()) {
                            action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce the amount of saturated fats in your diet').toLowerCase()) {
                            action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on saturated fats').toLowerCase()) {
                            action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
                            btn_text = "Learn More";
                        } else if (t===('Follow a Calorie-Restricted Diet').toLowerCase()) {
                            action = "A calorie restricted diet can have benefits in addition to weight loss - see the HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your Calorie intake').toLowerCase()) {
                            action = "A calorie restricted diet can have benefits in addition to weight loss.";
                            btn_text = "Learn More";
                        } else if (t===('Salicylates, Dietary, Decrease Intake').toLowerCase()) {
                            action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce dietary Salicylate intake').toLowerCase()) {
                            action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce the amount of protein in your diet').toLowerCase()) {
                            action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your Protein intake').toLowerCase()) {
                            action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your fiber intake').toLowerCase()) {
                            action = "Though generally helpful, you may need to cut your dietary fiber intake to 10 grams per day or less.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your Fiber intake').toLowerCase()) {
                            action = "Though generally helpful, you may need to cut your dietary fiber intake to 10 grams per day or less.";
                            btn_text = "Learn More";
                        } else if (t===('Minimize your intake of Cholesterol-containing foods').toLowerCase()) {
                            action = "Reduce your intake of cholesterol, i.e. animal foods. Elimination is more effective than small reductions.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on dietary Cholesterol').toLowerCase()) {
                            action = "Reduce your intake of cholesterol, i.e. animal foods. Elimination is more effective than small reductions.";
                            btn_text = "Learn More";
                        } else if (t===('Limit foods containing trans fatty acids').toLowerCase()) {
                            action = "Aim for a goal of zero dietary trans fats, found in processed foods with \"hydrogenated\" in the ingredient list.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Trans Fatty Acids').toLowerCase()) {
                            action = "Aim for a goal of zero dietary trans fats, found in processed foods with \"hydrogenated\" in the ingredient list.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Phenylethylamine containing foods').toLowerCase()) {
                            action = "Identify sources of phenylethylamines (e.g. chocolate, aged cheese, etc.), and eliminate them from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid dietary Phenylethylamines').toLowerCase()) {
                            action = "Identify sources of phenylethylamines (e.g. chocolate, aged cheese, etc.), and eliminate them from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your sodium intake').toLowerCase()) {
                            action = "Cut back on your salt intake; aim for no more than 2300mg, and as low as 1500mg per day.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Dietary sodium (salt)').toLowerCase()) {
                            action = "Cut back on your salt intake; aim for no more than 2300mg, and as low as 1500mg per day.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your daily intake of Calories').toLowerCase()) {
                            action = "Increase your total caloric intake, emphasizing foods that are also nutrient-rich, e.g. fruits/veggies, whole grains, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your dietary Calorie intake').toLowerCase()) {
                            action = "Increase your total caloric intake, emphasizing foods that are also nutrient-rich, e.g. fruits/veggies, whole grains, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Vitamin K, reduce intake').toLowerCase()) {
                            action = "Monitor your vitamin K intake; you may be consuming too much or too inconsistent amounts given your medications.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your Vitamin K intake').toLowerCase()) {
                            action = "Monitor your vitamin K intake; you may be consuming too much or too inconsistent amounts given your medications.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your potassium intake').toLowerCase()) {
                            action = "Emphasize potassium rich foods, e.g. sweet potato, Swiss chard, etc.; this has both cardiovascular and urinary benefits.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your dietary Potassium intake').toLowerCase()) {
                            action = "Emphasize potassium rich foods, e.g. sweet potato, Swiss chard, etc.; this has both cardiovascular and urinary benefits.";
                            btn_text = "Learn More";
                        } else if (t===('Low Iodine Diet').toLowerCase()) {
                            action = "Begin eating a diet with a low amount of iodine (See HOW section) - this may improve autoimmune thyroid conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your intake of Iodine').toLowerCase()) {
                            action = "Begin eating a diet with a low amount of iodine - this may improve autoimmune thyroid conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your alcohol consumption').toLowerCase()) {
                            action = "Reduce your alcohol intake; a high intake is linked to cardiovascular and overall mortality.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Alcohol consumption').toLowerCase()) {
                            action = "Reduce your alcohol intake; a high intake is linked to cardiovascular and overall mortality.";
                            btn_text = "Learn More";
                        } else if (t===('Try doing Biofeedback or Meditation or Relaxation Exercise').toLowerCase()) {
                            action = "Find a technique, e.g. biofeedback, meditation, etc., which helps you to reduce the effects of stress - See the HOW section.";
                            btn_text = "Learn More";
                        } else if (t===('Try Biofeedback/Meditation/Relaxation').toLowerCase()) {
                            action = "Find a technique, e.g. biofeedback, meditation, etc., which helps you to reduce the effects of stress - See the HOW section.";
                            btn_text = "Learn More";
                        } else if (t===('Quit smoking').toLowerCase()) {
                            action = "Few interventions have as powerful an effect as smoking cessation - see our HOW section, and find help to quit.";
                            btn_text = "Learn More";
                        } else if (t===('Quit smoking').toLowerCase()) {
                            action = "Few interventions have as powerful an effect as smoking cessation - see our HOW section, and find help to quit.";
                            btn_text = "Learn More";
                        } else if (t===('Consider switching to an Non-Hormonal Contraceptive method').toLowerCase()) {
                            action = "Oral contraceptives, while effective, may have adverse effects. Consider switching to a non-hormonal method, e.g. IUD, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Consider a Non-hormonal Contraceptive').toLowerCase()) {
                            action = "Oral contraceptives, while effective, may have adverse effects. Consider switching to a non-hormonal method, e.g. IUD, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Exercise for 150 minutes/week at a moderate aerobic rate').toLowerCase()) {
                            action = "Exercise on average 30 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Aim for 150 minutes aerobic exercise/week').toLowerCase()) {
                            action = "Exercise on average 30 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Exercise 300 minutes/week at a moderate aerobic rate').toLowerCase()) {
                            action = "Exercise on average 60 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Aim for 300 minutes aerobic exercise/week').toLowerCase()) {
                            action = "Exercise on average 60 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Add Resistance Training to your exercise plan: moderate intensity').toLowerCase()) {
                            action = "Begin resistance training - this means adding exercise designed to increase muscle mass/strength. See HOW for details.";
                            btn_text = "Learn More";
                        } else if (t===('Add in Resistance Training').toLowerCase()) {
                            action = "Begin resistance training - this means adding exercise designed to increase muscle mass/strength.";
                            btn_text = "Learn More";
                        } else if (t===('Add Resistance Training to your exercise plan: light intensity').toLowerCase()) {
                            action = "Start adding in light strength training to increase your muscle strength and mass. See HOW for details.";
                            btn_text = "Learn More";
                        } else if (t===('Add light Resistance Training').toLowerCase()) {
                            action = "Start adding in light strength training to increase your muscle strength and mass.";
                            btn_text = "Learn More";
                        } else if (t===('Kegel exercises').toLowerCase()) {
                            action = "Identify the right muscles by stopping urination midstream. Practice contracting these for longer duration, throughout the day.";
                            btn_text = "Learn More";
                        } else if (t===('Do daily Kegel Exercises').toLowerCase()) {
                            action = "Identify the right muscles by stopping urination midstream. Practice contracting these for longer duration, throughout the day.";
                            btn_text = "Learn More";
                        } else if (t===('Improve your Sleep Habits').toLowerCase()) {
                            action = "Review our HOW section to identify harmful sleep behaviors, e.g. caffeine, screens, etc., and start developing good habits.";
                            btn_text = "Learn More";
                        } else if (t===('Improve your Sleep Habits').toLowerCase()) {
                            action = "Review our HOW section to identify harmful sleep behaviors, e.g. caffeine, screens, etc., and start developing good habits.";
                            btn_text = "Learn More";
                        } else if (t===('Include Hamstring stretches in your exercise plan').toLowerCase()) {
                            action = "Stretch your hamstrings regularly (See HOW section) - this includes holding a stretch for at least 30-45 seconds.";
                            btn_text = "Learn More";
                        } else if (t===('Add Hamstring Stretches').toLowerCase()) {
                            action = "Stretch your hamstrings regularly - this includes holding a stretch for at least 30-45 seconds.";
                            btn_text = "Learn More";
                        } else if (t===('Add lumbar support in the car').toLowerCase()) {
                            action = "Begin using a lumbar support pad, especially while driving. These are widely available and provide relief.";
                            btn_text = "Learn More";
                        } else if (t===('Use a Lumbar Support Pad').toLowerCase()) {
                            action = "Begin using a lumbar support pad, especially while driving. These are widely available and provide relief.";
                            btn_text = "Learn More";
                        } else if (t===('Use proper lifting techniques').toLowerCase()) {
                            action = "Make sure when you lift anything heavy, while exercising or not, use correct techniques to avoid injury.";
                            btn_text = "Learn More";
                        } else if (t===('Begin doing Core Body strengthening exercises').toLowerCase()) {
                            action = "Begin adding core strengthening exercises to protect against injury - See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Add Core Body Strengthening Exercise').toLowerCase()) {
                            action = "Begin adding core strengthening exercises to protect against injury - See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Resume normal physical activity levels').toLowerCase()) {
                            action = "Rather than bed rest, getting back to normal activity as soon as possible is more effective following an injury.";
                            btn_text = "Learn More";
                        } else if (t===('Get back to normal physical activity').toLowerCase()) {
                            action = "Rather than bed rest, getting back to normal activity as soon as possible is more effective following an injury.";
                            btn_text = "Learn More";
                        } else if (t===('Hepatitis B Vaccine').toLowerCase()) {
                            action = "The hepatitis B vaccine is strongly recommended for some populations, including health care workers, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Get vaccinated for Hepatitis B').toLowerCase()) {
                            action = "The hepatitis B vaccine is strongly recommended for some populations, including health care workers, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Hepatitis A Vaccine').toLowerCase()) {
                            action = "The hepatitis A vaccine is recommended for those with high risk, e.g. those in areas of high exposure.";
                            btn_text = "Learn More";
                        } else if (t===('Get vaccinated for Hepatitis A').toLowerCase()) {
                            action = "The hepatitis A vaccine is recommended for those with high risk, e.g. those in areas of high exposure.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your exposure to second hand smoke').toLowerCase()) {
                            action = "More data is emerging on the dangers of second-hand smoke - it may be more hazardous than smoking, as it bypasses any filters.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Second Hand Smoke').toLowerCase()) {
                            action = "More data is emerging on the dangers of second-hand smoke - it may be more hazardous than smoking, as it bypasses any filters.";
                            btn_text = "Learn More";
                        } else if (t===('UVB light exposure').toLowerCase()) {
                            action = "A short series (20-40 total) of UVB treatments is effective for some skin conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Get exposure to UVB Light').toLowerCase()) {
                            action = "A short series (20-40 total) of UVB treatments is effective for some skin conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Bright light therapy').toLowerCase()) {
                            action = "Start using bright light therapy - full spectrum lights appropriately timed can improve sleep & mood.";
                            btn_text = "Learn More";
                        } else if (t===('Start using Bright Light Therapy').toLowerCase()) {
                            action = "Start using bright light therapy - full spectrum lights appropriately timed can improve sleep & mood.";
                            btn_text = "Learn More";
                        } else if (t===('Cognitive Behavioral Therapy').toLowerCase()) {
                            action = "Find a therapist trained in cognitive behavioral therapy (CBT), a proven method for a number of mental health conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Find a Cognitive Behavioral Therapist').toLowerCase()) {
                            action = "Find a therapist trained in cognitive behavioral therapy (CBT), a proven method for a number of mental health conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Pacifier restriction').toLowerCase()) {
                            action = "Avoiding or restricting pacifier use may help to reduce the risk for ear infections.";
                            btn_text = "Learn More";
                        } else if (t===('Restrict Pacifier Use').toLowerCase()) {
                            action = "Avoiding or restricting pacifier use may help to reduce the risk for ear infections.";
                            btn_text = "Learn More";
                        } else if (t===('Yoga').toLowerCase()) {
                            action = "Joining a regular yoga practice, including exercise for stretching, strengthening, relaxation, etc. has potent health benefits.";
                            btn_text = "Learn More";
                        } else if (t===('Add Yoga to your life').toLowerCase()) {
                            action = "Joining a regular yoga practice, including exercise for stretching, strengthening, relaxation, etc. has potent health benefits.";
                            btn_text = "Learn More";
                        } else if (t===('Chewing tobacco cessation').toLowerCase()) {
                            action = "Take advantage of the many resources for chewing tobacco cessation; this reduces risk for oral cancer and heart disease.";
                            btn_text = "Learn More";
                        } else if (t===('Stop using Chewing Tobacco').toLowerCase()) {
                            action = "Take advantage of the many resources for chewing tobacco cessation; this reduces risk for oral cancer and heart disease.";
                            btn_text = "Learn More";
                        } else if (t===('Examine your feet regularly').toLowerCase()) {
                            action = "You may be at high risk for foot infections; monitoring your feet closely can help to spot these early and receive treatment.";
                            btn_text = "Learn More";
                        } else if (t===('Examine your feet regularly').toLowerCase()) {
                            action = "You may be at high risk for foot infections; monitoring your feet closely can help to spot these early and receive treatment.";
                            btn_text = "Learn More";
                        } else if (t===('Consider a Protein Redistribution diet').toLowerCase()) {
                            action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
                            btn_text = "Learn More";
                        } else if (t===('Consider a Protein Redistribution Diet').toLowerCase()) {
                            action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
                            btn_text = "Learn More";
                        } else if (t===('Follow a Low Glycemic Load/Index Diet').toLowerCase()) {
                            action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
                            btn_text = "Learn More";
                        } else if (t===('Follow a Low Glycemic Load/Index Diet').toLowerCase()) {
                            action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
                            btn_text = "Learn More";
                        } else if (t===('Try an Elimination and Rechallenge Diet').toLowerCase()) {
                            action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Try an Elimination/Rechallenge Diet').toLowerCase()) {
                            action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce the overall size of your meals').toLowerCase()) {
                            action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
                            btn_text = "Learn More";
                        } else if (t===('Lower the size of your meals').toLowerCase()) {
                            action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
                            btn_text = "Learn More";
                        } else if (t===('Adopt a Low Potassium Diet').toLowerCase()) {
                            action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
                            btn_text = "Learn More";
                        } else if (t===('Consume a Low Potassium Diet').toLowerCase()) {
                            action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
                            btn_text = "Learn More";
                        } else if (t===('Dietary Recommendations for Preconception').toLowerCase()) {
                            action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
                            btn_text = "Learn More";
                        } else if (t===('Follow Preconception dietary recommendations').toLowerCase()) {
                            action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
                            btn_text = "Learn More";
                        } else if (t===('Prenatal diet').toLowerCase()) {
                            action = "Reduce your intake of dietary fats (see the HOW guide) - typically around 20% is considered a reasonable goal.";
                            btn_text = "Learn More";
                        } else if (t===('Follow Prenatal dietary recommendations').toLowerCase()) {
                            action = "Reduce your intake of dietary fats - typically around 20% is considered a reasonable goal.";
                            btn_text = "Learn More";
                        } else if (t===('Morning sickness dietary recommendations').toLowerCase()) {
                            action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
                            btn_text = "Learn More";
                        } else if (t===('Follow Morning sickness dietary recommendations').toLowerCase()) {
                            action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
                            btn_text = "Learn More";
                        } else if (t===('Eat breakfast every day').toLowerCase()) {
                            action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
                            btn_text = "Learn More";
                        } else if (t===('Eat breakfast every day').toLowerCase()) {
                            action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
                            btn_text = "Learn More";
                        } else if (t===('Low carbohydrate diet').toLowerCase()) {
                            action = "A calorie restricted diet can have benefits in addition to weight loss - see the HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Adopt a Low Carbohydrate Diet').toLowerCase()) {
                            action = "A calorie restricted diet can have benefits in addition to weight loss.";
                            btn_text = "Learn More";
                        } else if (t===('Mediterranean diet').toLowerCase()) {
                            action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Adopt a Mediterranean Diet').toLowerCase()) {
                            action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Carbohydrate counting diet').toLowerCase()) {
                            action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
                            btn_text = "Learn More";
                        } else if (t===('Start a Carbohydrate Counting Diet').toLowerCase()) {
                            action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your coffee consumption').toLowerCase()) {
                            action = "While it is now generally thought to have positive effects on blood sugar, coffee, especially caffeine is not for everyone.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Coffee').toLowerCase()) {
                            action = "While it is now generally thought to have positive effects on blood sugar, coffee, especially caffeine is not for everyone.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid cured meat products').toLowerCase()) {
                            action = "Avoid nitrates and nitrites commonly used to cure meat; these compounds have been linked to allergies as well as cancer.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Cured Meats').toLowerCase()) {
                            action = "Avoid nitrates and nitrites commonly used to cure meat; these compounds have been linked to allergies as well as cancer.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more vegetables').toLowerCase()) {
                            action = "Increase your daily consumption of veggies - ideally consume at least 5 servings of a variety (rainbow) of colors.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more Vegetables').toLowerCase()) {
                            action = "Increase your daily consumption of veggies - ideally consume at least 5 servings of a variety (rainbow) of colors.";
                            btn_text = "Learn More";
                        } else if (t===('Add flaxseed to your diet').toLowerCase()) {
                            action = "Work up to 6T per day of flaxseed added to your meals, either whole or ground.";
                            btn_text = "Learn More";
                        } else if (t===('Add Flaxseed to your diet').toLowerCase()) {
                            action = "Work up to 6T per day of flaxseed added to your meals, either whole or ground.";
                            btn_text = "Learn More";
                        } else if (t===('Substitute Olive oil (monounsaturated fats) for other fats in your diet').toLowerCase()) {
                            action = "Substitute olive oil for other fats - rich in monounsaturated fats, it is a key component of the Mediterranean diet.";
                            btn_text = "Learn More";
                        } else if (t===('Use Primarily Olive Oil').toLowerCase()) {
                            action = "Substitute olive oil for other fats - rich in monounsaturated fats, it is a key component of the Mediterranean diet.";
                            btn_text = "Learn More";
                        } else if (t===('Drink more water').toLowerCase()) {
                            action = "Replace other beverages with clean water. Even mild dehydration has immediate effects.";
                            btn_text = "Learn More";
                        } else if (t===('Drink more Clean Water').toLowerCase()) {
                            action = "Replace other beverages with clean water. Even mild dehydration has immediate effects.";
                            btn_text = "Learn More";
                        } else if (t===('Eat less improperly cooked or high-fat meat').toLowerCase()) {
                            action = "Meat that has been cooked excessively (often true for high fat portions) is rich in carcinogenic HCA's. Avoid if possible.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on improperly cooked and high fat meat').toLowerCase()) {
                            action = "Meat that has been cooked excessively (often true for high fat portions) is rich in carcinogenic HCA's. Avoid if possible.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce the amount of Chocolate you consume').toLowerCase()) {
                            action = "Try cutting back on chocolate consumption; it contains compounds which trigger migraines, PMS symptoms, etc., in some people.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Chocolate').toLowerCase()) {
                            action = "Try cutting back on chocolate consumption; it contains compounds which trigger migraines, PMS symptoms, etc., in some people.";
                            btn_text = "Learn More";
                        } else if (t===('Decrease your consumption of Red Wine').toLowerCase()) {
                            action = "Although small amounts have benefit for some, red wine contains possible triggers: sulfites, histamines, tyramines, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Red Wine').toLowerCase()) {
                            action = "Although small amounts have benefit for some, red wine contains possible triggers: sulfites, histamines, tyramines, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid eating foods containing Aged Cheese').toLowerCase()) {
                            action = "Many aged cheeses are rich in tyramines, known to be allergy symptom triggers for some individuals.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Aged Cheese').toLowerCase()) {
                            action = "Many aged cheeses are rich in tyramines, known to be allergy symptom triggers for some individuals.";
                            btn_text = "Learn More";
                        } else if (t===('Drink Pomegranate juice').toLowerCase()) {
                            action = "Add at least 1.5 oz Pomegranate juice per day; clinical trials have shown cardiovascular benefit.";
                            btn_text = "Learn More";
                        } else if (t===('Drink Pomegranate Juice').toLowerCase()) {
                            action = "Add at least 1.5 oz Pomegranate juice per day; clinical trials have shown cardiovascular benefit.";
                            btn_text = "Learn More";
                        } else if (t===('Onions').toLowerCase()) {
                            action = "Rich in quercetin, eating more onions may help to reduce the inflammation which drives many chronic conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Eat More Onions').toLowerCase()) {
                            action = "Rich in quercetin, eating more onions may help to reduce the inflammation which drives many chronic conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Limit the animal products in your diet').toLowerCase()) {
                            action = "Limit or avoid your dietary intake of animals products, e.g. meats, dairy, etc., linked to many chronic conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Animal Products').toLowerCase()) {
                            action = "Limit or avoid your dietary intake of animals products, e.g. meats, dairy, etc., linked to many chronic conditions.";
                            btn_text = "Learn More";
                        } else if (t===('Increase the amount of fish in your diet or substitute fish for other animal proteins').toLowerCase()) {
                            action = "Either replace other meats with fish, or add in wild fish to your diet; rich in cardioprotective omega-3 fats.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your Fish consumption').toLowerCase()) {
                            action = "Either replace other meats with fish, or add in wild fish to your diet; rich in cardioprotective omega-3 fats.";
                            btn_text = "Learn More";
                        } else if (t===('Add more Soy Protein to your diet').toLowerCase()) {
                            action = "Increase your intake of soy protein (e.g. tofu, tempeh, protein shakes) - a complete protein with cardioprotective properties.";
                            btn_text = "Learn More";
                        } else if (t===('Add Soy Protein to your diet').toLowerCase()) {
                            action = "Increase your intake of soy protein (e.g. tofu, tempeh, protein shakes) - a complete protein with cardioprotective properties.";
                            btn_text = "Learn More";
                        } else if (t===('Add more oats to your diet').toLowerCase()) {
                            action = "Oats are rich in fiber, zinc, and magnesium. Add oatmeal to your breakfast, or see our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Increase your Oat consumption').toLowerCase()) {
                            action = "Oats are rich in fiber, zinc, and magnesium. Add oatmeal to your breakfast, or see our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more nuts').toLowerCase()) {
                            action = "Eat more nuts, including cashews, almonds, and pecans, all linked to improved cardiometabolic health.";
                            btn_text = "Learn More";
                        } else if (t===('Add more Nuts to your diet').toLowerCase()) {
                            action = "Eat more nuts, including cashews, almonds, and pecans, all linked to improved cardiometabolic health.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more cruciferous vegetables').toLowerCase()) {
                            action = "Key to good detoxification, add more cruciferous veggies to your diet, including kale, broccoli, watercress, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more Cruciferous Veggies').toLowerCase()) {
                            action = "Key to good detoxification, add more cruciferous veggies to your diet, including kale, broccoli, watercress, etc.";
                            btn_text = "Learn More";
                        } else if (t===('Black Tea').toLowerCase()) {
                            action = "Drink black tea regularly for its cardiovascular benefit - avoid with meals if you are low in iron though.";
                            btn_text = "Learn More";
                        } else if (t===('Drink more Black Tea').toLowerCase()) {
                            action = "Drink black tea regularly for its cardiovascular benefit - avoid with meals if you are low in iron though.";
                            btn_text = "Learn More";
                        } else if (t===('Eat more Fruits').toLowerCase()) {
                            action = "FDA recommends 4 servings of fruit per day, choose berries high in antioxidants. See more info at http://www.fda.gov";
                            btn_text = "Learn More";
                        } else if (t===('Eat more Fruit').toLowerCase()) {
                            action = "FDA recommends 4 servings of fruit per day, choose berries high in antioxidants. See more info at http://www.fda.gov";
                            btn_text = "Learn More";
                        } else if (t===('Decrease the amount of sucrose, and products containing sucrose, that you eat.').toLowerCase()) {
                            action = "Just like lactose, not everyone can digest the sugar sucrose. See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on Sucrose').toLowerCase()) {
                            action = "Just like lactose, not everyone can digest the sugar sucrose. See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce your dietary exposure to Tartrazine').toLowerCase()) {
                            action = "Avoid foods and other products with tartrazine, aka FD&C yellow #5. Some people have severe reactions to it.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid Tartrazine in your diet').toLowerCase()) {
                            action = "Avoid foods and other products with tartrazine, aka FD&C yellow #5. Some people have severe reactions to it.";
                            btn_text = "Learn More";
                        } else if (t===('Heterocyclic Amines, decrease dietary intake').toLowerCase()) {
                            action = "Reduce your intake of heavily cooked meats - these are known to contain heterocyclic amines, known carcinogens.";
                            btn_text = "Learn More";
                        } else if (t===('Cut back on dietary Heterocyclic Amines').toLowerCase()) {
                            action = "Reduce your intake of heavily cooked meats - these are known to contain heterocyclic amines, known carcinogens.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid foods containing sodium glutamates or MSG').toLowerCase()) {
                            action = "Avoid foods with MSG, monosodium glutamate. Some people have adverse reactions, and it is often disguised in ingredients.";
                            btn_text = "Learn More";
                        } else if (t===('Avoid MSG').toLowerCase()) {
                            action = "Avoid foods with MSG, monosodium glutamate. Some people have adverse reactions, and it is often disguised in ingredients.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce dietary exposure to Nitrate/Nitrites').toLowerCase()) {
                            action = "Avoid foods with nitrates/nitrites, often used to cure meats. See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Cut down on Nitrates/Nitrites').toLowerCase()) {
                            action = "Avoid foods with nitrates/nitrites, often used to cure meats. See our HOW section for details.";
                            btn_text = "Learn More";
                        } else if (t===('Quick acting carbohydrates').toLowerCase()) {
                            action = "For short term emergencies, make sure to have quick acting carbs ready if your blood sugar falls too low.";
                            btn_text = "Learn More";
                        } else if (t===('Have Quick acting Carbs ready').toLowerCase()) {
                            action = "For short term emergencies, make sure to have quick acting carbs ready if your blood sugar falls too low.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce food packaging').toLowerCase()) {
                            action = "Most food packaging has bisphenol A or phthalates, both known hormone disruptors. Avoid the plastics ubiquitous in packaging.";
                            btn_text = "Learn More";
                        } else if (t===('Reduce or eliminate Food Packaging').toLowerCase()) {
                            action = "Most food packaging has bisphenol A or phthalates, both known hormone disruptors. Avoid the plastics ubiquitous in packaging.";
                            btn_text = "Learn More";
                        }else if (t===('Apply Coal Tar topically').toLowerCase()) {
                            action = "Begin applying coal tar, topically or as a shampoo (1-2%), twice daily to affected areas";
                            btn_text = "Learn More";
                        }else if (t===('Apply Capsaicin cream').toLowerCase()) {
                            action = "Apply Capsaicin cream to affected areas to reduce pain and itching, 2-3 times per day.";
                            btn_text = "Learn More";
                        }  else {}

                        //nextStep.find('a').text(btn_text).prop('href', (action != '' ? 'javascript:void(0)' : l)).attr('data-content', '<p>' + action + '</p>').attr('target', '_BLANK').attr("data-toggle", (action != '' ? 'popover' : ''));
						nextStep.find('a').text(btn_text).prop('href', (action != '' ? l : l)).attr('data-content', '<p>' + action + '</p>').attr('target', '_BLANK').css("display", (l != '' ? 'inline-block' : 'none'));

                        $(this).hide();
                       $(el).prop('href', '#').data('content', '<p>' + action + '</p>');


                    });

                    $(document).find('[data-toggle="popover"]').popover({
                        placement: "auto",
                        html: true
                    });

                    $(".top_reommend_sec ul#reccats li[rel='all']").click();
//                     $(".top_reommend_sec #rectable .recrow.all:gt(4)").hide();
                    wrapper.removeClass('loading');
                    $(".top_reommend_sec .recsTitle.subTitle").hide();

//                     if ($(".top_reommend_sec #rectable .recrow.nutritionalsupplementation").length > 5) {
                        var st = "display:none;";
//                     } else {
//                         var st = "";
//                     }

                    var see_all = '<a class="recseeall" style=' + st + '>▸ See all</a>';
                    $(".top_reommend_sec #rectable").append(see_all);


                },
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });

        }

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/lab-results?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                $('.lab_results').html(res.content);
                $(".lab_results").removeClass('loading');
                if (res.content) {
                    $('#lap_report').addClass('lab_result_content');
                }

                $('.moredown').each(function () {
                    $(this).on('click', function () {
                        $(this).parent().addClass('expanded');
                    });
                });

                $('.moreup').each(function () {
                    $(this).on('click', function () {
                        $(this).parent().removeClass('expanded');
                    });
                });

                $('.allresults').on('click', function () {
                    $('.keyfindings').removeClass('active');
                    $('.allresults').addClass('active');
                    $('.singlelabrow').addClass('active');
                });

                $('.keyfindings').on('click', function () {
                    $('.allresults').removeClass('active');
                    $('.keyfindings').addClass('active');
                    $('.singlelabrow').removeClass('active');
                });

                $('#showmorelabs').on('click', function () {
                    $(this).addClass('showmorelabs_hide');
                    $('#showfewerlabs').addClass('showfewerlabs_show');
                    $('.morelabs').addClass('active');
                });

                $('#showfewerlabs').on('click', function () {
                    $('.morelabs').removeClass('active');
                    $(this).removeClass('showfewerlabs_show');
                    $(this).addClass('showmorelabs_hide');
                    $('#showmorelabs').removeClass('showmorelabs_hide');
                    $('#showmorelabs').addClass('showmorelabs_show');
                });

                $('.labinput input[type=input]').each(function () {

                    $(this).on('click', function () {
                        id = $(this).attr('rel');
                        $('#submit-' + id).toggleClass('active');
                    });

                    $(this).on('focusout', function () {
                        id = $(this).attr('rel');
                        $('#submit-' + id).removeClass('active');
                    });
                });


            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/health-questions-family-history?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
               $(".family_history").removeClass('loading-blue');
                $('.family_history_step').text(res.completions_rate + '%');
                $(".health_qstns_body .family_history").html(res.intakeform);

                $(".health_qstns_body .family_history form .questioncontainer a").each(function () {
                    var href = $(this).attr('href');
                    //$(this).attr('target', '_blank');
                    //$(this).attr('href', 'https://app.iqyouhealth.com'+href);
                    $(this).contents().unwrap().wrap('<span></span>');
                });
            },
            complete: function (res) {

                if (checkRow()) {
                    makeitred();
                }
                // $(".family_history .form-type-radios").each(function(){

                //     var line_is_normal=true;
                //     var each_line_family_history_radio=  $(this);
                //     $(each_line_family_history_radio).find('input').each(function(){

                //         var each_input_family_history_radio=  $(this);

                //         if(each_input_family_history_radio.is(':checked')){
                //             line_is_normal=false;
                //         }
                //         if(line_is_normal){
                //             each_line_family_history_radio.prev().css( "color", "red" );
                //         }else{
                //             each_line_family_history_radio.prev().css( "color", "black" );
                //         }
                //         each_input_family_history_radio.click(function() {

                //             $(this).parents('.form-type-radios').prev().css( "color", "black" );

                //          });


                //     });



                // });
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/health-questions-food-and-diet?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
               $(".food_diet").removeClass('loading-blue');
                $('.food_diet_step').text(res.completions_rate + '%');
                $(".health_qstns_body .food_diet").html(res.intakeform);
                $(".health_qstns_body .food_diet form .questioncontainer a").each(function () {
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });

                //$('.step3 #intake-wizard-intake-form').attr('action','https://app.iqyouhealth.com/system/ajax');

                /*$('.step3 #intake-wizard-intake-form').submit( function(e){
                    e.preventDefault();
                    console.log('testtttttttttttttttttttttttttt');
                    $.ajax({
                        url: 'https://app.iqyouhealth.com/system/ajax',
                        type: 'POST',
                        data: $(this).serialize(),
                        success: function(response) {
                        }
                    });
                });*/

                /*$(document).on('change','#edit-group-15',function(){
                    localStorage.setItem('selectttt','testtt');
                });*/
            },
            complete: function (res) {





                if (checkRow()) {
                    makeitred();
                }





















            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/health-questions-lifestyle?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                $(".lifestyle").removeClass('loading-blue');
                $('.lifestyle_step').text(res.completions_rate + '%');
                $(".health_qstns_body .lifestyle").html(res.intakeform);
                $(".health_qstns_body .lifestyle form .questioncontainer a").each(function () {
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });
            },
            complete: function (res) {

                if (checkRow()) {
                    makeitred();
                }
                // $(".lifestyle .form-type-radios").each(function(){

                //     var line_is_normal=true;
                //     var each_line_lifestyle_radio=  $(this);
                //     $(each_line_lifestyle_radio).find('input').each(function(){

                //         var each_input_lifestyle_radio=  $(this);

                //         if(each_input_lifestyle_radio.is(':checked')){
                //             line_is_normal=false;
                //         }
                //         if(line_is_normal){
                //             each_line_lifestyle_radio.prev().css( "color", "red" );
                //         }else{
                //             each_line_lifestyle_radio.prev().css( "color", "black" );
                //         }
                //         each_input_lifestyle_radio.click(function() {

                //             $(this).parents('.form-type-radios').prev().css( "color", "black" );

                //          });


                //     });



                // });
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/medications?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
               $(".my_medication").removeClass('loading-blue');
                $(".health_qstns_body .my_medication").html(res.intakeform);
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $.ajax({

            url: 'https://app.iqyouhealth.com/api/health-questions-smart-questions?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
               $(".smart_questions").removeClass('loading-blue');
                $(".health_qstns_body .smart_questions").html(res.intakeform1);
                $(res.intakeform).insertAfter('#intake-wizard-smartquestions-form');

                //$('#intake-wizard-smartquestions-form').attr('action','https://app.iqyouhealth.com/profile/smart?pg=2'+$('#intake-wizard-smartquestions-form').attr('action'))
                //$(".health_qstns_body .smart_questions #intake-wizard-smartquestions-form").next().html(res.intakeform);
                $(".health_qstns_body .smart_questions form .questioncontainer a").each(function () {
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });

            },
            complete: function (data) {

                if (checkRow()) {
                    makeitred();
                }
                $("#intake-wizard-smartquestions-form #edit-save").val('Save and close questionnaire');



               



            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        function metabolic_risk() {
            $.ajax({

                url: 'https://app.iqyouhealth.com/api/metabolic_risk?user_key=' + window.cus_id + '&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                type: 'GET',
                crossDomain: true,
                success: function (res) {
                    var a, b, c;
                    $.each(res.toxins.detailed, function (i, v) {

                        if (i == 4) {
                            c = "<h4>" + v.cause + "</h4><p>" + v.description + "</p>";
                        }
                        if (i == 578) {
                            a = "<h4>" + v.cause + "</h4><p>" + v.description + "</p>";
                        }
                        if (i == 309) {
                            b = "<h4>" + v.cause + "</h4><p>" + v.description + "</p>";
                        }


                    });

                    $("#toxin_score .modal-body").append(a + b + c);
                },
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });

        }
    }


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