import Dep, {
    pushTarget,
    popTarget,
} from './dep';

export default class Watcher {
    model: Object;
    target: Object;
    deps: Array<Dep>;
    newDeps: Array<Dep>;
    depIds: Set;
    newDepIds: Set;
    expression: String;
    getter: Function;

    constructor(
        getter: Function,
        model: Object,
        name: String,
        lazy: Boolean,
    ) {
        this.model = model;
        this.target = model[name];
        this.lazy = lazy;
        this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.expression = getter.toString();
        this.getter = getter;

        if (!this.lazy) this.value = this.get();
    };

    get() {
        // 依赖收集
        pushTarget(this);
        const value = this.getter.call(this.target, this.model);
        popTarget();
        this.cleanDeps();

        return value;
    }

    cleanDeps() {
        for (let i = 0; i < this.deps.length; i++) {
            if (!this.newDepIds.has(this.deps[i].id)) {
                this.deps[i].removeWatcher(this);
            }
        }

        // 交换depIds 和newDepIds
        let tmp;
        tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();

        // 交换deps 和newDeps
        tmp = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp;
        this.newDeps.length = 0;
    };

    evaluate() {
    }

    update() {
        this.value = this.getter.call(this.target, this.model);
    };

    addDepend(dep: Dep) {
        const id = dep.uid;

        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addWatcher(this);
            }
        }
    };

    depend () {
        for (let i = 0; i < this.deps.length; i++) {
            this.deps[i].depend();
        }
    }
};
