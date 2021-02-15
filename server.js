/*
Reference:
https://www.google.com/search?rlz=1C1RLNS_enIN773IN773&sxsrf=ALeKk02nszPky_GeCD5LLUptMQdm00TXRg%3A1613237148458&ei=nAsoYNvDG4L7z7sPho2c0A8&q=how+to+insert+data+into+mongodb+using+mongoose+from+html&oq=how+to+insert+data+into+mongodb+using+mongoose+from+html&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEM0CMgUIABDNAjoHCAAQRxCwAzoGCAAQFhAeOggIIRAWEB0QHjoFCCEQoAE6BwghEAoQoAE6BAghEBVQtuYHWJH-B2CtgAhoAXACeACAAc4JiAGRGJIBCTAuNy4zLjctMZgBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwjbgbDZsOfuAhWC_XMBHYYGB_oQ4dUDCA0&uact=5

https://codeburst.io/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073

//CRUD code
https://www.geeksforgeeks.org/nodejs-crud-operations-using-mongoose-and-mongodb-atlas/

How to show data retreived from database inside the texfiled
https://steemit.com/utopian-io/@prodicode/how-to-use-ejs-displaying-data-from-nodejs-in-html

Show fetched data from database in the table:
https://www.google.com/search?sxsrf=ALeKk01o4xtolLZRCOrS-LIOC0kkWnZ_Vg%3A1613282736118&source=hp&ei=sL0oYLnpBMSpmgeMwKDQCg&iflsig=AINFCbYAAAAAYCjLwAeGksMYpINs9qaN_ij7KrYhniiG&q=how+to+show+retrieve+data+from+mongoose+in+table+using+node.js&oq=how+to+show+retrieve+data+from+mongoose+in+table+using+node.js&gs_lcp=Cgdnd3Mtd2l6EAM6CAghEBYQHRAeOgUIIRCgAToECCEQFToHCCEQChCgAVDLlTJYm4I2YLSDNmgAcAB4AYABkAOIAbo6kgEKMC4yMi44LjUuMZgBH6ABAaoBB2d3cy13aXo&sclient=gws-wiz&ved=0ahUKEwi5gaDD2ujuAhXElOYKHQwgCKoQ4dUDCAc&uact=5
https://stackoverflow.com/questions/56215465/how-to-fetch-data-from-mongodb-and-display-it-in-a-table-using-node-js

*/

//Import express
const express = require('express');

//Import body-parser
const bodyParser = require('body-parser');

//Import mongoose
const mongoose =require("mongoose");



//Make express object
const app = express();

//Set view engine to ejs
app.set("view engine", "ejs");

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views"); 


app.use(bodyParser.urlencoded({extended:true}));

//Port Number
const port = 3000;


let content = "CRUD FUNCTIONALITY BY SHIVAM SINGHAL";

//Used to send file

//First Page of Website
app.get('/', (req, res) => {
    res.render("index",{content:content});
  })

//Create Page of Website
app.post('/create', (req, res) => {
    res.render("login");
  })

//Search Page of Website
app.post('/search', (req, res) => {
    res.render("search");
  })

//Read-All Page of Website
app.post('/readall', (req, res) => {
    res.render("readall");
  })

//Update Page of Website
app.post('/update', (req, res) => {
    res.render("update");
  })

//Delete Page of Website
app.post('/delete', (req, res) => {
    res.render("delete");
  })



//Used to start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })

//Making Connection with Server
 mongoose.connect("mongodb://localhost:27017/login",{useNewUrlParser:true},(error)=>{
     if(!error)
    {
        console.log("Database Connection is successful");
    }
    else
    {
        console.log("Error connecting to database");   
    }
});

//mongoose.set('useFindAndModify', false);

//Making Connection variable for further use
const connection = mongoose.connection;

//Creating Schema for Database
let loginSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:"Required"
        },
        password:{
            type:String
        }
    }
);

//Creating Document in Database
let loginmodel = mongoose.model("btechs",loginSchema)

//To add data

app.post("/loggedin", (req, res) => {
    var myData = new loginmodel(req.body);
    myData.save().then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

//To Read-By-Id data

app.post("/searched", (req, res) => {
    loginmodel.findOne({username:req.body.username},(err,data)=>{
        if(err)
        {
            console.log("Data can not be readed")
        }
        else
        {
            let uname=data.username;
            let pword=data.password;
           res.render("searched",{uname:uname,pword:pword});
           //res.send(data);
        }
    });
});

let id=0;
//Update-find Page of Website
app.post('/updatefind',(req,res)=>{
    loginmodel.findOne({username:req.body.username},(err,data)=>{
        if(err)
        {
            console.log("Data can not be readed")
        }
        else
        {
            id=data._id;
            let uname=data.username;
            let pword=data.password;
            console.log(id);
           res.render("updatefind",{uname:uname,pword:pword});
           //res.send(data);
        }
    });
})

app.post("/updated",(req,res)=>{
    console.log("=>: "+req.body.username);
    let value = req.body.username.String;
    console.log(typeof(value));
    loginmodel.findByIdAndUpdate(id,{password:req.body.password},(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send("Updated Successfully");
        }
    });
});

//To Read-All data

app.post("/readedall", (req, res) => {
    loginmodel.find((err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("readedall",{details:data});
        }
    }
    );
});

//To delete data

app.post("/deleted", (req, res) => {
    loginmodel.remove({username:req.body.username},(err,data)=>{
        if(err)
        {
            console.log("Delete failed");
        }
        else{
            res.send("Deleted Successfully");
        }
    });
});