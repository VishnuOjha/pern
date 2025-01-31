const express  = require("express")
const cors  = require("cors")
const userRoutes = require("./routes/userRoutes")

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173",  // Allow requests from Vite app
    credentials: true, // Allow cookies/auth headers
}));
app.use(express.json())
app.use("/api", userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})  