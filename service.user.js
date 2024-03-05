const axios = require("axios")
const dotenv = require("dotenv");

exports.userList = async ()=>{
    try{
       const result = await axios.get(process.env.USER_SERVICE_URL);
       return result.data
    }catch(e){
        return e.message;
    }
}