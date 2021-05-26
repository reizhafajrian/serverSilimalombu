const mongoose=require("mongoose")
const ImageUrl=new mongoose.Schema({
    imageId:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("ImageUrl",ImageUrl)