import {useRef, useEffect} from 'preact/hooks';

const usePageSynchronizationBlock = (callback, isSynchronized) => {
    const ref = useRef();

    useEffect(() => {
        if (!isSynchronized) {
            const destructor = callback();

            ref.unblock = destructor;
            return;
        }

        if (ref.unblock) {
            ref.unblock();
        }
    }, [isSynchronized]);

    useEffect(
        () => () => {
            if (ref.unblock) {
                ref.unblock();
            }
        },
        []
    );
};

export default usePageSynchronizationBlock;
