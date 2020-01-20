import {HttpService} from './HttpService.js';
import {NegociacaoDao} from '../dao/NegociacaoDao.js';
import {ConnectionFactory} from './ConnectionFactory.js';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }
    
    getSemana() {       
        return new Promise((resolve, reject) =>{
            this._http.get('negociacoes/semana')
            .then(res => resolve(res))
            .catch((error) => reject('Não foi possivel importar as Negociações da semana!'));        
        });
    }

    getAnterior() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
            .then(res => resolve(res))
            .catch((error) => reject('Não foi possivel importar as Negociações da semana Anterior!'));        
        });
    }

    getRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
            .then(res => resolve(res))
            .catch((error) => reject('Não foi possivel importar as Negociações da semana retrasada!'));        
        });
    }

    setNegociacaoServer(data) {
        return new Promise((resolve, reject) => {
            this._http.post('/negociacoes', data)
            .then(res => resolve(res))
            .catch((error) => reject(`Não foi possível enviar a negociação: ${error}`));        
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getSemana(), 
                this.getAnterior(), 
                this.getRetrasada()
            ])
            .then(data => resolve(data))
            .catch(error => reject(error));  
        });
    }

    register(data) {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.add(data))
                .then(() => resolve('Negociação adcionado com sucesso!'))
                .catch(error => reject(error));
        })
    }

    listAll() {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection=> new NegociacaoDao(connection))
                .then(dao => dao.listAll())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    removeAll() {
        return new Promise((resolve, reject) => {
            ConnectionFactory
                .getConnection()
                .then(connection=> new NegociacaoDao(connection))
                .then(dao => dao.removeAll())
                .then(message => resolve(message))
                .catch(error => reject(error));
        })
    }

    import(currentList) {
        return new Promise((resolve, reject) => {
            this.getAll()
            .then(res => res.filter((item) => 
                !currentList.some( (itemExist) => {
                    JSON.stringify(item) == JSON.stringify(itemExist)
                }) 
            ))
            .then(data => resolve(data))
            .catch(error => reject(error));  

        })
    }
}