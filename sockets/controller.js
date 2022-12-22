const { checkToken } = require("../helpers");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage();

const socketController = async( socket, io ) => {

    const user = await checkToken( socket.handshake.headers['x-token'] );
    if ( !user ) {
      
        return socket.disconnect();

    };

    chatMessage.connectUser( user );
    io.emit( 'active-users', chatMessage.usersArr );
    
    io.on( 'disconnect', () => {
        
        chatMessage.disconnectUser( user.id );
        io.emit( 'active-users', chatMessage.usersArr );

    });

};

module.exports = {
    socketController
};