import { http } from "./http";

export type User = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    active: boolean;
};

const RESOURCE = "/rest/entities/ad_User";

export const getUsers = async (): Promise<User[]> => {
    const res = await http.get<User[]>(RESOURCE);
    return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const res = await http.get<User>(`${RESOURCE}/${id}`);
    return res.data;
};
