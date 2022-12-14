const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );

        this.path = {
            
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads',
            
        };

        // Conectar a la base de datos
        this.connectionDB();

        // Middleware
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

        // Sockets
        this.sockets();

    };

    async connectionDB() {
        await dbConnection()
    };

    middlewares() { 

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json());

        // Directorio publico
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    };

    routes() {

        this.app.use(this.path.users, require('../routes/user'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/category'));
        this.app.use(this.path.products, require('../routes/product'));
        this.app.use(this.path.search, require('../routes/search'));
        this.app.use(this.path.uploads, require('../routes/upload'));

    };

    sockets() {

        this.io.on( 'connection', ( socket ) => socketController( socket, this.io ));

    };

    listen() {

        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });

    };

};

module.exports = Server;