export class View {
    constructor(element) {
        this._element = element;
    }

    _template(model) {
        throw new Error('O método template deve ser implementado!');
    }

    update(model) {
        this._element.innerHTML = this._template(model);
    }
}