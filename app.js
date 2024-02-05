const express=require("express");
const path=require("path");
const app=express();
const alert=require("alert");
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/contactDance");
const port=80;

var contactSchema=new mongoose.Schema({
    name:String,
    age:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})

var contact=mongoose.model("contact",contactSchema);

app.use("/static",express.static("static"));
app.use(express.urlencoded());


app.set("view engine",'pug');
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    const p={}
    res.status(200).render('home.pug',p);
})
app.get("/contact",(req,res)=>{
    res.status(200).render('contact.pug');
})

app.post("/contact",(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        // res.send("data is saved");
        res.redirect("/");
        // res.status(200).render('home.pug');
    
    }).catch(()=>{
        res.status(400).send("item is not saved in db")
    })
})


app.listen(port,()=>{
    console.log(`app run at port ${port}`);
})
