const { query } = require("../db")

const getUsers = async () => {
    const { rows } = await query('SELECT * FROM users_tb');
    return rows;
}

const createUser = async (userData) => {

    const { name, email, job, rate, isactive } = userData;

    const { rows } = await query(
        `INSERT INTO users_tb (name, email, job, rate, isactive)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [name, email, job, rate, isactive]
    );


    return rows[0];
}

const updateUser = async (userData, userId) => {
    try {
        const { name, email, job, rate, isactive } = userData;

        const queryText = `
            UPDATE users_tb 
            SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
            WHERE id = $6 
            RETURNING *;
        `;

        const values = [name, email, job, rate, isactive, userId];

        const { rows } = await query(queryText, values);

        if (rows.length === 0) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        return rows[0]; // Return the updated user
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw error;
    }
};


const deleteUser = async (userId) => {
    try {
        const queryText = `DELETE FROM users_tb WHERE id = $1 RETURNING *;`;

        const { rows } = await query(queryText, [userId]);

        if (rows.length === 0) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        return { message: `User with ID ${userId} deleted successfully.` };
    } catch (error) {
        console.error("Error deleting user:", error.message);
        throw error;
    }
};

const searchUsers = async (value) => {
    try {
        const queryText = `
            SELECT * FROM users_tb 
            WHERE name ILIKE $1 
            OR email ILIKE $1 
            OR job ILIKE $1
            OR CAST(rate AS TEXT) ILIKE $1 
            OR CAST(isactive AS TEXT) ILIKE $1
        `;

        const { rows } = await query(queryText, [`%${value}%`]);

        return rows;
    } catch (error) {
        console.error("Error searching users:", error.message);
        throw error;
    }
};



module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
}