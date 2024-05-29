// src/hooks/useCustomErrorHandler.ts
import { toast } from 'react-toastify';
import { ApiError } from '@/types';

const useCustomErrorHandler = () => {
    const handleError = (error: ApiError) => {
        const generalMessage = `Error: ${error.message}`;
        toast.error(generalMessage);

        if (error.errors) {
            error.errors.forEach(err => {
                toast.error(`Field Error - ${err.field}: ${err.message}`);
            });
        }

        // Example of logging to an external monitoring service
        if (process.env.NODE_ENV === 'production') {
            logErrorToMonitoringService(error);
        }
    };

    return { handleError };
};

export default useCustomErrorHandler;

function logErrorToMonitoringService(error: ApiError) {
    // Assuming you have some kind of external logging mechanism
    console.log("Logging error to external service:", error);
}
