'use strict';

System.register(['./controllers/NegociacaoController.js'], function (_export, _context) {
  "use strict";

  var CurrentInstance, negCtrl;
  return {
    setters: [function (_controllersNegociacaoControllerJs) {
      CurrentInstance = _controllersNegociacaoControllerJs.CurrentInstance;
    }],
    execute: function () {
      negCtrl = CurrentInstance();


      document.querySelector('.form').onsubmit = negCtrl.add.bind(negCtrl);
      document.querySelector('[type=button]').onclick = negCtrl.remove.bind(negCtrl);
      document.getElementById('sendData').onclick = negCtrl.addNegociacaoServer.bind(negCtrl);
      document.getElementById('import').onclick = negCtrl.import.bind(negCtrl);
      document.getElementById('remove').onclick = negCtrl.remove.bind(negCtrl);
    }
  };
});
//# sourceMappingURL=boot.js.map