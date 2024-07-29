import express from "express";
import cookieParser from "cookie-parser";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
config()



const app = express()

const corsOptions = {
    origin: [
        'http://localhost:5173',
        process.env.FE_URL
    ]  ,
    credentials: true, 
  };

//built in middlewares
app.use(express.json({limit:"16kb"})) // for getting the json data (req.body)
app.use(cookieParser()) // for parsing the cookies
app.use(morgan('dev'))
app.use(cors(corsOptions))



//supabase 
export const supabaseConfig =  {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey:process.env.SUPABASE_ANON_KEY
}
export const supabase = createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);
try {
    if(supabase){
        console.log("supabase connected")
    }
} catch (error) {
    console.log("supabase not connected")
}


//check route
app.get("/" , (req,res)=>{
    res.send("server is healthy and working")
})


//routes
import userRoutes from "./routes/user.route.js";
import todoRoutes from "./routes/todo.route.js";

app.use("/api/v1/" , userRoutes)
app.use("/api/v1/todos" , todoRoutes)









export default app