'use strict'

const objUserForm = new UserForm(); 

objUserForm.loginFormCallback = (data) => {
    console.log(data);
    ApiConnector.login(data, (callback) => {
        console.log(callback);
        if (callback.success){
            location.reload();
        }else {
        objUserForm.setLoginErrorMessage(callback.error);
    }});
}

objUserForm.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data,(callback)=>{
        console.log(callback);
        if (callback.success){
            location.reload();
        }else {
        objUserForm.setRegisterErrorMessage(callback.error);
    }});
}
