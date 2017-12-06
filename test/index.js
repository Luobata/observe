import { Observe, observe } from '../src/index';

@observe
class wrap extends Observe {
    constructor() {
        super();
        console.log(this);
        this.height = 1;
        super.observe(this);
    }
};

class canvas extends Observe {
    constructor() {
        super();
        console.log(this);
        //@observe;

        this.$computed = {
            height (data) {
                return data.wrap.height + 1;
            }
        };

        super.observe(this);
    }
};

new wrap();
new canvas();
