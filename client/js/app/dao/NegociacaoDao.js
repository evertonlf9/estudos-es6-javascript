// http://aaronpowell.github.io/db.js/
// https://dexie.org/
import {ConnectionFactory} from '../services/ConnectionFactory.js';
import { Negociacao } from "../models/Negociacao.js";

export class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    add(negociacao) {

        return new Promise((resolve, reject) => {
            let request = this._connection
            .transaction([this._store], "readwrite")
            .objectStore(this._store)
            .add(negociacao); 

            request.onsuccess = (e) => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            }

        });
    }

    listAll() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .openCursor();

                let negociacoes = [];
                cursor.onsuccess = e => {
                    let atual = e.target.result;
                
                    if(atual) {
                
                        let dado = atual.value;                
                        negociacoes.push(new Negociacao(dado._date, dado._qtd, dado._value));                
                        atual.continue();
                    } else {                
                        resolve(negociacoes);
                    }
                }

                cursor.onerror = e => {
                    console.log(e.target.error);
                    reject('Não foi possível listar as negociações');
                }
        });
    }

    removeAll() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve('Negociações removidos com sucesso!');
            request.onerror = e => reject('Não foi possível remover as negociações!');
        });
    }

    abort() {
        ConnectionFactory
            .getConnection()
            .then(connection => {
                    let transaction = connection.transaction(['negociacoes'], 'readwrite');
                    let store = transaction.objectStore('negociacoes');
                    let negociacao = new Negociacao(new Date(), 1, 200);
                    let request = store.add(negociacao);

                    // #### VAI CANCELAR A TRANSAÇÃO. O evento onabort será chamado.
                    transaction.abort(); 
                    transaction.onabort = e => {
                        console.log(e);
                        console.log('Transação abortada');
                    };

                    request.onsuccess = e => {

                        console.log('Negociação incluida com sucesso');
                    };

                    request.onerror = e => {

                        console.log('Não foi possível incluir a negociação');
                    };
            });
    }
}