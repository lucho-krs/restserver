const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            
            auth: '/api/auth',
            users: '/api/users',
            products: '/api/products',
            categories: '/api/categories',
            
        };

        // Conectar a la base de datos
        this.connectionDB();

        // Middleware
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async connectionDB() {
        await dbConnection()
    }

    middlewares() { 
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.path.users, require('../routes/user'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.categories, require('../routes/category'));
        this.app.use(this.path.products, require('../routes/product'));

    };

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });

    }
}

module.exports = Server;