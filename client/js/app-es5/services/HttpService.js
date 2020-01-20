'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

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

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);

                    this._headers = new Headers();
                    this._headers.append('Accept', 'application/json');
                    this._headers.append('Content-Type', 'application/json');
                }

                _createClass(HttpService, [{
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        return new Promise(function (resolve, reject) {
                            fetch(url, {
                                method: 'GET',
                                headers: _this._headers,
                                mode: 'cors',
                                cache: 'default'
                            }).then(_this._handleErrors).then(function (response) {
                                return resolve(response);
                            }).catch(function (error) {
                                return reject(error.message);
                            });
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, data) {
                        var _this2 = this;

                        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

                        return new Promise(function (resolve, reject) {
                            fetch(url, {
                                method: 'POST',
                                headers: _this2._headers,
                                mode: 'cors',
                                body: JSON.stringify(data),
                                cache: 'default'
                            }).then(_this2._handleErrors).then(function (response) {
                                return resolve(response);
                            }).catch(function (error) {
                                return reject(error.message);
                            });
                        });
                    }
                }, {
                    key: '_handleErrors',
                    value: function _handleErrors(response) {
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json();
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map