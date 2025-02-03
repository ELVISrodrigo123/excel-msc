// services/shiftManagerService.ts
import { ShiftManager } from '../models/ShiftManager';

const API_URL = 'http://127.0.0.1:8000/api/shift-managers/';

export const getShiftManagers = async (): Promise<ShiftManager[]> => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

export const createShiftManager = async (shiftManager: ShiftManager): Promise<ShiftManager> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(shiftManager),
    });
    const data = await response.json();
    return data;
};
