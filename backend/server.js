import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())
app.use(cors())

//db config
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
// }, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("DB Connected")
//     }
// })

const connectDB = async () => {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in .env");
      }
  
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log(`✅ Connected to MongoDB`);
    } catch (error) {
      console.error(`❌ Database connection error: ${error.message}`);
      process.exit(1);
    }
  };
  
  connectDB();

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))