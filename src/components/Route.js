import { useEffect, useState } from 'react';

const Route = ({path, children}) => {
    const [currentPath, setCurrenntPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrenntPath(window.location.pathname);
        }
        window.addEventListener('popstate', onLocationChange);

        return () =>  window.removeEventListener('popstate', onLocationChange);
    }, [])

    return currentPath === path ? children : null;
}

export default Route;