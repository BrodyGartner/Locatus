function getCurrentAge(dob) {
    var year = Number(dob.substr(0,4));
    var month = Number(dob.substr(5,2)) - 1;
    var day = Number(dob.substr(8,2));
    var today = new Date();
    var age = today.getFullYear() -year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    }
    return age;

}

function doValidate_frmSignUp() {
    var form = $("#signUpForm");
    form.validate({
        rules:{
            username2:{
                required: true,
                minlength: 6
            },
            password2:{
                required: true,
                minlength: 8,
                passwordcheck:true  //custom
            },
            verifyPassword2:{
                required: true,
                equalTo: "#password2"
            },
            inptFirstName:{
                required: true,
            },
            inptLastName:{
                required: true,
            },
            inptEmail:{
                required:true,
                email:true,
            },
            inptHomeAddress:{
                required:true
            },
            inptCity:{
                required:true
            },
            inptPostalCode:{
                required:true,
                postalcodecheck:true
            },
            inptDOB:{
                required:true,
                agecheck:true  //custom
            }
        },
        messages:{
            username2:{
                required: "You must enter a username",
                minlength: "Username must have at least 6 characters"
            },
            password2:{
                required: "Password is required",
                minlength: "Password must be at least 8 character long",
                passwordcheck:"Must contain at least 1 digit and 1 cap"  //custom
            },
            verifyPassword2:{
                required: "Please re-enter password",
                equalTo: "Password is not same, please re-enter"
            },
            inptFirstName:{
                required:"You must enter your first name"
            },
            inptLastName:{
                required:"You must enter your last name"
            },
            inptEmail:{
                required:"You must enter email",
                email:"Enter a valid email address"
            },
            inptHomeAddress:{
                required:"You must enter address"
            },
            inptCity:{
                required:"You must enter city"
            },
            inptPostalCode:{
                required:"You must enter postal code",
                postalcodecheck: "Must match cdn postal format"
            },
            inptDOB:{
                required:"DOB is required",
                agecheck:"You must be at least 18 years or older "  //custom
            }
        }
    });
    return form.valid();
}
function doValidate_frmChgPI() {
    var form = $("#chgPIForm");
    form.validate({
        rules:{
            chgFirstName:{
                required: true
            },
            chgLastName:{
                required: true
            },
            chgEmail:{
                required:true,
                email:true
            },
            chgAddress:{
                required:true
            },
            chgCity:{
                required:true
            },
            chgPC:{
                required:true,
                postalcodecheck:true
            },
            chgDOB:{
                required:true,
                agecheck:true  //custom
            }
        },
        messages:{
            inptFirstName:{
                required:"You must enter your first name"
            },
            inptLastName:{
                required:"You must enter your last name"
            },
            inptEmail:{
                required:"You must enter email",
                email:"Enter a valid email address"
            },
            inptHomeAddress:{
                required:"You must enter address"
            },
            inptCity:{
                required:"You must enter city"
            },
            inptPostalCode:{
                required:"You must enter postal code",
                postalcodecheck: "Must match cdn postal format"
            },
            inptDOB:{
                required:"DOB is required",
                agecheck:"You must be at least 18 years or older "  //custom
            }
        }
    });
    return form.valid();
}

function doValidate_frmChgLI() {
    var form = $("#chgLIForm");
    form.validate({
        rules:{
            passwordEdit:{
                required: true,
                minlength: 8,
                passwordcheck:true  //custom
            },
            verifyPasswordEdit:{
                required: true,
                equalTo: "#passwordEdit"
            }
        },
        messages: {
            passwordEdit: {
                required: "Password is required",
                minlength: "Password must be at least 8 character long",
                passwordcheck: "Must contain at least 1 digit and 1 cap"  //custom
            },
            verifyPasswordEdit: {
                required: "Please re-enter password",
                equalTo: "Password is not same, please re-enter"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("agecheck",
    function (value, element) {
        var age = getCurrentAge(value);
        if (age >= 18) {
            return true;
        }
        return false;
    },"Age must be greater than 17");
jQuery.validator.addMethod("passwordcheck",
    function (value, element) {
        var regex = /([A-Za-z\d]*[A-Z]+[A-Za-z\d]*[\d]+[A-Za-z\d]*)|([A-Za-z\d]*[\d]+[A-Za-z\d]*[A-Z]+[A-Za-z\d]*)/;
        return this.optional(element) || regex.test(value);
    },
    "Password must contain at least 1 digit and 1 capital letter");
jQuery.validator.addMethod("postalcodecheck",
    function (value, element) {
        var regex = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;
        return this.optional(element) || regex.test(value);
    },
    "Postal code must match cdn format: A1A 1A1");