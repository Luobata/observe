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

const initComputed = ($computed: Object, name: String, force: Boolean = false) => {
    for (let i in $computed) {
        if (!has($computed, i)) continue;
        if (!isFun($computed[i]) && !(isObj($computed[i]) && isFun($computed[i].value))) {
            throw new Error(`${observeObj[name]} computed value ${i} is not a function`);
            continue;
        }
        //if (!isObj($computed[i])) {
        //}
        const lazy = force ? false : ($computed[i].lazy || false);
        const fun = $computed[i].value || $computed[i];
        if (!lazy) fun.call(observeObj[name], observeObj);
        Object.defineProperty(observeObj[name], i, {
            enumerable: true,
            configurable: true,
            get: (function get (fun, model, name) {
                const watcher = new Watcher(fun, model, name, lazy);
                return function getter() {
                    if (watcher.lazy) {
                        watcher.evaluate();
                    }
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
            initComputed(target['$computed'], name);
        }
    };

    initData($data: Object, target: Object) {
        return new Observer($data, target); 
    }

};

Observe.getValue = function getValue () {
    console.log(1);
    for (let i in observeObj) {
        if (!has(observeObj, i)) continue;
        if (has(observeObj[i], '$computed')) {
            const name = observeObj[i].constructor.name;
            for (let j in observeObj[i]['$computed']) {
                initComputed(observeObj[i]['$computed'], name, true);
            }
        }
    }
};

export const observe = (
    obj: Object
) => {
};
