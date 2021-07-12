const Customer = require('../models/customer');

exports.create = async(req,res,next)=>{
   
    try {
        //Finding new recordID 
        let custIds = [];

        const record = await Customer.find();
        
        if(record.length != 0){
            for(let i=0;i< record.length;i++){
                custIds.push(record[i].custId);
            }
            let lastRid = custIds[custIds.length-1];
              req.body.custId = parseInt(lastRid) + 1;
        }

        if(record.length == 0){
            let lastRid = 0
              req.body.custId = parseInt(lastRid) + 1;
        }
        console.log(req.body);
        //Finding new recordID Ends
        
        //creating New Record
        const newRecord = await Customer.create(req.body);

        res.status(200).json({
            status:"Success",
            message:"Record Created successfully",
            record: newRecord
        });
    } catch (error) {
        
        res.status(500).json({
            status:"fail",
            message:"could not create record",
            error: error
        });
    }
}


exports.update = async(req,res,next)=>{
    try {
        const record = await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});

        res.status(200).json({
            status:"Success",
            message:"Record updated Successfully",
            record: record
        });

    } catch (error) {
        
        res.status(500).json({
            status:"fail",
            message:"Cannot update Record",
            error: error
        });
    }
}

exports.view = async(req,res,next)=>{
    try {
        const record = await Customer.findById(req.params.id);

        res.status(200).json({
            status:"Success",
            record: record
        });

    } catch (error) {

        res.status(500).json({
            status:"fail",
            error: error
        });
    }
}

exports.getAll = async(req,res,next)=>{
    try {
        let custIds = [];
        let recordnum = 0;
       
        const allRecords = await Customer.find({"isDeleted":false}).sort({'_id':-1});
        const record = await Customer.find();

        //Finding Record number
        if(record.length != 0){
            for(let i=0;i< record.length;i++){
                custIds.push(record[i].custId);
            }
            let lastRid = custIds[custIds.length-1];
              recordnum = parseInt(lastRid) + 1;
        }

        if(record.length == 0){
            let lastRid = 0
              recordnum = parseInt(lastRid) + 1;
        }
        
        

        res.status(200).json({
            status:"Success",
            record: allRecords,
            recordnum : recordnum
        });

    } catch (error) {
        res.status(500).json({
            status:"fail",
            error: error
        });
    }
}

exports.delete = async(req,res,next)=>{

    req.body.isDeleted = true;

    try {
        await Customer.findByIdAndUpdate(req.params.id,req.body);

        res.status(200).json({
            status:"Success",
            message: "Record Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            status:"fail",
            error: error
        });
    }
}