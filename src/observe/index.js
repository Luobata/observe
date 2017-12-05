import { 
    isObj, 
    isFun,
    noop,
}  from 'UTIL/index';
import Watcher from './watcher';
import Dep from './Dep';

export class Observe {
    constructor() {
    };

    observe(target: Object) {
        console.log(target);
        const name = target.constructor.name;
        this[name] = target;

        if (has(target, $computed) && isObj(targe[$computed])) {
            this.initComputed(target[$computed], name);
        }
    };

    initComputed($computed: Object, name: String) {
        for (let i in $computed) {
            if (!has($computed, i)) continue;
            if (!isFun($computed[i]) {
                new Error(`${this[name]} computed value ${i} is not a function`);
                continue;
            }
        }

        $computed[i].call(this[name]);
        Object.defineProperty(this[name], i, {
            enumerable: true,
            configurable: true,
            get: (function get (fun, model) {
                const watcher = new Watcher(model, fun, noop);
                return function getter() {
                    if (watcher.lazy) {
                        watcher.evaluate();
                    }
                    if (Dep.target) {
                        watcher.depend();
                    }

                    return watcher.value;
                };
            })($computed[i], this[name]),
            set: noop,
        });
    };
};

export const observe = (
    obj: Object
) => {
};
