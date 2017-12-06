import Dep from './dep';

export class Observer {
    constructor($data: Object, target: Object) {
    };
};

const defineProperty = (
    obj: Object,
    key: String,
    val: any,
) => {
    // 每一个key增加一个dep
    let dep = new Dep();
    
    const property = Object.getOwnPropertyDescriptor(obj, key);
    const getter = property && property.get;
    const setter = property && propery.set;

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set: function (newV) {
            const value = getter ? getter.call(obj) : val;
            if (newV === value) return;

            if (setter) {
                setter.call(obj);
            } else {
            }
            dep.notify();
        },
        get: function () {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
            }

            return value;
        }
    });
};
