const {User, Item } = require("../models/index");
const { Op } = require("sequelize");

class storeItem{
    static async getItems(req,res,next){
        try{
            const { search, page, size } = req.query;
            const limit = size ? +size : 5;
            const offset = page ? (+page - 1) * limit : 0;

            let option = {
                limit,
                offset,
                order: [["id", "ASC"]],
                where: {},
              };

              console.log("baru" + option.where)
          
                //   if (search) {
                //     option.where[Op.and] = [
                //       { itemName: { [Op.iLike]: `%${search}%` } },
                //     ];
                //   }

                if (search) {
                    option.where[Op.or] = [{ itemName: { [Op.iLike]: `%${search}%` } }];
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
            console.log(error, "ini eror boy")
            next(error)
        }
    }

    static async getItem(req,res,next){
        try{
            const {id} = req.params;
            console.log(id,"ini id")

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
        try {
            const { id } = req.user;
            const { itemName, purchasePrice, sellPrice, stock,photo } = req.body;
            console.log(itemName, purchasePrice, sellPrice, stock,photo,"ini paramter dikirim")
            console.log(req.file, "file");
        
            const checkItem = await Item.findOne({
              where: {
                itemName,
              },
            });
        
            if (checkItem) {
              throw { name: 'Item has been registered' };
            }
        
            const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
            console.log(url)

            const dataItem = await Item.create({
              itemName,
              purchasePrice,
              sellPrice,
              stock,
              photo: url,
              UserId: id,
            });
        
            res.status(201).json({
              message: `Item ${itemName} has been Registered`,
            });
          } catch (error) {
            console.log(error)
            next(error);
          }
    }

    static async putItem(req,res,next){
        try{
            const {id} = req.params;
            const { itemName, purchasePrice, sellPrice, stock } = req.body;

            console.log("ini di put")

            // const dataTerbaru = {
            //     itemName : itemName,
            //     purchasePrice: purchasePrice,
            //     sellPrice : sellPrice,
            //     stock : stock,
            // }

            const dataItem = await Item.findByPk(id,{
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            // console.log(dataItem,"ini datanya")

            // console.log(id, ">>>" , dataTerbaru)

            if(!dataItem){
                throw { name : "Not Found The Item"}
            }

            await Item.update(
                {
                    itemName : itemName,
                    purchasePrice: purchasePrice,
                    sellPrice : sellPrice,
                    stock : stock,
                },
                {
                  where: {
                    id,
                  },
                }
            );

            res.status(200).json({
                message: `Item with id: ${id} has been updated`
            });
        }catch(error){
            console.log(error)
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

            await Item.destroy({
                where: {
                  id,
                },
            });

            res.status(200).json({
                message: `Item with id: ${id} has been deleted`
            });
        }catch(error){
            next(error);
        }
    }
}

module.exports = { storeItem }