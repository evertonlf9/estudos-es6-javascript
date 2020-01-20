'use strict';

System.register(['../services/ConnectionFactory.js', '../models/Negociacao.js'], function (_export, _context) {
    "use strict";

    var ConnectionFactory, Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesConnectionFactoryJs) {
            ConnectionFactory = _servicesConnectionFactoryJs.ConnectionFactory;
        }, function (_modelsNegociacaoJs) {
            Negociacao = _modelsNegociacaoJs.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoDao', NegociacaoDao = function () {
                function NegociacaoDao(connection) {
                    _classCallCheck(this, NegociacaoDao);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDao, [{
                    key: 'add',
                    value: function add(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection.transaction([_this._store], "readwrite").objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {
                                resolve();
                            };

                            request.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Não foi possível adicionar a negociação');
                            };
                        });
                    }
                }, {
                    key: 'listAll',
                    value: function listAll() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var cursor = _this2._connection.transaction([_this2._store], "readwrite").objectStore(_this2._store).openCursor();

                            var negociacoes = [];
                            cursor.onsuccess = function (e) {
                                var atual = e.target.result;

                                if (atual) {

                                    var dado = atual.value;
                                    negociacoes.push(new Negociacao(dado._date, dado._qtd, dado._value));
                                    atual.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (e) {
                                console.log(e.target.error);
                                reject('Não foi possível listar as negociações');
                            };
                        });
                    }
                }, {
                    key: 'removeAll',
                    value: function removeAll() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this3._connection.transaction([_this3._store], "readwrite").objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                return resolve('Negociações removidos com sucesso!');
                            };
                            request.onerror = function (e) {
                                return reject('Não foi possível remover as negociações!');
                            };
                        });
                    }
                }, {
                    key: 'abort',
                    value: function abort() {
                        ConnectionFactory.getConnection().then(function (connection) {
                            var transaction = connection.transaction(['negociacoes'], 'readwrite');
                            var store = transaction.objectStore('negociacoes');
                            var negociacao = new Negociacao(new Date(), 1, 200);
                            var request = store.add(negociacao);

                            // #### VAI CANCELAR A TRANSAÇÃO. O evento onabort será chamado.
                            transaction.abort();
                            transaction.onabort = function (e) {
                                console.log(e);
                                console.log('Transação abortada');
                            };

                            request.onsuccess = function (e) {

                                console.log('Negociação incluida com sucesso');
                            };

                            request.onerror = function (e) {

                                console.log('Não foi possível incluir a negociação');
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map