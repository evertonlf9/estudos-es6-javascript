const stores = ['negociacoes'];
const version = 3;
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory {
    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }
    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
            ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {  
                if(!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    // close = connection.close
                    connection.close = () => {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                }

            // recebe conexão já existente ou uma que acabou de ser criada
            resolve(connection);
            };

            openRequest.onerror = e => {  
                console.log(e.target.error);
                reject(e.target.error.name);  
            };
        })
    }

    static closeConnection() {
        if(connection){
            close();
            // Reflect.apply(close, connection, [])
            connection = null;
    
        }
    }

    static _createStores(connection) {

        // criando nossos stores!    
        stores.forEach(store => {    
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
}