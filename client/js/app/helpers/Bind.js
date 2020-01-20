import {ProxyFactory} from '../services/ProxyFactory.js';

/**
 * 
 * @param model new ListaNegociacoes(),
 * @param view  new NegociacoesView($('#negociacoesView')), 
 * @param props 'add', 'remove';
 */
export class Bind {
    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);

        return proxy;
    }
}