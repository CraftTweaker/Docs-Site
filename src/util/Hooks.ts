import { useEffect, useState } from "react";

// https://usehooks.com/useLocalStorage/
export function useLocalStorage(key: string, initialValue: string, json = false): [string, (value: unknown) => void] {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = typeof window !== "undefined" ? window.localStorage.getItem(key) : undefined;
            // Parse stored json or if none return initialValue
            return item ? (json ? JSON.parse(item) : item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: unknown) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            typeof window !== "undefined" && window.localStorage.setItem(key, json ? JSON.stringify(valueToStore) : valueToStore);
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

export function matchesMedia(query: string): boolean {
    const mediaQuery = window.matchMedia(query);
    const getValue = () => {
        return mediaQuery.matches;
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(getValue);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
        () => {
            const handler = () => setValue(getValue);
            mediaQuery.addListener(handler);
            return () => mediaQuery.removeListener(handler);
        },
        []
    );

    return value;
}