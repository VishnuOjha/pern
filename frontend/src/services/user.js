import API from "./Api";

export const fetchUsers = async () => {
    const { data } = await API.get("/users");
    return data;
};


export const addUser = async (user) => {
    const { data } = await API.post("/createuser", user);
    return data;
};

// Update user
export const updateUser = async ({ id, updatedUser }) => {
    const { data } = await API.put(`/updateuser/${id}`, updatedUser);
    return data;
};

// Delete user
export const deleteUser = async (id) => {
    await API.delete(`/deleteuser/${id}`);
}