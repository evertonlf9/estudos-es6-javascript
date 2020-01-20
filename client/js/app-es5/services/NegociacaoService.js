'use strict';

System.register(['./HttpService.js', '../dao/NegociacaoDao.js', './ConnectionFactory.js'], function (_export, _context) {
    "use strict";

    var HttpService, NegociacaoDao, ConnectionFactory, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpServiceJs) {
            HttpService = _HttpServiceJs.HttpService;
        }, function (_daoNegociacaoDaoJs) {
            NegociacaoDao = _daoNegociacaoDaoJs.NegociacaoDao;
        }, function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'getSemana',
                    value: function getSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('negociacoes/semana').then(function (res) {
                                return resolve(res);
                            }).catch(function (error) {
                                return reject('Não foi possivel importar as Negociações da semana!');
                            });
                        });
                    }
                }, {
                    key: 'getAnterior',
                    value: function getAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('negociacoes/anterior').then(function (res) {
                                return resolve(res);
                            }).catch(function (error) {
                                return reject('Não foi possivel importar as Negociações da semana Anterior!');
                            });
                        });
                    }
                }, {
                    key: 'getRetrasada',
                    value: function getRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('negociacoes/retrasada').then(function (res) {
                                return resolve(res);
                            }).catch(function (error) {
                                return reject('Não foi possivel importar as Negociações da semana retrasada!');
                            });
                        });
                    }
                }, {
                    key: 'setNegociacaoServer',
                    value: function setNegociacaoServer(data) {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            _this4._http.post('/negociacoes', data).then(function (res) {
                                return resolve(res);
                            }).catch(function (error) {
                                return reject('N\xE3o foi poss\xEDvel enviar a negocia\xE7\xE3o: ' + error);
                            });
                        });
                    }
                }, {
                    key: 'getAll',
                    value: function getAll() {
                        var _this5 = this;

                        return new Promise(function (resolve, reject) {
                            Promise.all([_this5.getSemana(), _this5.getAnterior(), _this5.getRetrasada()]).then(function (data) {
                                return resolve(data);
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }, {
                    key: 'register',
                    value: function register(data) {
                        return new Promise(function (resolve, reject) {
                            ConnectionFactory.getConnection().then(function (connection) {
                                return new NegociacaoDao(connection);
                            }).then(function (dao) {
                                return dao.add(data);
                            }).then(function () {
                                return resolve('Negociação adcionado com sucesso!');
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }, {
                    key: 'listAll',
                    value: function listAll() {
                        return new Promise(function (resolve, reject) {
                            ConnectionFactory.getConnection().then(function (connection) {
                                return new NegociacaoDao(connection);
                            }).then(function (dao) {
                                return dao.listAll();
                            }).then(function (data) {
                                return resolve(data);
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }, {
                    key: 'removeAll',
                    value: function removeAll() {
                        return new Promise(function (resolve, reject) {
                            ConnectionFactory.getConnection().then(function (connection) {
                                return new NegociacaoDao(connection);
                            }).then(function (dao) {
                                return dao.removeAll();
                            }).then(function (message) {
                                return resolve(message);
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }, {
                    key: 'import',
                    value: function _import(currentList) {
                        var _this6 = this;

                        return new Promise(function (resolve, reject) {
                            _this6.getAll().then(function (res) {
                                return res.filter(function (item) {
                                    return !currentList.some(function (itemExist) {
                                        JSON.stringify(item) == JSON.stringify(itemExist);
                                    });
                                });
                            }).then(function (data) {
                                return resolve(data);
                            }).catch(function (error) {
                                return reject(error);
                            });
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map