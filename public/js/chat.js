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

    socket.on( 'receive-message', orderMessages);

    socket.on( 'active-users', orderUsers );

    socket.on( 'private-message', ( payload ) => {

        console.log('msg provado:', payload);

    });

};

const orderUsers = ( users = [] ) => {

    let usersHtml = '';
    users.forEach( ({ name, uid }) => {

        usersHtml += `

            <li>
                <p>

                    <h5 class="text-success">${ name }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>

                </p>
            </li>

        `;

    });

    ulUsers.innerHTML = usersHtml;

};

const orderMessages = ( messages = [] ) => {

    let messageHtml = '';
    console.log('messages', messages);
    messages.forEach( ({ name, message }) => {

        messageHtml += `

            <li>
                <p>

                    <span class="fs-6 text-primary">${ name }</span>
                    <span>${ message }</span>

                </p>
            </li>

        `;

    });

    ulMessages.innerHTML = messageHtml;

};

txtMessage.addEventListener( 'keyup', ({ keyCode }) => {

    const msg = txtMessage.value;
    const uid = txtUid.value;

    if ( keyCode !== 13 ) { return; }
    if ( msg.length === 0 ) { return; }

    socket.emit( 'send-message', { msg, uid } );
    txtMessage.value = '';

});

const main = async() => {

    await validateJWT();

};

main();