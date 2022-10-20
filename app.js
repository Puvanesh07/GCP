
var gltfsrcValue;
var usdzsrcValue;
var viewerLinkValue;

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const https = require('https');const fs = require('fs');
const { query } = require('express');




//GET home
//app.get('/', (req, res) => {    res.send('Hello Worddfld');});
// we will pass our 'app' to 'https'
//https.createServer({    key: fs.readFileSync('./key.pem'),    cert: fs.readFileSync('./cert.pem'),    passphrase: 'test'}, app).listen(3000);

//const app = express();

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
  });
 
mongoose.connect("mongodb+srv://admin-farha:Test123@interaktivecluster.ixp18.mongodb.net/interaktiveDB?retryWrites=true&w=majority",{useNewUrlParser: true,  useUnifiedTopology: true,});




const modelsSchema = new mongoose.Schema({
  _id : Number,
  model_number: Number,
  api_key: String,
  glb: String,
  usdz: String,
})

const MODEL = mongoose.model("Model", modelsSchema);


app.get("/", function(req,res){
  res.send("Interaktive Viewer is up and running");
})


 app.get("/view", function(req,res){
  
  const projectName = req.query.ProjectName + ".ejs";
  // const url1 = "https://interaktive1.el.r.appspot.com/View";

  // const url2 = req.originalUrl;
  // var source = url1 + url2.substr(20);
  // console.log(source);
  

  
  
  

 
  
  
   MODEL.find({api_key: req.query.ApiKey, model_number: req.query.ModelNumber},{glb:1, usdz:1}, function(err, model){
     //console.log(model);
     //console.log(model.length);

     if (model.length == 0 || err)
      //alert("INVAILD MODEL");
      console.log('invalid model');
     

  
    else{
      // console.log("12345")

       //MODEL.find({_id: model}, ,function(err2, model1){
        // console.log(model1);

        // if(err2)
        //   console.log(err2);
          // else{
            //console.log("265122")
            
            //GLB.find({_id: users,model_number: req.query.ModelNumber},{model_number:1, _id:0} ,function(err2, models){

             model.forEach(function(models){
             gltfsrcValue = models.glb;
             //console.log(gltfsrcValue);
             usdzsrcValue = models.usdz;
             //console.log(usdzsrcValue);
             
          })
           res.render(projectName,{gltfsrc : gltfsrcValue, usdzsrc : usdzsrcValue});
          // res.render("createUserCanvas.ejs",{usdzsrc : usdzsrcValue});
           
            }
          
   
        })
      }
 //}
 )
//})
 






// app.get('/viewer', function (req, res) {

//    USER.find({api_key: req.query.ApiKey},{_id:1}, function(err, users){
//         if (err)
//         console.log(err);
//         else{
//           URL.find({_id: users},{urls:1, _id:0} ,function(err2, urlLinks){
//             if(err2)
//               console.log(err2);
//               else{         
//               urlLinks.forEach(function(urlLink){              
//                  gltfsrcValue = urlLink.urls.get(req.query.UrlKey);       
//                  viewerLinkValue = "https://interaktive-viewer.herokuapp.com/view?ApiKey="+req.query.ApiKey+"&UrlKey="+req.query.UrlKey;
//                })
//                res.render("DogAnimation.ejs",{gltfsrc : gltfsrcValue, viewerLink: viewerLinkValue});
//                 }
               
//               })
//         }
          
//     })
//   })

// app.get("/view", function(req,res){
//  // const projectName = req.query.ProjectName + ".ejs";

  
  
//    MODEL.find({api_key: req.query.ApiKey, model_number: req.query.ModelNumber},{glb:1, usdz:1}, function(err, model){
//     //  console.log(model);
//     //  console.log(model.length);

//      if (model.length == 0 || err)
//       //alert("INVAILD MODEL");
//       console.log('invalid model');
     

  
//     else{
//       // console.log("12345")

//        //MODEL.find({_id: model}, ,function(err2, model1){
//         // console.log(model1);

//         // if(err2)
//         //   console.log(err2);
//           // else{
//             //console.log("265122")
            
//             //GLB.find({_id: users,model_number: req.query.ModelNumber},{model_number:1, _id:0} ,function(err2, models){

//              model.forEach(function(models){
//              gltfsrcValue = models.glb;
//              //console.log(gltfsrcValue);
//              usdzsrcValue = models.usdz;
//              //console.log(usdzsrcValue);
             
//           })
//            res.render("nobutton.ejs",{gltfsrc : gltfsrcValue, usdzsrc : usdzsrcValue});
//           // res.render("createUserCanvas.ejs",{usdzsrc : usdzsrcValue});
           
//             }
          
   
//         })
//       }
//  //}
//  )

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}
//app.listen(port, ()=> console.log("Listening on port from gcloud" +port + __dirname))
https.createServer({    key: fs.readFileSync('./key.pem'),    cert: fs.readFileSync('./cert.pem'),    passphrase: 'test'}, app).listen(port);