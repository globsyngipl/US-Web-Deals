﻿var err_field;
var err_message = '';
var i = 1;
var tmp;
var bookString = '';

jQuery.fn.exists = function () { return this.length > 0; }

$(document).ready(function () {
    //billing address-shipping address radio on-off
    $('#showBillInfo').hide();
    $('#radbillno').click(function () {
        $('#showBillInfo').slideDown(0);

    });
    $('#radbillyes').click(function () {
        $('#showBillInfo').slideUp(0);
    });
    //end of billing address-shipping address radio on-off

    //toggle view membership agreement
    $("#divViewTermsAndConditions").click(function () {
        if ($("#divMemberAgreement").hasClass("scroll")) {
            $("#divMemberAgreement").removeClass("scroll");
            $("#divMemberAgreement").addClass("MemberAgreement-Large");
            $("#spanTermsAndConditionsSummaryLable").text("Click here to collapse Terms & Conditions");
        }
        else {
            $("#divMemberAgreement").removeClass("MemberAgreement-Large");
            $("#divMemberAgreement").addClass("scroll");
            $("#spanTermsAndConditionsSummaryLable").text("Click here to view complete Terms & Conditions");
            $('html,body').animate({ scrollTop: $('#divMemberAgreement').offset().top }, 'slow');
        }
    });
    //end of toggle view membership agreement


    $("#btnSubmit1").click(function () {
        //alert("Hi, submit Clicked.....");
        if (validate_form() == true) {
            // pleaseWait();
            $("#form1").submit();

        }
        else {
            if (err_message.length > 0) {
                $("#spnErrorMessage").html(err_message.toString());
                $("#dialog-message").modal("toggle");
            }
        }
    });

});



function set_errs(field, message) {
    if (typeof err_field == 'undefined') { err_field = field; }
    err_message += i++ + '. ' + message + '<br/>';;
}


function validate_form() {
    err_message = '';
    err_field = tmp;
    i = 1;

    if ($("#radbillno").is(":checked")) {
        if ($('#txtBillFirstName').exists()) {
            if ($('#txtBillFirstName').val() == '') {
                set_errs($("#txtBillFirstName"), 'Billing first name is required.\n');
            }
            else {
                if ($('#txtBillFirstName').val().trim().length < 3 || $('#txtBillFirstName').val().trim().length > 15) {
                    set_errs($("#txtBillFirstName"), 'Billing first name should be of minimum 3 chars and maximum 15.\n');
                }
            }
        }

        if ($('#txtBillLastName').exists()) {
            if ($('#txtBillLastName').val().trim() == '') {
                set_errs($("#txtBillLastName"), 'Billing last name is required.\n');
            }
            else {
                if ($('#txtBillLastName').val().trim().length < 3 || $('#txtBillLastName').val().trim().length > 15) {
                    set_errs($("#txtBillLastName"), 'Billing last name should be minimum 3 chars and maximum 15.\n');
                }
            }
        }

        if ($('#txtBillStreet').exists()) {
            if ($('#txtBillStreet').val().trim() == '') {
                set_errs($("#txtBillStreet"), 'Billing address required.\n');
            }
            else {
                if ($('#txtBillStreet').val().trim().length < 5 || $('#txtBillStreet').val().trim().length > 30) {
                    set_errs($("#txtBillStreet"), 'Billing address should be minimum 5 chars and maximum 30.\n');
                }
            }
        }

        if ($('#txtBillCity').exists()) {
            if ($('#txtBillCity').val().trim() == '') {
                set_errs($("#txtBillCity"), 'Billing city is required.\n');
            }
            else {
                if ($('#txtBillCity').val().trim().length < 3 || $('#txtBillCity').val().trim().length > 16) {
                    set_errs($("#txtBillCity"), 'Billing City should be minimum 3 chars and maximum 16.\n');
                }
            }
        }
        if ($('#chkBillState').exists()) { if ($('#chkBillState').val() == '') { set_errs($("#chkBillState"), 'Billing state is required.\n'); } }
        if ($('#txtBillZipCode').exists()) { if ($('#txtBillZipCode').val() == '') { set_errs($("#txtBillZipCode"), 'Billing Zip code is required.\n'); } }

    }

    if ($('#txtCreditCardNumber').exists()) { if ($('#txtCreditCardNumber').val() == '') { set_errs($("#txtCreditCardNumber"), 'Credit Card number is required.\n'); } }
    if ($('#optCardExpiryMonth').exists()) { if ($('#optCardExpiryMonth').val() == '' || $('#optCardExpiryMonth').val() == 'Month') { set_errs($("#optCardExpiryMonth"), 'Credit Card expiration month is required.\n'); } }
    if ($('#optCardExpiryYear').exists()) { if ($('#optCardExpiryYear').val() == '' || $('#optCardExpiryYear').val() == 'Year') { set_errs($("#optCardExpiryYear"), 'Credit Card expiration year is required.\n'); } }
    if (!ValidateExpDate()) { err_message += i++ + '. ' + "Invalid Credit Card Expiration date.<br/>" }
    if ($('#txtCVV').exists()) { if ($('#txtCVV').val() == '') { set_errs($("#txtCVV"), 'Credit Card security code (CVV) is required.\n'); } }
    if ($('#txtKey').exists()) { if ($('#txtKey').val() == '') { set_errs($("#txtCVV"), 'Security captcha is required.\n'); } }
    var age = document.getElementById("chkAge");
    if (age.checked == false) { set_errs(age, 'Agree to the terms and conditions of this offer.\n'); }
    console.log(err_message)
    if (err_message.length > 0) {
        return false;
    }
    else {
        return true;
    }
}


function pleaseWait() {
    $("#loading").fadeIn();
    var opts = {
        lines: 12, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false // Whether to use hardware acceleration
    };
    var target = document.getElementById('loading');
    var spinner = new Spinner(opts).spin(target);
}


function ValidateExpDate() {
    var ccExpYear = $('#optCardExpiryYear').val();
    var ccExpMonth = $('#optCardExpiryMonth').val();
    var expDate = new Date();
    expDate.setFullYear(ccExpYear, ccExpMonth, 1);
    expDate.setDate(expDate.getDate() - 1);
    var today = new Date();

    if (expDate < today) {
        return false;
    }
    else {
        return true;
    }
}