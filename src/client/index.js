function getRoomsByUser(id){
    let usersRooms = [];
    let rooms = io.sockets.adapter.rooms;

    for(let room in rooms){
        if(rooms.hasOwnProperty(room)){
            let sockets = rooms[room].sockets;
            if(id in sockets)
                usersRooms.push(room);          
        }
    }

    return usersRooms;
}