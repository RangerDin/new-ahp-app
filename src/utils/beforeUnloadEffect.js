import {useEffect} from 'preact/hooks';

const beforeUnloadEffect = (callback, relatedValue) => {
    useEffect(() => {
        window.addEventListener('beforeunload', callback);

        return () => {
            window.removeEventListener('beforeunload', callback);
        };
    }, [relatedValue]);
};

export default beforeUnloadEffect;
