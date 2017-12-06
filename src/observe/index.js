import { 
    isObj, 
    isFun,
    has,
    noop,
}  from 'UTIL/index';
import Watcher from './watcher';
import Dep from './dep';

let observeObj = {};

export class Observe {
    constructor() {
    };

    observe(target: Object) {
        console.log(target);
        const name = target.constructor.name;
        //this[name] = target;
        observeObj[name] = target;

        if (has(target, '$computed') && isObj(target['$computed'])) {
            this.initComputed(target['$computed'], name);
        }
    };

    initComputed($computed: Object, name: String) {
        for (let i in $computed) {
            if (!has($computed, i)) continue;
            if (!isFun($computed[i])) {
                new Error(`${observeObj[name]} computed value ${i} is not a function`);
                continue;
            }
            $computed[i].call(observeObj[name], observeObj);
            Object.defineProperty(observeObj[name], i, {
                enumerable: true,
                configurable: true,
                get: (function get (fun, model, name) {
                    const watcher = new Watcher(fun, model, name);
                    return function getter() {
                        if (watcher.lazy) {
                            watcher.evaluate();
                        }
                        if (Dep.target) {
                            watcher.depend();
                        }

                        return watcher.value;
                    };
                })($computed[i], observeObj, name),
                set: noop,
            });
        }
    };
};

export const observe = (
    obj: Object
) => {
};
