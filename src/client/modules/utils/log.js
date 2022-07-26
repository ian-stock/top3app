export function log(source, desc){
    
    const filterOut = [
        // "client.app",
        // "client.game",
        "client.header",
        "client.app.event-received",
        "client.gameLogic",
        "client.player",
        "client.enterTop3",
        "client.voting",
        "client.results",
        "client.lobby"
    ]
    //returns true if substring exists
    if (!filterOut.some(v => source.includes(v))) {
        console.log(`${source}: ${desc}`);
    }

}
