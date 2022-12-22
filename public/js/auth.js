const myForm = document.querySelector('form');

myForm.addEventListener('submit', ev => {

    ev.preventDefault();
    const formData = {};

    for ( let el of myForm.elements ) {

        if ( el.namespaceURI.length > 0 ) {
            
            formData[el.name] = el.value;

        };

    };

    fetch( 'http://localhost:8081/api/auth/login', {

        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }

    })
    .then( resp => resp.json() )
    .then( ({ token, msg }) => {

        if ( msg ) {

            return console.error( msg );

        };

        localStorage.setItem( 'token', token );
        window.location = 'chat.html';

    })
    .catch( err => {
        
        console.log(err);

    });

});

function handleCredentialResponse(response) {

    const body = { id_token: response.credential };
    
    fetch('http://localhost:8081/api/auth/google', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then( resp => resp.json() )
        .then( resp => {

            localStorage.setItem( 'token', resp.token );
            localStorage.setItem( 'email', resp.user.email );
            window.location = 'chat.html';

        })
        .catch( console.warn );

}

const button = document.getElementById('google_signout');
button.onclick = () => {

    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke( localStorage.getItem( 'email' ), done => {

        localStorage.clear();
        location.reload();

    });

};
