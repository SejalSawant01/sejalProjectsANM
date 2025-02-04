import { useState } from 'react';

export const useSessionStorage = (key, defValue) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.sessionStorage.getItem(key);
            if (value) {
                return value;
            } else {
                window.sessionStorage.setItem(key, defValue);
                return defValue;
            }
        } catch (error) {
            console.log(error);
            return defValue;
        }
    });

    const setValue = (value) => {
        try {
            window.sessionStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
        setStoredValue(value);
    };
    return [storedValue, setValue];
};