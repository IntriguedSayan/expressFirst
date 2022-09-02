const express=require("express")
const fs=require('fs')

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{        //method+route
    res.send("welcome")
})
app.get("/about",(req,res)=>{
    res.send("about")               //method+route
})
app.get("/profile/:name",(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
    // const {name,age}=req.query
    // const status=Number(age)>=18?"eligibel":"Not Eeligible"
    // res.send("welcome "+req.query.name+" "+status)
    const {name}=req.params
    res.send("Welcome "+ name)
})
app.get("/products",(req,res)=>{
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const products=parsedData.Products
    res.send(products)
})
app.post("/addDetails",(req,res)=>{

    console.log(req.body);
    res.send("Thanks")
})
app.post("/products/create",(req,res)=>{
    const payload=req.body
    const data=fs.readFileSync("./db.json",{encoding:"utf-8"})
    const parsedData=JSON.parse(data)
    const products=parsedData.Products
    // products.push(JSON.parse(payload))
            //or,
    const newProducts=[...products,payload]
    parsedData.Products=newProducts
    const latestData=JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",latestData,"utf-8")
    res.send("product created")

})

app.listen(7000,()=>{
    console.log("Listening on port 7000");
})