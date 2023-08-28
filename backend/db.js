const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://FoodOrder:devfoodorder@cluster0.jl9nfnf.mongodb.net/FoodOrder?retryWrites=true&w=majority'




const mongoDB = async() => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri, {useNewUrlParser: true}, async(err, result)=>{
        if(err) console.log("---",err)
        else{
    
        console.log("connecting")
        const fetch_data = await mongoose.connection.db.collection("food_item");
        fetch_data.find({}).toArray(async function(err,data){
            const foodCat = await mongoose.connection.db.collection("foodCategory");
            foodCat.find({}).toArray(function(err,catData){
                if(err) console.log(err)
            else{ 
        
        
                global.food_items=data;
                global.foodCategory = catData;
                }

            })
            
        })
    }

    })

}
module.exports = mongoDB;

