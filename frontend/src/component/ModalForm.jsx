import React, { useEffect, useState } from 'react'
import useGetUsers from '../hooks/useGetUser'

const ModalForm = ({ isOpen, onClose, mode, onSubmit, id }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [job, setJob] = useState("")
    const [price, setPrice] = useState("")
    const [active, setActive] = useState(false)
    const { data: tableData = [], isLoading, error } = useGetUsers();

    const handleStatusChange = (e) => {
        setActive(e.target.value === 'Active')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = {
                name, email, job, rate: Number(price), isactive: active
            }
            console.log("DATAAA", userData)
            await onSubmit(userData)
        } catch (error) {
            console.log("ERROR", error)
        }
        onClose()
    }

    const userData = tableData.filter((val) => val.id === id);

    useEffect(() => {
        if (mode === "edit" && userData?.length) {
            setName(userData[0]?.name)
            setEmail(userData[0]?.email)
            setJob(userData[0]?.job)
            setPrice(userData[0]?.rate)
            setActive(userData[0]?.isactive)
        } else {
            setName("")
            setEmail("")
            setJob("")
            setPrice("")
            setActive(false)
        }
    }, [mode, isOpen])


    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className='font-bold text-lg py-4'> {mode === "edit" ? "Edit User" : "User Details"}</h3>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Daisy" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Email
                            <input type="email" className="grow" placeholder="Daisy" value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Job
                            <input type="text" className="grow" placeholder="Daisy" value={job} onChange={e => setJob(e.target.value)} />
                        </label>

                        <div className='flex mb-4 justify-between'>
                            <label className="input input-bordered my-4 flex items-center mr-4">
                                Rate
                                <input type="number" className="grow mx-2" placeholder="Daisy" value={price} onChange={e => setPrice(e.target.value)} />
                            </label>
                            <select className="select input-bordered w-full max-w-xs my-4" value={active ? "Active" : "Inactive"} onChange={handleStatusChange}>
                                <option>Active</option>
                                <option>Inactive</option>

                            </select>
                        </div>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                        <button className="btn btn-success ">{mode === "edit" ? "Save Changes" : "Add User"}</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default ModalForm