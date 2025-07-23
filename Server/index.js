import express from 'express';
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import  ProfileRouter  from './Routes/ProfileRoute.js';
import  jwt  from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter);
app.use('/profile', ProfileRouter);
app.use(express.static('public')); 


const varifyuser = (req,res,next) => {
  const token = req.cookies.token;
  if(token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) 
        return res.json({Status: false, Error:"Token Expired"})
     req.id = decoded.id;
     req. role = decoded.role;
     next();
    })



  }else{
    return res.json({status:false, message:"Not Authorized"})
  }

}
app.get('/varify', varifyuser,(req,res) => {

  return res.json({Status: true, role: req.role , id: req.id})

})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
})