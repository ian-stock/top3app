import { LightningElement } from 'lwc';
import { userLogin, userRegistration } from '../../services/user';
import { SESSION } from '../../services/session';

export default class Login extends LightningElement {
    inputUserName;
    inputPwd;
    eventType;
    eventDetail;

    register(){
        this.inputUserName = this.template.querySelector('[data-id="userIdInput"]').value;
        this.inputPwd = this.template.querySelector('[data-id="pwdInput"]').value;
        userRegistration(this.inputUserName, this.inputPwd)
            .then((response) => {
                SESSION.userId = response.id;
                SESSION.userName = response.username;
                SESSION.authenticated = true;
            })
            .catch(e => console.error('login.userRegistration', e.stack))
            .then(() => {
                // lwc event - handled by app.js
                this.dispatchEvent(new CustomEvent('state_change', {
                    detail: {
                        name: 'LoggedIn',
                        userid: SESSION.userName
                    }
                }));    
            })
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
                    this.eventType = 'error_message';
                    this.eventDetail = {
                            name: 'raiseUIError',
                            errormsg: 'Incorrect username and password'
                        };  
                    // alert('Incorrect username and password');
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