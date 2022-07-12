import { LightningElement } from 'lwc';
import { userLogin, userRegistration } from '../../services/user';
import { SESSION } from '../../services/session';
import {log} from '../../utils/log';

export default class Login extends LightningElement {
    inputUserName;
    inputPwd;
    eventType;
    eventDetail;
    errorMessage;
    dupUserMsg = 'duplicate key value violates unique constraint "user_username_key"';
    dbConnectMsg = 'connect ECONNREFUSED';

    register(){
        this.inputUserName = this.template.querySelector('[data-id="userIdInput"]').value;
        this.inputPwd = this.template.querySelector('[data-id="pwdInput"]').value;
        userRegistration(this.inputUserName, this.inputPwd)
            .then((response) => {
                if(response.hasOwnProperty('error')){
                    if (response.error == this.dupUserMsg){
                        this.errorMessage = 'Username already registered';
                    } else if (response.error.startsWith(this.dbConnectMsg)) {
                        this.errorMessage = 'Database connection error';
                    } else {
                        this.errorMessage = response.error;
                    }
                    this.dispatchEvent(new CustomEvent('error_message', {
                        detail: {
                            name: 'raiseUIError',
                            errormsg: this.errorMessage 
                        }
                    }));
                } else {
                    SESSION.userId = response.id;
                    SESSION.userName = response.username;
                    SESSION.authenticated = true;
                    // lwc event - handled by app.js
                    this.dispatchEvent(new CustomEvent('state_change', {
                        detail: {
                            name: 'LoggedIn',
                            userid: SESSION.userName
                        }
                    }));    
                }
            })
            .catch(e => console.error('login.userRegistration', e.stack))
    }

    login(){
        this.inputUserName = this.template.querySelector('[data-id="userIdInput"]').value;
        this.inputPwd = this.template.querySelector('[data-id="pwdInput"]').value;

        userLogin(this.inputUserName, this.inputPwd)
            .then((response) => {
                if (response.rowCount == 1){
                    SESSION.userId = response.rows[0].id;
                    SESSION.userName = response.rows[0].username;
                    SESSION.authenticated = true;

                    this.eventType = 'state_change';
                    this.eventDetail = {
                            name: 'LoggedIn',
                            userid: SESSION.userName
                        };
                } else {
                    if(response.hasOwnProperty('error')){
                        if(response.error.startsWith(this.dbConnectMsg)){
                            this.errorMessage = 'Database connection error';
                        }
                    } else{
                        this.errorMessage = 'Incorrect username and password'
                    }
                    this.eventType = 'error_message';
                    this.eventDetail = {
                            name: 'raiseUIError',
                            errormsg: this.errorMessage 
                        };  
                }
            })
            .catch(e => console.error('login.userLogin', e.stack))
            .then(() => {
                // lwc event - handled by app.js
                this.dispatchEvent(new CustomEvent(this.eventType, {
                    detail: this.eventDetail
                }));    
            })

    }

}