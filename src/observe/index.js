import { 
    isObj, 
    isFun,
    has,
    noop,
}  from 'UTIL/index';
import Watcher from './watcher';
import Dep from './dep';
import Observer from './observe';

let observeObj = {};

export class Observe {
    constructor() {
    };

    observe(target: Object) {
        const name = target.constructor.name;
        const $data = {};
        observeObj[name] = target;
        for (let i in target) {
            if (!has(target, i)) continue;
            if (i !== '$computed') {
                $data[i] = target[i];
            }
        }

        this.initData($data, target);

        if (has(target, '$computed') && isObj(target['$computed'])) {
            this.initComputed(target['$computed'], name);
        }
    };

    initData($data: Object, target: Object) {
        return new Observer($data, target); 
    }

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

Observe.getValue = function getValue () {
    console.log(1);
};

export const observe = (
    obj: Object
) => {
};
