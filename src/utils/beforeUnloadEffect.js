import {useEffect} from 'preact/hooks';

const beforeUnloadEffect = (callback) => {
    useEffect(() => {
        window.addEventListener('beforeunload', callback);

        return () => {
            window.removeEventListener('beforeunload', callback);
        };
    }, []);
};

export default beforeUnloadEffect;
