import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import asyncHandler from './asyncHandler'

// will check if the token is valid for login and logout 
const authenticate = asyncHandler(async(req,res, next)=> {
  //* will read the JWT from the 'jwt cookie'
  let token ;
  token = req.cookie.jwt

  if(token){
    try {
      const decoded =jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next();
    } catch (error) {
      res.status(401)
      throw new Error("not authorized, token failed")
    }
  }else{
    res.status(401)
    throw new Error("not authorized,no token ")

  }
})

// check for admin ?

const authorizeAdmin = (req,res, next)=>{
  if(req.user && req.user.isAdmin){
    next()
  }
  else
  {
    res.status(401).send("not authorized as annn admin")
  }
}

export {authenticate,authorizeAdmin};
