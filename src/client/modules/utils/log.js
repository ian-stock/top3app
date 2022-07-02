export function log(source, desc){
    
    const filterOut = [
        // "client.app",
        // "client.game",
        "client.player",
        // "client.voting",
        "client.lobby"
    ]
    //returns true if substring exists
    if (!filterOut.some(v => source.includes(v))) {
        console.log(`${source}: ${desc}`);
    }

}
