import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        const errorHandler = (error, errorInfo) => {
            setHasError(true);
            setError(error);
            setErrorInfo(errorInfo);
        };

        window.addEventListener('error', errorHandler);
        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    if (hasError) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-lg mx-auto p-10 bg-white rounded shadow text-center">
                    <h2 className="text-2xl font-bold mb-4">Oops, something went wrong. Please try again</h2>
                </div>
            </div>
        );
    }
    return children;
};

export default ErrorBoundary;
