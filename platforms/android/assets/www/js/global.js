/**
 * Created by Brody Gartner on 2017-04-13.
 */
$(document).on("pageshow","#ProfilePage",function(){
    userProfile();
});

$(document).on("pageshow","#SeeMap",function(){
    getPosition();
});

$(document).on("pageshow","#NewsFeed",function(){
    showFeed();
    getPosition();
});

$(document).on("pageshow","#ShowStatusLocation",function(){
    statusPosition();
});
var locationReady = false;
function document_deviceReady() {
    console.info("Device is ready");
    locationReady = true;
}
$(document).ready(function () {
    getPosition();
});


//User code
function btnLogout_click() {
    window.location="login.html";
}

function btnCheck_Validation() {
    addUser();
}

function btnCancel_SignUp() {
    window.location="login.html";
}

function btnSignUp() {
    $(location).prop('href', "SignUp.html");
}

function login() {
    User.checkLogin();

}
function btnDelete_Account() {
    deleteUser();
    deleteFeedwithUser();
}

function btnUpdate_LI() {
    $(location).prop('href', "#EditLoginInfo");
}
function btnUpdate_PI() {
    $(location).prop('href', "#EditPersonalInfo");
}
function btnUpdate_LoginInfo() {
    updateUserLI();
}
function btnUpdate_PersonalInfo() {
    updateUserPI();
}

function pageEditPI_show() {
    showUserPI();
}

function pageEditLI_show() {
    showUserLI();
}
function btnUpdate_Back() {
    $(location).prop('href', "#ProfilePage");
}

//Feed code
function btnAdd_Status() {
    var status = document.getElementById('status');
    if(status.value==null||status.value== "")
    {
        alert("C'mon post something");
    }
    else
    {
        addStatus();
        status.value="";
    }
    showFeed();
}

function init() {
    $(document).on('deviceready', document_deviceReady);


    //User
    $("#logout").on("click", btnLogout_click);
    $("#logout1").on("click", btnLogout_click);
    $("#logout2").on("click", btnLogout_click);
    $("#logout3").on("click", btnLogout_click);
    $("#logout4").on("click", btnLogout_click);
    $("#logout5").on("click", btnLogout_click);
    $("#logout6").on("click", btnLogout_click);
    $("#logout7").on("click", btnLogout_click);
    $("#logout8").on("click", btnLogout_click);

    $("#btnCancelSignUp").on("click", btnCancel_SignUp);
    $("#btnSignUpNow").on("click", btnSignUp);

    $("#btnSignUp").on("click", btnCheck_Validation);
    $("#btnDeleteAccount").on("click", btnDelete_Account);

    $("#btnUpdateLI").on("click",btnUpdate_LI );
    $("#btnUpdatePI").on("click", btnUpdate_PI);

    $("#EditPersonalInfo").on("pageshow", pageEditPI_show);
    $("#EditLoginInfo").on("pageshow", pageEditLI_show);
    $("#btnSavePI").on("click", btnUpdate_PersonalInfo);
    $("#btnLIEdit").on("click", btnUpdate_LoginInfo);

    $("#btnCancelSettings").on("click", btnUpdate_Back);

    //Feed
    $("#btnAddStatus").on("click", btnAdd_Status);

}

function initDB() {
    try {
        DB.createDatabase();
        if (db) {
            DB.createTables();
        }

    } catch (e) {
        console.error("Error: (Fatal) Error in initDB, can not proceed");
    }
}

$(document).ready(function () {
    init();
    initDB();
});
