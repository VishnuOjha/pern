import React from 'react'
import useGetUsers from '../hooks/useGetUser';
import useUsers from "../hooks/useUser";
import { toast } from 'react-toastify';

const TableList = ({ onOpen}) => {

    const { data: tableData = [], isLoading, error } = useGetUsers();

    const  { deleteUser } = useUsers()
    const handleDeleteUser = async (id) => {
        const res = await deleteUser(id)
        if(res){
            toast.success("Data Delete Successfully")
        }
    }

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;
    return (
        <>
            <div className="overflow-x-auto mt-10 p-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Price</th>
                            <th>Is Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((val, ind) => (
                            <tr key={ind}>
                                <th>{ind + 1}</th>
                                <td>{val?.name}</td>
                                <td>{val?.email}</td>
                                <td>{val?.job}</td>
                                <td>{val?.rate}</td>
                                <td>
                                    <button className={`btn rounded-full w-20 ${val?.isactive ? "btn-primary" : "btn-outline btn-primary"}`}>
                                        {val?.isactive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-secondary' onClick={() => onOpen(val.id)} >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-accent' onClick={() => handleDeleteUser(val.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableList
