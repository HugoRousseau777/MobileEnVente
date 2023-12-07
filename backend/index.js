const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Products");
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';

app.use(express.json()); // Middleware
app.use(cors()); // Middleware


app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  /*result = result.toObject(); // Allows to do line bellow
  delete result.password;*/
  /*Jwt Add*/ 
  Jwt.sign({result}, jwtKey, {expiresIn : "2h"}, (err, token) => {
    if (err) {
      res.send("Something went wrong");
    }
    res.send({result, auth: token});
  })
});

app.post("/login",  async (req, res) => {
      if (req.body.email && req.body.password){
        let user = await User.findOne(req.body) //.select("-password") Means the password isnt included in user // !! Attention à value qui n'existe pas dans cette logique !! Perdu 3J sur req.body.value !!!!!
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token) => {
              if (err) {
                res.status(200).send({result:"Something went wrong !"});
              }
              res.status(200).send({user, auth:token});
            })
          } else {
            res.status(200).send({ result: "No user found" });
          }
      } else {
          res.status(200).send("Email or password lacking");
      }
  });

app.post("/add-product", verifyToken, async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
   res.send(result);
});

app.get("/products", verifyToken, async (req,res)=>{
  const products = await Product.find();
  if(products.length>0){
    res.send(products);
  } else {
    res.send({result:"No products !"})
  }
})

app.delete("/product/:id", verifyToken, async (req, res)=> {
  let result = await Product.deleteOne({_id: req.params.id});
  res.send(result);
})



app.put("/product/:id", verifyToken, async(req, res) => {
  let result = await Product.updateOne(
    {_id: req.params.id},
    {$set: req.body}
  )
  res.send(result);
})

app.get("/product/:id", verifyToken, async (req, res)=> {
  let result = await Product.findOne({_id:req.params.id})
  if(result){
    res.send(result);
  } else {
    res.send({"result": "No record found !"}); // Error: socket hang up instead !

  }
})

app.get("/search/:key", verifyToken, async (req, res)=> {
  let result = await Product.find({
    "$or": [
      {
        name: {$regex: req.params.key}
      },
      {
        company: {$regex: req.params.key}
      },
      {
        category: {$regex: req.params.key}
      }
    ]
  });
  res.send(result);
});

function verifyToken(req,res,next){
  console.warn(req.headers['authorization']); // warn works in VS terminal
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid)=> {
      if(err){
        res.status(401).send('Please provide a valid token');
      } else {
        next(); // Allows to get out of the middleware and execute rect of function it's called in

      }
    });
  } else {
    res.status(403).send('Please provide a token');
  }
}

app.listen(5000);
