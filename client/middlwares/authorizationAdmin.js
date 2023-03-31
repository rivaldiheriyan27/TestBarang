const {User, Book,Bookmark} = require("../models/index");

const authorizationAdmin = async(req,res,next) =>{
    try{
        const {id:adminid, role} = req.user;
        
        if(role !== "Admin"){
            throw { name: "Forbidden" };
        }

        next()
    }catch(err){
        const { name } = err;
        next(name)
    }
}

module.exports = authorizationAdmin;