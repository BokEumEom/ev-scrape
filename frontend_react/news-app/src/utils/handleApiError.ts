// src/utils/handleApiError.ts
import { ApiError } from '../types';

export const handleApiError = (error: ApiError) => {
    console.error(`Error ${error.statusCode}: ${error.message}`);
    if (error.errors) {
        error.errors.forEach(err => {
            console.error(`Field: ${err.field}, Message: ${err.message}`);
        });
    }
};
