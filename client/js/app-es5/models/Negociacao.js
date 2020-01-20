'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Negociacao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export('Negociacao', Negociacao = function () {
                function Negociacao(date, qtd, value) {
                    _classCallCheck(this, Negociacao);

                    if (!date || data === '') {
                        throw Error('Data um parametro obrigatório na criação da instancia de Negociação');
                        return;
                    }

                    this._date = new Date(date.getTime());
                    this._qtd = qtd;
                    this._value = value;

                    //Não deixar alterar o valor direto
                    //Object.freeze(this); // congela a instância do objeto
                }

                _createClass(Negociacao, [{
                    key: 'volume',
                    get: function get() {
                        return this._qtd * this._value;
                    }
                }, {
                    key: 'date',
                    get: function get() {
                        // retorna nova referencia de data
                        return new Date(this._date.getTime());
                    },
                    set: function set(date) {
                        return this._date = date;
                    }
                }, {
                    key: 'qtd',
                    get: function get() {
                        return this._qtd;
                    },
                    set: function set(qtd) {
                        return this._qtd = qtd;
                    }
                }, {
                    key: 'value',
                    get: function get() {
                        return this._value;
                    },
                    set: function set(value) {
                        return this._value = value;
                    }
                }]);

                return Negociacao;
            }());

            _export('Negociacao', Negociacao);
        }
    };
});
//# sourceMappingURL=Negociacao.js.map