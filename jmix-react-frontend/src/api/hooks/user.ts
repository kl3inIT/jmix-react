import { useQuery } from "@tanstack/react-query";
import { getUser, getListUser } from "@/api/user.api";

export const userKeys = {
    all: ["users"] as const,
    detail: (id: string) => [...userKeys.all, id] as const,
};

export const useGetListUser = () => {
    return useQuery({
        queryKey: userKeys.all,
        queryFn: getListUser,
    });
};

export const useGetUser = (userId: string) => {
    return useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => getUser(userId),
        enabled: !!userId,
    });
};
