//import {App} from '../ui/app/app.js';

// not in use yet, all socket logic still in app.js, will move over to socketclient.js at some point

export function handleSocketEvent(event, data){

    console.log('socketClient.handleSocketEvent: ');
    console.log(event);

    switch (event, data) {
        case 'player-joined': 
            //increment player count by 1
            // App.gamePlayerCount++
            break;
    }

}