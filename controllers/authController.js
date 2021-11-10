const User=require('./../models/userModel');
const catchAsync =require('./../utils/catchAsync');
const jwt=require('jsonwebtoken');
const AppError=require('./../utils/appError');
const util=require('util');

const signToken=id=>{

    return jwt.sign({id},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRES_IN*24*60*1000
    });
}
const createSendToken=(user,statusCode,res)=>{
  const token=signToken(user._id);
//   const cookieOptions={
//     expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*1000*60*24), 
//   };
  if(process.env.NODE_ENV==='production')
  {
      cookieOptions.secure=true;
  }
//   await res.cookie('jwt',token,cookieOptions);
  user.password=undefined;
  
  res.status(statusCode).json({
      status:'success',
      token,
      data:{
          user
      }
  })
};
exports.signup=catchAsync(async(req,res)=>{

    const newUser=await User.create({

        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        phone:req.body.phone,
        address:req.body.address,
        role:req.body.role
    });

    res.status(201).json({
        status:'success',
        data:{
            user:newUser
        }
    })
});

exports.login=catchAsync(async(req,res,next)=>{

    const {email,password}=req.body;
    if(!email || !password)
    {
        return next(new AppError('Please provide email or password',400));
    }
    const user=await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password,user.password)))
    {
        return next(new AppError('Incorrect Password'),400);
    } 

    createSendToken(user,200,res);

});

exports.isLoggedIn=catchAsync(async(req,res,next)=>{

    
    // console.log(user_cookie);
    // if(req.headers.cookie)
    // {
    //     const user_cookie=req.headers.cookie.split('=')[1];
    //     const decoded=await util.promisify(jwt.verify)(user_cookie,process.env.JWT_SECRET);
    //     const currentUser=await User.findById(decoded.id);
    //     if(!currentUser)
    //     {
    //         return next(new AppError('You are not logged in',400));
    //     }
    //    req.user=currentUser;
    //    return next();
    // }
    // next(new AppError('You are not logged in',400));
     let token;
    //  console.log(req.headers.authorization);
    // if(req.headers.bearer)
    // {
    //     token=req.headers.bearer;
    // }
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token=req.headers.authorization.split(' ')[1];
       //  console.log(token);
     }
     console.log(token);
     if(!token)
     {
          return next(new AppError('You are not logged in '),401);
     }
     const decoded=await util.promisify(jwt.verify)(token,process.env.JWT_SECRET);
     const freshUser=await User.findById(decoded.id);
     if(!freshUser)
     {
          return next(new AppError('The user belonging to this token does not exist'),401);
     }
     req.user=freshUser;
     next();
});


exports.resrictTo=(...roles)=>{

    return(req,res,next)=>{

        if(!roles.includes(req.user.role))
        {
            return next(new AppError('You do not have access to perform this action',403));
        }
        next();
    }
}

