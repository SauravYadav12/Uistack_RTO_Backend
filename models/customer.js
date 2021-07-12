const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    isDeleted:{
        type: Boolean,
        default: false
    },
    custId:{
        type : String,
        unique: true
    },
    vehicleNo: {
        type:String,
        required: [true,"vehicle no. is Required"],
    },
    buyerCellNo:{
        type: Number,
        required: [true,"buyer cell No is required"]
    },
    sellerCellNo:{
        type:Number,
        required: [true,"seller cell No is required"]
    },
    rtoName:{
        type: String
    },
    senderName:{
        type: String
    },
    senderCellNo:{
        type: String
    },
    branchDistrict:{
        type: String
    },
    totalTax:{
        type: Number
    },
    totalFee:{
        type:Number
    },
    HPA:{
        type: Number
    },
    HPT:{
        type:Number
    },
    DRC:{
        type: Number
    },
    FC:{
        type:Number
    },
    permit:{
        type:Number
    },
    FAR36No:{
        type:Number
    },
    updatedBy:{
        type : String
    },
    createdBy:{
        type: String
    }

},{
    timestamps: true
});

const Customer = mongoose.model('customer',CustomerSchema);

module.exports = Customer;