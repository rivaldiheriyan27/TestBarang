const {User, Book,Bookmark} = require("../models/index");
const {compareHash,hashPassword} = require("../helpers/hashPassword")
const {signatureJwt,verifyJwt, secretKey} = require("../helpers/jwt")


class userController{
    static async register(req,res,next){
        try{
            const {email, password,name} = req.body

            let input = {
                email,
                password,
                name
            }
            const checkDataUser = await User.findOne({ 
                where:{
                    email:email,
                }
            })

            if(checkDataUser){
                throw { name :"Email has been registered"}
            }

            const dataInputRegister = await User.create(input)

            const idToken = {
                id: dataInputRegister.id
            }

            let token = signatureJwt(idToken,secretKey)
            
            res.status(201).json({
            statusCode:201,
            data:{
                message: `new user with email ${dataInputRegister.email} has been successfully registered`,
                accesToken:token
            }
            });
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    static async login(req,res,next){
        try{
            const {email, password} = req.body;
            console.log(email,password)
            const user = await User.findOne({
                where:{
                    email:email,
                }
            });

            if (!user) {
                throw {name :"Email or Password is invalid"};
            }

            console.log(user)

            const validatePassword = compareHash(
                password,
                user.password
            )
            
            console.log(validatePassword, "ini validasi password")

            if (!validatePassword) {
                throw { name : `Email or Password is invalid`};
            }

            const payload = {
                id: user.id,
            };

            const token = signatureJwt(payload,secretKey);

            res.status(200).json({
                statusCode:200,
                data:{
                    accesToken:token,
                    email:user.email,
                    role:user.role,
                    name:user.name,
                    id:user.id
                }
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {userController,}