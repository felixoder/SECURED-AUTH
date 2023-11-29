const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs')
const User = require("./models/User");
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
const app = express();


const secret = 'uefghijweibhwiuefhwejfobjhewfvhiejfvojiewfhvqegduhqidvehfujuvoefjiwehufhekfm'



app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);




app.use(express.json());

async function connection() {
  try {
    mongoose.connect(
      "mongodb+srv://sample3:Emv5PXOLNFsHzlR0@cluster0.np4qlri.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected");
  } catch (err) {
    console.log(err);
  }
}
connection();

app.post("/register", async (req, res) => {
  const { username, password, email, message } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const userDoc = await User.create({ username, password: bcrypt.hashSync( password,salt), email, message });
    console.log(userDoc);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login',async(req,res)=>{
    const{username,password} = req.body;
    const UserDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,UserDoc.password);
    if(passOk){
        //logged In
        jwt.sign({username , id: UserDoc._id},secret ,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id: UserDoc._id,
                username,
            })
        })

    }
    else{
        res.json(400).json('Wrong Credentials');
    }
})


app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})


PORT = 4000;
app.listen(PORT);

//

//Emv5PXOLNFsHzlR0
