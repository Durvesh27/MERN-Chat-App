import  express  from "express"

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
res.send("Code running")
})

app.listen(5000,()=>{
console.log("App running on port 5000")
})