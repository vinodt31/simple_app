
'use strict';
const {Sequelize, DataTypes} = require("sequelize");
const User = require("./user.model");
const Op = Sequelize.Op;

exports.findAll = async function(req, res) {
  let result = {}
  let setLimit = 20;   // number of records per page

  if(req.query.page){
    let page = req.query.page || 1;
    let setOffset = setLimit * (page - 1);

    const {count, rows} = await User.findAndCountAll({
      offset: setOffset,
      limit: setLimit,
      order:[
        ["id","DESC"]
      ]
    })
    result = { status : "200", data: rows, total_rows: count}
  }else if(req.query.name){//find by name
    let hotel_name = req.query.name || "";
    const {count, rows} = await User.findAndCountAll({
      where: {name: {[Op.like]: hotel_name+'%'}}
    })
    result = { status : "200", data: rows, total_rows: count}
  }
  
  if(result){
      return res.send(result);
  }else{
      return res.send({ status : "200", data: [], message: "No record found"});
  }
  res.send(rows);
}

exports.update = async function(req, res) {
  try {
    const getUser = await User.findOne({
        where: { id: req.params.id}
    });

    if(getUser){
      const response = await User.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email,
        phone_no: req.body.phone_no,
        parent_id: req.body.parent_id,
        country: req.body.country,
        city: req.body.city,
        pincode: req.body.pincode,
        address: req.body.address

      },{where: {id: req.params.id}})
      .then(function(data){
        return res.send({ status : "success", message:"updated successful"});
      })
      .catch(error=>{
        return res.send({ status : "error", message: "somer error occured", details: error});
      })
        
    }else{
      return res.send({ status : "success", message:"Hotel not present"});
    }
  } catch (e) {
    console.error(e)
    res.send({ status : "error", message: "somer error occured", details: e})
  }
}

exports.create = async function(req, res) {
    try {
        const getUser = await User.findOne({
            where: { email: req.body.email }
        });

        if(getUser){
            return res.send({ status : "success", message:"User already present"});
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const response = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email:req.body.email,
                password: hashedPassword,
                phone_no: req.body.phone_no,
                parent_id: req.body.parent_id,
                country: req.body.country,
                city: req.body.city,
                pincode: req.body.pincode,
                address: req.body.address
              })
              .then(function(data){
                return res.send({ status : "success", message:"created successful"});
              })
              .catch(error=>{
                return res.send({ status : "error", message: "somer error occured", details: error});
              })
        }
      } catch (e) {
        res.send({ status : "error", message: "somer error occured", details: e})
      }
};

exports.updatePartialData = async function(req, res) {
  try {
      const getUser = await User.findOne({
          where: { id: req.params.id}
      });

      if(getUser){
        let setData = {}
        if(req.body.status){
          setData.status = req.body.status
        }
        if(req.body.password){
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          setData.password = hashedPassword
        }
        await User.update(setData,{where: {id: req.params.id}})
        .then(function(data){
          return res.send({ status : "success", message:"updated successful"});
        })
        .catch(error=>{
          return res.send({ status : "error", message: "somer error occured", details: error});
        })
          
      }else{
        return res.send({ status : "success", message:"Hotel not present"});
      }
    } catch (e) {
      console.error(e)
      res.send({ status : "error", message: "somer error occured", details: e})
    }
};

exports.login = async function(req, res) {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.findOne({
          where: {email: req.body.email}
      });

      
      
      if (user) {
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatched)
        if (isMatched) {
            let userData = {}
            if(cacheObject.get(req.body.email)){
              userData = cacheObject.get(req.body.email)
            }else if(user.token == "NULL" || user.token == "") {
              const token = await jwt.sign({id: user.id, email: req.body.email},process.env.JWT_SECRET);
              userData = user.toJSON()
              delete userData["password"]
              userData.token = token
              cacheObject.set(req.body.email,userData)
              await User.update(
                {token: token},
                {where:{email: req.body.email}}
                );
            }else{
              const token = await jwt.sign({id: user.id, email: req.body.email},process.env.JWT_SECRET);
              userData = user.toJSON()
              delete userData["password"]
              userData.token = token
              cacheObject.set(req.body.email,userData)
            }
            
            return res.json(userData);
        }
      }
      return res.status(400).json({ message: 'Unauthorized'});
  } catch (error) {
    console.log("login error : ")
    console.error(error);

    res.send({ status : "error", message: "somer error occured", details: error})
  }
};

exports.logout = async function(req, res) {
  try {
      const userUpdate = await User.update(
        {token: "NULL"},
        {where:{email: req.user.email}}
        );
       let removeCache = cacheObject.del(req.body.email);
      
      if(userUpdate){
          return res.send({ status : "success", message:"User logout successfully"});
      }else{
          return res.send({ status : "error", message: "somer error occured", details: error});
      }
    } catch (e) {
      res.send({ status : "error", message: "somer error occured", details: e})
    }
};