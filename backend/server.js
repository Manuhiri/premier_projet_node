/* POur tester si notre serveur est bien pris en compte retirer les *

//importer le package http de node
const http = require('http');// ici cel� nous permet d'avoir acc�s � l'OBJET http pour cr�er notre serveur

// server est une constante � qui l'on donne la valeur http.createServer qui lui est une m�thode qui fait appel � une fonction qui prend pour argument (req,res)

//http.createServer == est une m�thode
// (req,res) sontles argument de notre fonction 
const server = http.createServer((req, res) => {
    res.end('Voil� la r�ponse du serveur!');
});

//il doit attendre les requ�te envoyer, il doit donc �couter on utlise listen
//Utilisation du port 3000
// process.env.PORT si on lui donne un port a �couter sinon c'est le 3000
server.listen(process.env.PORT || 3000);

*/



const http = require('http');
const app = require('./app');// j'importe l'aplication app.js


const normalizePort = val => { //renvoie un port valide, qu'il soit fourni sous la forme d'un num�ro ou d'une cha�ne
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000'); // app.set permet de dire � l'application sur quelle port elle va tourner
app.set('port', port);

const errorHandler = error => { //recherche les diff�rentes erreurs et les g�re de mani�re appropri�e. Elle est ensuite enregistr�e dans le serveur
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app); // on lui passe l'application

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
