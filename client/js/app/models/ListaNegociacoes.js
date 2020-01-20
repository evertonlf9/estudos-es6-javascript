export class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [...this._negociacoes];
    }

    get volumeTotal () {
        return this._negociacoes.reduce((total, item)=> total += item.volume, 0.0);
    }

    orderByListReverse() {
        this._negociacoes.reverse();
    }

    orderByList(criterio) {
        this._negociacoes.sort(criterio);  
    }

    add(negociacoes) {
        this._negociacoes.push(negociacoes);
    }

    remove() {
        this._negociacoes = [];
    }
    
}