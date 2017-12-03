import { Observe } from '../src/index';

const class wrap extends Observe {
    constructor() {
        console.log(this);
        this.height = 1;
    }
};

const class canvas extends Observe {
    constructor() {
        console.log(this);
        //@observe;

        this.$computed = {
            height () {
                return super.wrap.height + 1;
            }
        };
    }
}:
