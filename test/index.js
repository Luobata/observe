import { Observe, observe } from '../src/index';

@observe
class wrap extends Observe {
    constructor() {
        super();
        console.log(this);
        this.height = 1;
        this.weight = 2;
        super.observe(this);
    }

    addHeight() {
        this.height++;
    }
};

class canvas extends Observe {
    constructor() {
        super();
        console.log(this);
        //@observe;
        this.width = 10;
        this.$computed = {
            height: {
                value (data) {
                    return data.wrap.height + 1;
                },
                lazy: false,
            }
        };


        super.observe(this);
    }
    add() {
        console.log(this.height);
        this.width++;
    }
};
class canvasWrap extends Observe {
    constructor() {
        super();
        console.log(this);
        //@observe;

        this.$computed = {
            height: {
                value (data) {
                    return data.wrap.height + 1 + data.canvas.height + data.canvas.width;
                },
                lazy: true,
            },
        };

        super.observe(this);
    }
};

const w = new wrap();
const cw = new canvasWrap();
const c = new canvas();
console.log(cw.height);
w.addHeight();
Observe.getValue();
w.addHeight();
// c.add();

