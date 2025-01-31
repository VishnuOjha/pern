const { getUsers, createUser, updateUser, deleteUser, searchUsers } = require("../services/userServices")

const getUsersList = async (req, res) => {

    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createNewUser = async (req, res) => {
    try {
        const clientGetData = req.body;
        const clientData = await createUser(clientGetData);
        res.status(201).json(clientData)
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateNewUser = async (req, res) => {

    try {
        const clientId = req.params.id
        console.log("IDD", clientId)
        const clientUpdatedData = req.body;
        const clientData = await updateUser(clientUpdatedData,clientId);
        res.status(201).json(clientData)
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const userDelete = async(req, res) => {

    try{
        const clientId = req.params.id

        const deletedClient = await deleteUser(clientId)

        res.status(200).json({
            message: "Deleted Data SuccessFully"
        })
    }catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const search = async (req, res) => {
    try {
        const { searchTerm } = req.query; // Use query params for search

        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        const searchResult = await searchUsers(searchTerm);

        res.status(200).json({
            message: "Data searched successfully",
            data: searchResult
        });

    } catch (error) {
        console.error("Error searching data:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getUsersList,
    createNewUser,
    updateNewUser,
    userDelete,
    search
}