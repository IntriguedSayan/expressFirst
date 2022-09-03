const express=require("express")
const fs=require("fs")


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const todos=parsedData.todos
    res.send(todos)
})
app.post("/",(req,res)=>{
    const payload=req.body
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const todos=parsedData.todos
    const newData=[...todos,payload]
    parsedData.todos=newData
    const latestData=JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",latestData,"utf-8")
    res.send(newData)
})
app.delete("/:todoId",(req,res)=>{
    console.log(req.params)
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const todos=parsedData.todos
    const foundData=todos.find((elem)=>elem.id===Number(req.params.todoId))
    const index=todos.indexOf(foundData)
    todos.splice(index,1)
    parsedData.todos=todos
    const latestData=JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",latestData,"utf-8")
    res.send("Data deleted")
})
app.put("/:todoId",(req,res)=>{
    const payload=req.body
    console.log(req.params)
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const todos=parsedData.todos
    const foundData=todos.find((elem)=>elem.id===Number(req.params.todoId))
    const index=todos.indexOf(foundData)
    todos[index]=payload
    parsedData.todos=todos
    const latestData=JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",latestData,"utf-8")
    res.send("Data replaced")
})




app.listen(8001,()=>{
    console.log("Listening to port 8001");
})