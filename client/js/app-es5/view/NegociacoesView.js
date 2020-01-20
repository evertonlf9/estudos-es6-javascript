'use strict';

System.register(['./View.js', '../controllers/NegociacaoController.js', '../helpers/DateHelper.js'], function (_export, _context) {
    "use strict";

    var View, CurrentInstance, DateHelper, _createClass, NegociacoesView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }, function (_controllersNegociacaoControllerJs) {
            CurrentInstance = _controllersNegociacaoControllerJs.CurrentInstance;
        }, function (_helpersDateHelperJs) {
            DateHelper = _helpersDateHelperJs.DateHelper;
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

            _export('NegociacoesView', NegociacoesView = function (_View) {
                _inherits(NegociacoesView, _View);

                function NegociacoesView(element) {
                    _classCallCheck(this, NegociacoesView);

                    var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, element));

                    element.addEventListener('click', function (e) {
                        if (e.target.nodeName === 'TH') {
                            CurrentInstance().orderBy(e.target.textContent.toLowerCase());
                        }
                    });

                    _this._negCtrl = CurrentInstance();
                    return _this;
                }

                _createClass(NegociacoesView, [{
                    key: '_template',
                    value: function _template(model) {

                        // <th onclick="negCtrl.orderBy('date')">DATA</th>
                        //                     <th onclick="negCtrl.orderBy('qtd')">QUANTIDADE</th>
                        //                     <th onclick="negCtrl.orderBy('value')">VALOR</th>
                        //                     <th onclick="negCtrl.orderBy('volume')">VOLUME</th>

                        return '<table class="table table-hover table-bordered">\n                    <thead>\n                        <tr>\n                            <th>DATA</th>\n                            <th>QUANTIDADE</th>\n                            <th>VALOR</th>\n                            <th>VOLUME</th>\n                        </tr>\n                    </thead>\n                    \n                    <tbody>\n                        ' + model.negociacoes.map(function (item) {
                            return '<tr>\n                                <td>' + DateHelper.dateToText(item.date) + '</td>\n                                <td>' + item.qtd + '</td>\n                                <td>' + item.value + '</td>\n                                <td>' + item.volume + '</td>\n                            </tr>';
                        }).join('') + '\n                    </tbody>\n                    \n                    <tfoot>\n                            <td colspan="3">Total:</td>\n                            <td>\n                                ' + model.volumeTotal + '\n                            </td>\n                    </tfoot>\n                </table>';
                    }
                }]);

                return NegociacoesView;
            }(View));

            _export('NegociacoesView', NegociacoesView);
        }
    };
});
//# sourceMappingURL=NegociacoesView.js.map