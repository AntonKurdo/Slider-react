import { useEffect, useRef } from 'react';

export function useKey(key, cb) {
    const callbackRef = useRef(cb);
    useEffect(() => {
        callbackRef.current = cb;
    })
    useEffect(() => {
        function handle(evt) {
            if (evt.code === key) {
                callbackRef.current(evt);
            }
        }
        document.addEventListener('keydown', handle);
        return () => document.removeEventListener('keydown', handle)
    }, [key]);
}