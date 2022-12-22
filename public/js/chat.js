let user = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnExit = document.querySelector('#btnExit');

const validateJWT = async() => {

    const token = localStorage.getItem('token');
    if ( token.length <= 5 ) {
      
        window.location = 'index.html';
        throw new Error('Invalid token');
        
    };

    const resp = await fetch('http://localhost:8081/api/auth/', {

        headers: { 'x-token': token }

    });
    
    const { userAuth: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();
    
};

const connectSocket = async() => {
    
    socket = io({

        'extraHeaders': { 
            'x-token': localStorage.getItem('token')

        }
        
    });

    socket.on( 'connect', () => {

        console.log('Sockets online');

    });

    socket.on( 'disconnect', () => {

        console.log('Sockets offline');

    });

    socket.on( 'receive-message', () => {


    });

    socket.on( 'active-users', () => {


    });

    socket.on( 'private-message', () => {


    });

};

const main = async() => {

    await validateJWT();

};

main();