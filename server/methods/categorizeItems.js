const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groceryGuru');

const itemsSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

const Item = mongoose.model('Item', itemsSchema);

const checkForItem = (item) => {

};

module.exports.categorizeItems = (items, list) => {
  //create a new list obj
  //put each item to lower case
  items = items.map(item => item.toLowerCase());
  //check for each item in the db
    //if it does not exist, check the API
      //orginize the data
      //save to the DB
   //insert into list obj
   //return list obj
   return items;
};