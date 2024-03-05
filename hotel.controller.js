
'use strict';
const {Sequelize, DataTypes} = require("sequelize");
const Hotel = require("./hotel.model");
const Op = Sequelize.Op;
const userList = require("./service.user")

exports.findAll = async function(req, res) {

        try {

        let result = {}
        let setLimit = 20;   // number of records per page.log(req.query)
        if(req.query.page){
        let page = req.query.page || 1;
        let setOffset = setLimit * (page - 1);

        const {count, rows} = await Hotel.findAndCountAll({
                offset: setOffset,
                limit: setLimit,
                order:[
                ["id","DESC"]
                ]
        })
        result = { status : "200", data: rows, total_rows: count}
        }else if(req.query.name){//find by name
        let hotel_name = req.query.name || "";
        const {count, rows} = await Hotel.findAndCountAll({
                where: {name: {[Op.like]: hotel_name+'%'}}
        })
        result = { status : "200", data: rows, total_rows: count}
        }
        
        if(result){
                return res.send(result);
        }else{
                return res.send({ status : "200", data: [], message: "No record found"});
        }
        res.send(result);

        } catch (e) {
                res.send({ status : "error", message: "somer error occured", details: e})
        }
}

exports.create = async function(req, res) {
        try {
            const getHotel = await Hotel.findOne({
                where: { name: req.body.name }
            });
    
            if(getHotel){
                return res.send({ status : "success", message:"Hotel name already present"});
            }else{
                const response = await Hotel.create({
                    name: req.body.name,
                    hotel_type: req.body.hotel_type,
                    country:req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                    address: req.body.address,
                    pincode: req.body.pincode,
                    status: req.body.status,
                    user_id: req.body.user_id,
                    currency: req.body.currency
                  })
                  .then(function(data){
                    return res.send({ status : "success", message:"created successfull"});
                  })
                  .catch(error=>{
                    return res.send({ status : "error", message: "somer error occured", details: error});
                  })
            }
          } catch (e) {
            res.send({ status : "error", message: "somer error occured", details: e})
          }
    };

    // Delete a Tutorial with the specified id in the request
exports.delete = async function(req, res) {
        try {
          const getHotel = await Hotel.findOne({
              where: { id: req.params.id}
          });
      
          if(getHotel){
              const response = await Hotel.destroy({
                where:{id: req.params.id}
              })
              .then(function(data){
                return res.send({ status : "success", message:"remove Hotel successfull"});
              })
              .catch(error=>{
                return res.send({ status : "error", message: "somer error occured", details: error});
              })
          }else{
            return res.send({ status : "success", message:"Hotel not present"});
          }
        } catch (e) {
          res.send({ status : "error", message: "somer error occured", details: e.message})
        }
};

exports.update = async function(req, res){
        console.log("response : ")
  return res.send({ status : "success", message: "update details successfully"});
}

exports.test = async function(req, res){
  return res.send({ status : "success", message: "update details successfully"});
}
