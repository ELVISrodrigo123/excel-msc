import { AreaForeman } from "../models/AreaForeman";

const API_URL = "http://127.0.0.1:8000/api/area-foremen/";

export const getAreaForemen = async (): Promise<AreaForeman[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error fetching area foremen");
    }
    return await response.json();
};

export const createAreaForeman = async (areaForeman: AreaForeman): Promise<AreaForeman> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(areaForeman),
    });
    if (!response.ok) {
        throw new Error("Error creating area foreman");
    }
    return await response.json();
};
