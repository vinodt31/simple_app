
exports.findAll = async function(req, res){
        
        res.send({total: 0, data: [], message: "no data found"})
}


 exports.create = async function(req, res){
        try {
            return res.send({ status : "sucess", message: "call create hote request", details: ""});
        } catch (e) {
          res.send({ status : "error", message: "somer error occured", details: e})
        }
}