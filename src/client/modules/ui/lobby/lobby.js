import { LightningElement, api } from 'lwc';
import { createNewGame } from '../../services/session/session';

export default class Lobby extends LightningElement {
    startNewGame(e){
        //client lwc to client lwc
        // this.dispatchEvent(new CustomEvent('phase_change', {
        //     detail: {
        //         name: 'NewGameStarted'
        //     }
        // }));

        //client lwc to node server
        //pass in userid, return game object with host:userid and gameid
        createNewGame('ianS1')
            .then((response) => {
                console.log('back in createNewGame');
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        
        //set user/session object as host?
        
        
    }

}
