import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import botanistRouter from './routes/botanist.routes.js'
import discussionRouter from './routes/discussion.routes.js'
import productRouter from './routes/product.routes.js'


// adding for testing
app.get("/", (req, res) => {
    return res.status(200).json("Working")
})

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/botanist", botanistRouter)

app.use('/api/v1/discussion', discussionRouter);
app.use('/api/v1/product', productRouter);

export { app }