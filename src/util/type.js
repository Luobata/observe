import { has } from './help';

export const isNum = val => Object.prototype.toString.call(val) === '[object Number]';

export const isStr = val => Object.prototype.toString.call(val) === '[object String]';

export const isObj = val => Object.prototype.toString.call(val) === '[object Object]';

export const isArr = val => Object.prototype.toString.call(val) === '[object Array]';

export const isFun = val => Object.prototype.toString.call(val) === '[object Function]';

export const isEmptyObj = (obj) => {
    if (!isObj(obj)) return false;

    let flag = false;

    for (const i in obj) {
        if (!has(obj, i)) continue;
        flag = true;
        break;
    }

    return flag;
};

export const getChineseLength = (str) => {
    if (str == null) return 0;
    if (typeof str !== 'string') {
        str += '';
    }
    const min = /\\x00/;
    const max = /\\xff/;
    const regrex = new RegExp(`/[^${min}-${max}]/g`);
    // const regrex = new RegExp(pattern);

    return str.replace(regrex, '01').length / 2;
};

export const isFalse = val => val === false;
