import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config()
const client=createClient({
    url: process.env.REDIS_URL
})
client.on("error",err=>console.error("error connecting reddis ",err))
client.connect()
    .then(async ()=>{
        while(1){
        const response=await client.rPop("problems")
        if(!response){
            await new Promise((r)=> setTimeout(r,1000));
            continue
        }
        const parsedlanguage=JSON.parse(response)
        const code=parsedlanguage.code
        const language=parsedlanguage.language

        if(language==="c++"){
            console.log("Running c++")
            await new Promise((r)=> setTimeout(r,5000))

        }
        // update  database

    }
    })