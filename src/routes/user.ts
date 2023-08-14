import express, {Request,Response} from 'express';
import userSchema, {User} from '../models/user';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const usersRouter=express.Router();

usersRouter.get('/',async(req:Request,res:Response):Promise<void> =>{
    const userList=await User.find().select('name phone')

    if(!userList){
        res.status(500).json({success:false})
    }
    res.status(200).send(userList);
});

usersRouter.post('/login',async(req,res)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('The user not found');
    }
    if( user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)){
        const secrect: string | undefined = "Gabriel";
        const token=jwt.sign(
            {
                userId:user.id,
                isAdmin:user.isAdmin,
            },
            secrect!,
            {expiresIn: '1d'}
        );
        return res.status(200).send({user: user.email, token: token})
    }
    else
        return res.status(400).send('Password is wrong!')
    
})
usersRouter.post('/register',async(req,res)=>{
    const user= new User({
        name:req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash,7),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })
    const addUser = await user.save();
    if(!addUser){
        return res.status(400).send('The user cannot be created!');
    }
    res.status(201).send(addUser);
    res.status(201).send({"ok":"ok"});
})

export default usersRouter;
