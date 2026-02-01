import React, { useState, useEffect } from 'react';

const ConnectivityStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) return null; // Only show when offline (or change to show always if preferred)

    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            background: 'var(--danger-color)',
            color: 'white',
            textAlign: 'center',
            padding: '0.5rem',
            fontWeight: 'bold',
            zIndex: 1000
        }}>
            You are currently offline. Tasks will be saved locally.
        </div>
    );
};

export default ConnectivityStatus;
