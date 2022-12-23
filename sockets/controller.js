const { Socket } = require('socket.io');
const { checkToken } = require("../helpers");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage();

const socketController = async( socket = new Socket(), io ) => {

    const user = await checkToken( socket.handshake.headers['x-token'] );
    if ( !user ) {
      
        return socket.disconnect();

    };

    // Agregar al usuario conectado
    chatMessage.connectUser( user );
    io.emit( 'active-users', chatMessage.usersArr );
    socket.emit( 'receive-message', chatMessage.last10 );

    // Conectarlo a una sala especial
    socket.join( user.id );
    
    // Limpiar cuando alguien se desconecta
    socket.on( 'disconnect', () => {
        
        chatMessage.disconnectUser( user.id );
        io.emit( 'active-users', chatMessage.usersArr );

    });

    socket.on( 'send-message', ({ uid, msg }) => {

        if ( uid ) {

            socket.to( uid ).emit( 'private-message', { de: user.name, msg });
            
        } else {
            
            chatMessage.sendMessage( user.id, user.name, msg );
            io.emit( 'receive-message', chatMessage.last10 );

        };

    });

};

module.exports = {
    socketController
};