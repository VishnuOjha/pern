import { useState } from 'react'
import './App.css'
import ModalForm from './component/ModalForm'
import Navbar from './component/Navbar'
import TableList from './component/TableList'
import { toast, ToastContainer } from 'react-toastify';
import API from './services/Api'
import useUsers from "./hooks/useUser";

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [id, setId] = useState()
  const { addUser, updateUser } = useUsers()


  const handleOpen = (mode, id) => {
    setIsOpen(true)
    setModalMode(mode)
    setId(id)
  }

  const handleModalOpen = () => {
    setModalMode("add")
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (data) => {
    console.log("DATA", data)

    const errors = {
      name: !data.name?.trim() && "Name is required",
      email: (!data.email?.trim() || !data.email.includes("@")) && "Valid email is required",
      job: !data.job?.trim() && "Job is required",
      price: ((!data.price || isNaN(data.price) || Number(data.price)) <= 0) && "Valid price is required",
  };

  const errorMsg = Object.values(errors).find(Boolean);
  if (errorMsg) return toast.error(errorMsg);

    if (modalMode === "add") {
      try {

        const response = await addUser(data)
        console.log("create", response?.data)
        if (response?.data) {
          toast.success("User created successfully")
        }

      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await updateUser({
          id: id,
          updatedUser: data
        })
        if (response?.data) {
          toast.success("User created successfully")
        }

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Navbar onOpen={() => handleOpen("add")} />
      <TableList onOpen={(id) => handleOpen("edit", id)} />
      <ModalForm isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} mode={modalMode} id={id} />
    </>
  )
}

export default App
