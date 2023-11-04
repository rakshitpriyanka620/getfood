const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const mongoURI ='mongodb://getfoodmern:Pikachhu620@ac-gq6ndsn-shard-00-00.tc7mdch.mongodb.net:27017,ac-gq6ndsn-shard-00-01.tc7mdch.mongodb.net:27017,ac-gq6ndsn-shard-00-02.tc7mdch.mongodb.net:27017/getfoodmern?ssl=true&replicaSet=atlas-5od0a3-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB= async ()=>{
await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
   if(err)console.log("---",err)
   else{
    console.log("connected")
    const fetched_data =await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray(async function(err,data){
      const food_category = await mongoose.connection.db.collection("food_category")
      food_category.find({}).toArray(function(err,catData){
         if(err) console.log(err);
        else {
          global.food_items = data;
          global.food_category = catData;

       }
      })
      //   if(err) console.log(err);
      //   else {
      //    global.food_items = data;
      // }
        //console.log(global.food_items)
})
   }

})
}
module.exports = mongoDB;