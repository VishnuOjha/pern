import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser, updateUser, deleteUser, fetchUsers } from "../services/user";

const useUsers = () => {
    const queryClient = useQueryClient();


    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    // Add User Mutation
    const addUserMutation = useMutation({
        mutationFn: addUser, // Assuming addUser is a function returning the newly created user
        onSuccess: (newUser) => {
            queryClient.setQueryData(["users"], (oldUsers = []) => {
                return [...oldUsers, newUser]; // Add the new user to the existing list of users
            });
            queryClient.invalidateQueries(["users"]); // Optionally re-fetch the users if needed
        },
        onError: (error) => {
            console.error("Error adding user:", error);
            // Handle error accordingly
        },
        onSettled: () => {
            // This can be used to invalidate or refetch queries after mutation is completed
            queryClient.invalidateQueries(["users"]);
        }
    });

    // Update User Mutation
    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });

    // Delete User Mutation
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (id) => {
            queryClient.setQueryData(["users"], (oldUsers) =>
                oldUsers.filter((user) => user.id !== id)
            );
            queryClient.invalidateQueries(["users"]);
        },
    });

    return {
        addUser: addUserMutation.mutate,
        updateUser: updateUserMutation.mutate,
        deleteUser: deleteUserMutation.mutate,
    };
};

export default useUsers;
