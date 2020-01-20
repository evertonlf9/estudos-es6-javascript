import { CurrentInstance } from './controllers/NegociacaoController.js';
// import {} from './polyfill/fetch';

var negCtrl = CurrentInstance();

document.querySelector('.form').onsubmit = negCtrl.add.bind(negCtrl);
document.querySelector('[type=button]').onclick = negCtrl.remove.bind(negCtrl);
document.getElementById('sendData').onclick = negCtrl.addNegociacaoServer.bind(negCtrl);
document.getElementById('import').onclick = negCtrl.import.bind(negCtrl);
document.getElementById('remove').onclick = negCtrl.remove.bind(negCtrl);