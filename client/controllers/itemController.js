const {User, Item } = require("../models/index");

class storeItem{
    static async getItems(req,res,next){
        try{
            const { search, page, size } = req.query;

            const limit = size ? +size : 5;
            const offset = page ? (+page - 1) * limit : 0;

            console.log(search)

            let option = {
                limit,
                offset,
                order: [["id", "ASC"]],
                where: {},
              };

              console.log("baru" + option)
          
            //   if (search) {
            //     option.where[Op.and] = [
            //       { itemName: { [Op.iLike]: `%${search}%` } },
            //     ];
            //   }

            if (search) {
                option.where =  {
                itemName: {
                   [Op.eq]: `%${search}%`
                }
              }
            }

              console.log("ini baru")

              const data = await Item.findAndCountAll(option);

              console.log(data,"ini data di baca")

              const { count: totalItems, rows: items } = data;
              const currentPage = page ? +page : 1;
              const totalPages = Math.ceil(totalItems / option.limit);
              res.status(200).json({
                statusCode: 200,
                data: {
                  currentPage,
                  totalPages,
                  totalItems,
                  items,
                },
              });
        }catch(error){
            next(error)
        }
    }

    static async getItem(req,res,next){
        try{
            const {id} = req.params;
            console.log(id)

            const dataItem = await Item.findByPk(id,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if(!dataItem){
                throw { name : "Not Found The Item"}
            }

            res.status(200).json({
                statuscode:200,
                data:dataItem
            })
        }catch(error){
            next(error)
        }
    }

    static async createItem(req,res,next){
        try{
            const { path } = req.file;
            const {id} = req.user;
            const {itemName,purchasePrice,sellPrice,stock } = req.body
            let input = {
                itemName,
                purchasePrice,
                sellPrice,
                stock,
                photo : path,
                UserId : id
            }

            console.log(input)
            
            const checkItem = await Item.findOne({
                where:{
                    itemName
                }
            })

            if(checkItem){
                throw { name : "Item has been registered"}
            }

            const dataItem = await Item.create(input)

            res.status(201).json({
                message:`Item ${input.itemName} has been Registered`
            })
        }catch(error){
            next(error)
        }
    }

    static async putItem(req,res,next){
        try{
            const {id} = req.params;
            const {itemName,purchasePrice,sellPrice,stock } = req.body

            let input = {
                itemName,
                purchasePrice,
                sellPrice,
                stock,
            }

            console.log(id)

            const dataItem = await Item.findByPk(id,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if(!dataItem){
                throw { name : "Not Found The Item"}
            }

            await Item.update(
                input,
                {
                  where: {
                    id
                  },
                }
            );

            res.status(200).json({
                message: `Item with id: ${id} has been updated`
            });
        }catch(error){
            next(error)
        }
    }

    static async deleteItem(req,res,next){
        try{
            const {id} = req.params;
            console.log(id)
            const dataItem = await Item.findByPk(id,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            if(!dataItem){
                throw { name : "Not Found The Item"}
            }

            res.status(200).json({
                message: `Item with id: ${id} has been deleted`
            });
        }catch(error){
            next(error);
        }
    }
}

module.exports = { storeItem }