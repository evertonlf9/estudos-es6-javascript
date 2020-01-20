import { ListaNegociacoes } from "../models/ListaNegociacoes.js";
import { Message } from "../models/Message.js";
import { Negociacao } from "../models/Negociacao.js";

import { NegociacoesView } from "../view/NegociacoesView.js";
import { MessageView } from "../view/MessageView.js";

import { NegociacaoService } from "../services/NegociacaoService.js";

import { DateHelper } from "../helpers/DateHelper.js";
import { Bind } from "../helpers/Bind.js";

class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputValor = $("#valor");
        this._inputQtd = $("#quantidade");
        this._ordemAtual = '';
        this._service = new NegociacaoService();  

        //codigo inicial
        // this._listaNegociacoes = new ListaNegociacoes();       
        // this._message = new Message('');
        // this._messageView.update(this._message);
        // this._negociacoesView.update(this._listaNegociacoes);

        //Exemplo de uso do proxy - Estrutura(proxy é uma copia do original- trigger eventos traps  - object original)
        // Proxy Ele serve como um placeholder de um objeto real
        // let self = this;
        // this._listaNegociacoes = new Proxy(new ListaNegociacoes(new Date(), 1, 100), {
        //     get(target, prop, receiver) {
        //         if(['add', 'remove'].includes(prop) && typeof(target[prop]) === typeof(Function)){
        //             return function (){
        //                 console.log(`interceptando "${prop}"`);
        //                 Reflect.apply(target[prop], target, arguments);
        //                 self._negociacoesView.update(this._listaNegociacoes);
        //             }
        //         }
        //         return Reflect.get(target, prop, receiver);
        //     },
        //     set(target, prop, value, receiver) {
        //         console.log(`"${prop}" interceptada valor anterior "${target[prop]}" novo valor ${value}`);
        //         return Reflect.set(target, prop, value, receiver);
        //     }
        // });

        //re-escrevendo o codigo acima
        // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), this._negociacoesView, ['add', 'remove']);
        // this._message = ProxyFactory.create(new Message(), ['texto'], (model)=> this._messageView.update(model));

        // this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        // this._messageView = new MessageView($("#alert")); 

        //re-escrevendo o codigo acima
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'remove', 'orderByList', 'orderByListReverse');
        this._message = new Bind(new Message(), new MessageView($("#alert")), 'texto'); 
        
        this._initialize();
    }

    _initialize() {

        this._listAllIndexDB();       

        // setInterval(() => {
        //     this.import();
        // }, 3000);
    }

    addNegociacaoServer(){
        const negociacao = this._create();
        const data = {
            data: negociacao.date, 
            quantidade: negociacao.qtd,
            valor: negociacao.value
        }

        this._service.setNegociacaoServer(data)
        .then(resp => {
            this._inputData.value = '';
            this._inputQtd.value = 1;
            this._inputValor.value = 0.0;
            this._inputData.focus();
            this._message.texto = resp;
        })
        .catch(error =>{
            this._message.texto = error;
        })
    }

    add(event) {
        event.preventDefault();   

        this._addIndexDB();

        // // this._listaNegociacoes.setNegociacoes = this._create();

        // this._message.texto = 'Negociação adcionado com sucesso!';
        // this._listaNegociacoes.add(this._create());
        // //remover os update usando proxy
        // // this._update('Negociação adcionado com sucesso!');
        // this._clearForm();
    }

    _create() {
        return new Negociacao (
            DateHelper.textToDate(this._inputData.value),
            parseInt(this._inputQtd.value),
            parseFloat(this._inputValor.value)
        );
    }

    _clearForm () {
        this._inputData.value = ''
        this._inputValor.value = 0.0;
        this._inputQtd.value = 1;

        this._inputData.focus();
    }

    orderBy(col) {
        
        if(this._ordemAtual == col) {
            this._listaNegociacoes.orderByListReverse();
        } else {
            this._listaNegociacoes.orderByList((a, b) => a[col] - b[col]); 
        }

        this._ordemAtual = col;
    }

    import(e) {
        e.preventDefault(); 

        this._service
            .import(this._listaNegociacoes.negociacoes)
            .then(data => {
                data
                .reduce((list, arr) => list.concat(arr), [])
                .forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));                
                this._message.texto = 'Negociações importadas com sucesso!'
            })
            .catch(error => this._message.texto = error);

        // this._service.getAll()
        //     .then(res => res.filter((item) => 
        //         !this._listaNegociacoes.negociacoes.some( (itemExist) => {
        //             JSON.stringify(item) == JSON.stringify(itemExist)
        //         }) 
        //     ))
        //     .then(data => {
        //         console.log(data);
        //         data
        //         .reduce((list, arr) => list.concat(arr), [])
        //         .forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));                
        //         this._message.texto = 'Negociações importadas com sucesso!'
        //     })
        //     .catch(error => this._message.texto = error);  


        // service.getSemana()
        // .then(data => {
        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
        //     this._message.texto = 'Negociações importadas com sucesso!'
        // })
        // .catch(error => this._message.texto = error);

        // service.getAnterior()
        // .then(data => {
        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
        //     this._message.texto = 'Negociações importadas com sucesso!'
        // })
        // .catch(error => this._message.texto = error);

        // service.getRetrasada()
        // .then(data => {
        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
        //     this._message.texto = 'Negociações importadas com sucesso!'
        // })
        // .catch(error => this._message.texto = error);        
    }

    _update(text) {
        this._message.texto = text;        
        this._negociacoesView.update(this._listaNegociacoes);
        this._messageView.update(this._message);
    }

    remove(e) {
        e.preventDefault(); 
        
        this._removeIndexDB();
        // this._listaNegociacoes.remove();
        // this._update('Lista apagada com sucesso!');
    }

    _removeIndexDB() {
        this._service
            .removeAll()
            .then(message => {
                this._listaNegociacoes.remove();
                this._message.texto = message;
            })
            .catch(error => this._message.texto = error);
    }

    _listAllIndexDB() {
        this._service
            .listAll()
            .then(data => data.forEach(item => this._listaNegociacoes.add(item)))
            .catch(error => this._message.texto = error);
    }

    _addIndexDB() {
        let data = this._create();

        this._service
            .register(data)
            .then(message => {
                this._listaNegociacoes.add(data);
                this._message.texto = message;
                this._clearForm();
            })
            .catch(error => this._message.texto = error);
    }

}

let negociacaoController = new NegociacaoController();
export function CurrentInstance() {
    return negociacaoController;
}