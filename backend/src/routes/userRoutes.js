const express = require("express")
const { getUsersList, createNewUser,  updateNewUser, userDelete, search } = require("../controllers/userController")

const router = express.Router();


router.get('/users', getUsersList);
router.post('/createuser', createNewUser);
router.put("/updateuser/:id", updateNewUser)
router.delete("/deleteuser/:id", userDelete)
router.get("/search/:data", search)


module.exports = router;