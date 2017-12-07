import type Watcher from './watcher';

let uid = 0;

export default class Dep {
    watcher: Array<Watcher>;
    uid: Number;

    constructor() {
        this.watcher = [];
        this.uid = uid++;
    };

    depend() {
        if (Dep.target) {
            Dep.target.addDepend(this);
        }
    }
    
    addWatcher(watcher: Watcher) {
        this.watcher.push(watcher);
    }

    removeWatcher(watcher) {
        for (let i = 0; i < this.watcher.length;) {
            if (this.watcher[i] === watcher) {
                this.watcher.splice(i, 1);
            } else {
                i++;
            }
        }
    }

    notify() {
        for (let i = 0; i < this.watcher.length; i++) {
            this.watcher[i].update();
        }
    }
};

Dep.target = null;

const targetStack = [];

export const pushTarget = (
    target: Watcher
) => {
    if (Dep.target) {
        targetStack.push(Dep.target);
    }

    Dep.target = target;
};

export const popTarget = () => {
    Dep.target = targetStack.pop();
};
