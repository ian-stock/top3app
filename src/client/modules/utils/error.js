export function handleError(error){
    
    //raise to ui

    // dispatchEvent(new CustomEvent('error_message', {
    //     detail: {
    //         name: 'raiseError',
    //         error: error
    //     }
    // }));    

    //log to console
    //where raised from, error name, error message
    console.log('error.message: ' + error);

    //log to db log / file

}

