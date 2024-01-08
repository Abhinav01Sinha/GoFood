const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://goFood:abhinav2sinha@cluster0.1ds2uva.mongodb.net/goFood?retryWrites=true&w=majority";

const connectMongoDB = async () => {
  await mongoose.connect(mongoURI);
  console.log("Connected");

  const foodItems = mongoose.connection.db.collection("food_items");
  const foodCategory = mongoose.connection.db.collection("foodCategory");

  try {
    const data = await foodItems.find({}).toArray();
    const catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectMongoDB;
