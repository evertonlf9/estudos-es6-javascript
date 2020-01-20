import {View} from './View.js';
import {CurrentInstance} from '../controllers/NegociacaoController.js'
import {DateHelper} from '../helpers/DateHelper.js'

export class NegociacoesView extends View {

    constructor(element) {
        super(element);

        element.addEventListener('click', function(e) {
            if(e.target.nodeName === 'TH') {
                CurrentInstance().orderBy(e.target.textContent.toLowerCase());
            }
        });

        this._negCtrl = CurrentInstance();
    }

    _template(model) {

        // <th onclick="negCtrl.orderBy('date')">DATA</th>
        //                     <th onclick="negCtrl.orderBy('qtd')">QUANTIDADE</th>
        //                     <th onclick="negCtrl.orderBy('value')">VALOR</th>
        //                     <th onclick="negCtrl.orderBy('volume')">VOLUME</th>

        return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        ${model.negociacoes.map((item) =>
                            `<tr>
                                <td>${DateHelper.dateToText(item.date)}</td>
                                <td>${item.qtd}</td>
                                <td>${item.value}</td>
                                <td>${item.volume}</td>
                            </tr>`
                        ).join('')}
                    </tbody>
                    
                    <tfoot>
                            <td colspan="3">Total:</td>
                            <td>
                                ${model.volumeTotal}
                            </td>
                    </tfoot>
                </table>`
    }
}