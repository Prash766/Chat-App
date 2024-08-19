import express from "express"
import cors from "cors"

const app= express()


app.use(cors())

app.use(express.json())

app.get('/' , (req, res)=>{
    res.send("<h1>HEY THERE </h1>")
})


app.listen(process.env.PORT, ()=>{
    console.log(`The server is running on ${process.env.PORT} `)
})
