"use strict";

System.register(["../models/ListaNegociacoes.js", "../models/Message.js", "../models/Negociacao.js", "../view/NegociacoesView.js", "../view/MessageView.js", "../services/NegociacaoService.js", "../helpers/DateHelper.js", "../helpers/Bind.js"], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Message, Negociacao, NegociacoesView, MessageView, NegociacaoService, DateHelper, Bind, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function CurrentInstance() {
        return negociacaoController;
    }

    _export("CurrentInstance", CurrentInstance);

    return {
        setters: [function (_modelsListaNegociacoesJs) {
            ListaNegociacoes = _modelsListaNegociacoesJs.ListaNegociacoes;
        }, function (_modelsMessageJs) {
            Message = _modelsMessageJs.Message;
        }, function (_modelsNegociacaoJs) {
            Negociacao = _modelsNegociacaoJs.Negociacao;
        }, function (_viewNegociacoesViewJs) {
            NegociacoesView = _viewNegociacoesViewJs.NegociacoesView;
        }, function (_viewMessageViewJs) {
            MessageView = _viewMessageViewJs.MessageView;
        }, function (_servicesNegociacaoServiceJs) {
            NegociacaoService = _servicesNegociacaoServiceJs.NegociacaoService;
        }, function (_helpersDateHelperJs) {
            DateHelper = _helpersDateHelperJs.DateHelper;
        }, function (_helpersBindJs) {
            Bind = _helpersBindJs.Bind;
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._inputData = $('#data');
                    this._inputValor = $("#valor");
                    this._inputQtd = $("#quantidade");
                    this._ordemAtual = '';
                    this._service = new NegociacaoService();

                    //codigo inicial
                    // this._listaNegociacoes = new ListaNegociacoes();       
                    // this._message = new Message('');
                    // this._messageView.update(this._message);
                    // this._negociacoesView.update(this._listaNegociacoes);

                    //Exemplo de uso do proxy - Estrutura(proxy é uma copia do original- trigger eventos traps  - object original)
                    // Proxy Ele serve como um placeholder de um objeto real
                    // let self = this;
                    // this._listaNegociacoes = new Proxy(new ListaNegociacoes(new Date(), 1, 100), {
                    //     get(target, prop, receiver) {
                    //         if(['add', 'remove'].includes(prop) && typeof(target[prop]) === typeof(Function)){
                    //             return function (){
                    //                 console.log(`interceptando "${prop}"`);
                    //                 Reflect.apply(target[prop], target, arguments);
                    //                 self._negociacoesView.update(this._listaNegociacoes);
                    //             }
                    //         }
                    //         return Reflect.get(target, prop, receiver);
                    //     },
                    //     set(target, prop, value, receiver) {
                    //         console.log(`"${prop}" interceptada valor anterior "${target[prop]}" novo valor ${value}`);
                    //         return Reflect.set(target, prop, value, receiver);
                    //     }
                    // });

                    //re-escrevendo o codigo acima
                    // this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), this._negociacoesView, ['add', 'remove']);
                    // this._message = ProxyFactory.create(new Message(), ['texto'], (model)=> this._messageView.update(model));

                    // this._negociacoesView = new NegociacoesView($('#negociacoesView'));
                    // this._messageView = new MessageView($("#alert")); 

                    //re-escrevendo o codigo acima
                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'add', 'remove', 'orderByList', 'orderByListReverse');
                    this._message = new Bind(new Message(), new MessageView($("#alert")), 'texto');

                    this._initialize();
                }

                _createClass(NegociacaoController, [{
                    key: "_initialize",
                    value: function _initialize() {

                        this._listAllIndexDB();

                        // setInterval(() => {
                        //     this.import();
                        // }, 3000);
                    }
                }, {
                    key: "addNegociacaoServer",
                    value: function addNegociacaoServer() {
                        var _this = this;

                        var negociacao = this._create();
                        var data = {
                            data: negociacao.date,
                            quantidade: negociacao.qtd,
                            valor: negociacao.value
                        };

                        this._service.setNegociacaoServer(data).then(function (resp) {
                            _this._inputData.value = '';
                            _this._inputQtd.value = 1;
                            _this._inputValor.value = 0.0;
                            _this._inputData.focus();
                            _this._message.texto = resp;
                        }).catch(function (error) {
                            _this._message.texto = error;
                        });
                    }
                }, {
                    key: "add",
                    value: function add(event) {
                        event.preventDefault();

                        this._addIndexDB();

                        // // this._listaNegociacoes.setNegociacoes = this._create();

                        // this._message.texto = 'Negociação adcionado com sucesso!';
                        // this._listaNegociacoes.add(this._create());
                        // //remover os update usando proxy
                        // // this._update('Negociação adcionado com sucesso!');
                        // this._clearForm();
                    }
                }, {
                    key: "_create",
                    value: function _create() {
                        return new Negociacao(DateHelper.textToDate(this._inputData.value), parseInt(this._inputQtd.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: "_clearForm",
                    value: function _clearForm() {
                        this._inputData.value = '';
                        this._inputValor.value = 0.0;
                        this._inputQtd.value = 1;

                        this._inputData.focus();
                    }
                }, {
                    key: "orderBy",
                    value: function orderBy(col) {

                        if (this._ordemAtual == col) {
                            this._listaNegociacoes.orderByListReverse();
                        } else {
                            this._listaNegociacoes.orderByList(function (a, b) {
                                return a[col] - b[col];
                            });
                        }

                        this._ordemAtual = col;
                    }
                }, {
                    key: "import",
                    value: function _import(e) {
                        var _this2 = this;

                        e.preventDefault();

                        this._service.import(this._listaNegociacoes.negociacoes).then(function (data) {
                            data.reduce(function (list, arr) {
                                return list.concat(arr);
                            }, []).forEach(function (element) {
                                return _this2._listaNegociacoes.add(new Negociacao(new Date(element.data), element.quantidade, element.valor));
                            });
                            _this2._message.texto = 'Negociações importadas com sucesso!';
                        }).catch(function (error) {
                            return _this2._message.texto = error;
                        });

                        // this._service.getAll()
                        //     .then(res => res.filter((item) => 
                        //         !this._listaNegociacoes.negociacoes.some( (itemExist) => {
                        //             JSON.stringify(item) == JSON.stringify(itemExist)
                        //         }) 
                        //     ))
                        //     .then(data => {
                        //         console.log(data);
                        //         data
                        //         .reduce((list, arr) => list.concat(arr), [])
                        //         .forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));                
                        //         this._message.texto = 'Negociações importadas com sucesso!'
                        //     })
                        //     .catch(error => this._message.texto = error);  


                        // service.getSemana()
                        // .then(data => {
                        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
                        //     this._message.texto = 'Negociações importadas com sucesso!'
                        // })
                        // .catch(error => this._message.texto = error);

                        // service.getAnterior()
                        // .then(data => {
                        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
                        //     this._message.texto = 'Negociações importadas com sucesso!'
                        // })
                        // .catch(error => this._message.texto = error);

                        // service.getRetrasada()
                        // .then(data => {
                        //     data.forEach(element => this._listaNegociacoes.add(new Negociacao (new Date(element.data), element.quantidade,  element.valor)));
                        //     this._message.texto = 'Negociações importadas com sucesso!'
                        // })
                        // .catch(error => this._message.texto = error);        
                    }
                }, {
                    key: "_update",
                    value: function _update(text) {
                        this._message.texto = text;
                        this._negociacoesView.update(this._listaNegociacoes);
                        this._messageView.update(this._message);
                    }
                }, {
                    key: "remove",
                    value: function remove(e) {
                        e.preventDefault();

                        this._removeIndexDB();
                        // this._listaNegociacoes.remove();
                        // this._update('Lista apagada com sucesso!');
                    }
                }, {
                    key: "_removeIndexDB",
                    value: function _removeIndexDB() {
                        var _this3 = this;

                        this._service.removeAll().then(function (message) {
                            _this3._listaNegociacoes.remove();
                            _this3._message.texto = message;
                        }).catch(function (error) {
                            return _this3._message.texto = error;
                        });
                    }
                }, {
                    key: "_listAllIndexDB",
                    value: function _listAllIndexDB() {
                        var _this4 = this;

                        this._service.listAll().then(function (data) {
                            return data.forEach(function (item) {
                                return _this4._listaNegociacoes.add(item);
                            });
                        }).catch(function (error) {
                            return _this4._message.texto = error;
                        });
                    }
                }, {
                    key: "_addIndexDB",
                    value: function _addIndexDB() {
                        var _this5 = this;

                        var data = this._create();

                        this._service.register(data).then(function (message) {
                            _this5._listaNegociacoes.add(data);
                            _this5._message.texto = message;
                            _this5._clearForm();
                        }).catch(function (error) {
                            return _this5._message.texto = error;
                        });
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map