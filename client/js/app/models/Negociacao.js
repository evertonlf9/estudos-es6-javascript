export class Negociacao {
    constructor (date, qtd, value) {
       if(!date || data === '') {
        throw Error('Data um parametro obrigatório na criação da instancia de Negociação');  
        return
       } 

        this._date = new Date(date.getTime());
        this._qtd = qtd;
        this._value = value;

        //Não deixar alterar o valor direto
        //Object.freeze(this); // congela a instância do objeto
    }

    get volume () {
        return this._qtd * this._value;
    }

    get date () {
        // retorna nova referencia de data
        return new Date(this._date.getTime());
    }
    
    set date (date){
        return this._date = date;
    }

    get qtd (){
        return this._qtd;
    }
    set qtd (qtd){
        return this._qtd = qtd;
    }

    get value (){
        return this._value;
    }
    
    set value (value){
        return this._value = value;
    }
}