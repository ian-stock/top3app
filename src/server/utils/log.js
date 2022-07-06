module.exports =  function log(source, desc){
    
    const filterOut = [
        // "server.sockets",
        // "server.game",
        // "server.database"
    ]
    //returns true if substring exists
    if (!filterOut.some(v => source.includes(v))) {
        console.log(`${source}: ${desc}`);
    }
}