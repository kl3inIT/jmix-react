import { http } from "./http";
import type { User } from "./types";

const RESOURCE = "/rest/entities/User";

export const getUser = async (id: string): Promise<User> => {
    const response = await http.get<User>(`${RESOURCE}/${id}`);
    return response.data;
};

export const getListUser = async (): Promise<User[]> => {
    const response = await http.get<User[]>(RESOURCE);
    return response.data;
};
