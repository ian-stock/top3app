import { LightningElement, api } from 'lwc';
import { createNewGame } from '../../services/session/session';

export default class Lobby extends LightningElement {
    game;
    gameId;

    loginRegister(e){

    }

    startNewGame(e){

        //pass in username, return game object with host:userid and gameid
        createNewGame('ianS1')
            .then((response) => {
                // console.log('back in createNewGame');
                // console.log(response);
                this.game = response;
                this.gameId = response.gameid;
            })
            .catch((error) => {
                console.log(error);
            });
        
        //still need the below to 
        
        //client lwc to client lwc
        // this.dispatchEvent(new CustomEvent('state_change', {
        //     detail: {
        //         name: 'NewGameStarted'
        //     }
        // }));
        
    }

}
