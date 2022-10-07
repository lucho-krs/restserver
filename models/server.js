const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        // Middleware
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() { 
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello world')
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;