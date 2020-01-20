export class ProxyFactory {
    static create(objectInstance, props, action) {

        return new Proxy(objectInstance, {
            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function (){
                        console.log(`interceptando ${prop}`);
                        let callback = Reflect.apply(target[prop], target, arguments);
                        action(target);
                        return callback;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {

                let callback = Reflect.set(target, prop, value, receiver);
                // só executa action(target) se for uma propriedade monitorada
                if(props.includes(prop)) action(target); 
                return callback; 

                // if(props.includes(prop)) {
                //     // setTimeout(() => action(target),0);
                //     target[prop] = value;
                //     action(target)
                // }
                // return Reflect.set(target, prop, value, receiver);                
            }
        });
    }

    static _isFunction(fn) {
        return typeof(fn) === typeof(Function)
    }
}