import express from "express";
import redis,{createClient} from "redis";
import dotenv from "dotenv"
dotenv.config()

const app=express();
const client=createClient({
    url:process.env.REDIS_URL
});

client.on("error",(err)=> console.error("error connecting redis",err))
await client.connect();


app.use(express.json());

app.post("/submission", async(req,res)=>{
    const userId=req.body.userId;
    const question=req.body.question;
    const  code=req.body.code;
    const language=req.body.language;

    client.lPush("problems", JSON.stringify({userId,question,code,language}));

    res.json({
        message:"Processing",
        
    })

})

app.get("/submission/:submissionId", async(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})