import app from "./app.js";
import { connectToDb } from "./config/db.js";





const port = process.env.PORT || 5000



connectToDb()
app.listen(port , ()=>{
    console.log(`Server is Listening on ${port}`);
})
