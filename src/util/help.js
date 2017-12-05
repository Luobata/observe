import {
    isObj,
    isArr,
} from './type';

export const has = (obj, key) => ({}.hasOwnProperty.call(obj, key));

export const hasValue = (arr, key, value) => {
    if (!isObj(arr) && !isArr(arr)) return false;

    if (isArr(arr)) {
        for (const i of arr) {
            if (i[key] === value) {
                return i;
            }
        }
    }

    if (isObj(arr)) {
        if (arr[key] === value) return arr[key];
    }

    return false;
};

export const noop = () => {};
