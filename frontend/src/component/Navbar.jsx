import useSearch from "../hooks/useSearch";

export default function Navbar({ onOpen }) {

    const fetchUsers = async (query) => {
        const { data } = await API.get(`/api/users?search=${query}`);
        return data;
    };

    const { query, results, isLoading, error, onSearch } = useSearch(fetchUsers);
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">PERN</a>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={(e) => onSearch(e.target.value)}
                        className="input input-bordered w-48 md:w-auto"
                    />
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    <ul>
                        {results.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-primary" onClick={onOpen}>Add User</a>
                </div>
            </div>
        </>
    )
}