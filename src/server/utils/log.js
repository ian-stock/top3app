module.exports =  function log(source, desc){
    
    const filterOut = [
        // "server.server",
        // "server.sockets",
        // "server.game",
        "server.database",
        "server.user",
        "server.player",
        "server.answer"
    ]
    //returns true if substring exists
    if (!filterOut.some(v => source.includes(v))) {
        console.log(`${source}: ${desc}`);
    }
}