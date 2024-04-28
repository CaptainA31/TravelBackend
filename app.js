const express = require("express");
const app = express();
const mongoose = require("mongoose")
app.use(express.json());

const mongoUrl = "mongodb+srv://zahidanas12345:admin@cluster0.yejlb4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => {
        console.log(e);
    });
require("./UserDetail")

const User = mongoose.model("UserInfo")
app.get("/", (req, res)=>{
    res.send({status: "Started"})
})

app.post('/register', async(req, res) => {
    const {name, email, mobile, password} = req.body;
    const oldUser = await User.findOne({email:email});

    if(oldUser){
        return res.send({data: "User alredy exists"});
    }

    try {
        await User.create({
            name,
            email,
            mobile,
            password
        })
        res.send({status: "ok", data: "User Created"})
    } catch (error) {
        res.send({status: "error", data: error})
    }
});

app.post("/login-user", async(req, res)=> {
    const {email, password} = req.body;
    const oldUser = await User.findOne({email:email})

    if(!oldUser){
        return res.send({data: "User not exists"})
    }
    if(oldUser.password === password){
        return res.send({data: "Login Successfull"})
    }
    res.send({data: "Login Failed"})
})

app.post("/userdata", async (req, res) => {
    const { email } = req.body;
    try {
        const userData = await User.findOne({ email: email });
        if (userData) {
            console.log(userData);
            return res.send({ status: "ok", data: userData });
        } else {
            return res.send({ status: "error", data: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: "error", data: error });
    }
});
s

app.listen(5001, ()=>{
    console.log("Server started");
})