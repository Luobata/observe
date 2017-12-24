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
    };

    initComputed($computed: Object, name: String, force: Boolean = false) {
        for (let i in $computed) {
            if (!has($computed, i)) continue;
            if (!isFun($computed[i]) && !(isObj($computed[i]) && isFun($computed[i].value))) {
                throw new Error(`${observeObj[name]} computed value ${i} is not a function`);
                continue;
            }
            let lazy = $computed[i].lazy || false;
            if (!lazy && force) return;
            const fun = $computed[i].value || $computed[i];
            lazy = lazy && !force;
            if (!lazy) fun.call(observeObj[name], observeObj);
            Object.defineProperty(observeObj[name], i, {
                enumerable: true,
                configurable: true,
                get: (function get (fun, model, name) {
                    const watcher = new Watcher(fun, model, name, lazy);
                    return function getter() {
                        if (Dep.target) {
                            watcher.depend();
                        }

                        return watcher.value;
                    };
                })(fun, observeObj, name),
                set: noop,
            });
        }
    };

};

Observe.getValue = function getValue () {
    for (let i in observeObj) {
        if (!has(observeObj, i)) continue;
        if (has(observeObj[i], '$computed')) {
            const name = observeObj[i].constructor.name;
            observeObj[i].initComputed(observeObj[i]['$computed'], name, true);
        }
    }
};

export const observe = (
    obj: Object
) => {
};
