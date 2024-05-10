const express = require('express')  
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const postModel = require('../models/post')
const path= require('path')
const multer  = require('multer')

router.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname)
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage: storage })


router.use(express.static(path.join(__dirname,'public')))


router.post('/signup',async(req,res)=>{
    const {username , email, password} = req.body;

   const user = await User.findOne({email})
    if(user){
        return res.json({message:'user already exist'})
    }

    const hasspassword = await bcrypt.hash(password , 10)
    const newUser = new User({
        username,
         email,
        password:hasspassword,
    })

    await newUser.save()
    return res.json({ status:true, message:'record registed'})
})

router.post('/login',async(req,res)=>{
    const {  email, password} = req.body;

    const user = await User.findOne({email})
    
    if( !user ){
        return res.json({message:'user not exist'})
    }
    
    const validPassword = await bcrypt.compare(password , user.password)
    if(!validPassword){
        return res.json({message:'incorrect passsword'})
    }
    const token = jwt.sign({username : user.username } , 'secreactkey')
    res.cookie('token',token)
    
    
    return res.json({ status:true, message:'login sucessfully'})
})

router.post('/logout',async(req,res)=>{
    const {  detaills } = req.body;
    const user = await User.findOne({email:detaills.email})
    res.cookie('token','')
    return res.json({ status:true})
     
})

router.post('/profile',isLoggedIn ,async(req, res)=>{
    let findUser = await User.findOne({username:req.user.username}).populate('posts')
  
    if(findUser) return res.json({ status:true,findUser ,  message:'found user'})
     return res.json({message:' not found user',isLoggedIn})
})

router.post('/post',isLoggedIn ,async(req, res)=>{


    let {content , detaills } =req.body
    let user = await User.findOne({email:detaills.email}).populate('posts')
    
    let post = await postModel.create({
        user:user._id,
        content
    })
    user.posts.push((post._id))
    await user.save()
     
    if(post) return res.json({ status:true,user, isLoggedIn, message:'found user'})
     return res.json({message:'not uplode post ',isLoggedIn})
})
router.post('/upload/:id',isLoggedIn ,upload.single('file'),async(req, res)=>{
    
    const  {id} = req.params
    
    let user  =await User.findOne({email:id})
     
    user.profilePic = req.file.filename
    await user.save()


   if(user.profilePic) return res.json({ status:true})
     
})

router.get('/getimage' , async(req,res)=>{
    await User.findOne()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
function isLoggedIn(req, res, next) {
    if (!req.cookies.token || req.cookies.token === '') {
         
        return res.json({status:false})
    } else {
        try {
            let data = jwt.verify(req.cookies.token, 'secreactkey');
            req.user = data;
            next();
        } catch (error) { 
            console.error("JWT verification error:", error.message); 
            return res.json({status:false})
            
        }
    }
}

module.exports = router; 