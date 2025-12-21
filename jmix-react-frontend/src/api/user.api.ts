import { http } from "./http";
import type { User } from "./types";

const RESOURCE = "/rest/entities/User";

/**
 * Get single user
 */
export const getUser = async (id: string): Promise<User> => {
    console.log("🟢 getUser CALLED with id:", id);

    const response = await http.get<User>(`${RESOURCE}/${id}`);

    console.log("🟢 getUser RESPONSE:", response);
    console.log("🟢 getUser RESPONSE.DATA:", response.data);

    return response.data;
};

/**
 * Get list user
 */
export const getListUser = async (): Promise<User[]> => {
    console.log("🟢 getListUser CALLED");

    const response = await http.get<User[]>(RESOURCE);

    console.log("🟢 getListUser RESPONSE:", response);
    console.log("🟢 getListUser RESPONSE.DATA:", response.data);
    console.log("🟢 getListUser DATA TYPE:", typeof response.data);
    console.log("🟢 getListUser IS ARRAY:", Array.isArray(response.data));

    return response.data;
};
