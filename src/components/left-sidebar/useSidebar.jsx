// useSidebar.js
import { useState, useEffect } from 'react';

const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return [isOpen, setIsOpen];
};

export default useSidebar;