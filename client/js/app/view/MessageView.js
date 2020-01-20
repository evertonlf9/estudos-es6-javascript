import {View} from './View.js';

export class MessageView extends View {

    constructor(element) {
        super(element)
    }

    _template(model) {
        return (model && model.texto) ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }
}