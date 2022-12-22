let user = null;
let socket = null;

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
    
    const socket = io({

        'extraHeaders': { 
            'x-token': localStorage.getItem('token')

        }
        
    });

};

const main = async() => {

    await validateJWT();

};

main();