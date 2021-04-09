const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groceryGuru');

const itemsSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

const Items = mongoose.model('Items', itemsSchema);

const checkForItemInDb = (item) => {
  return new Promise((resolve, reject) => {
    Items.find({name: item}, (err, result) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(result[0]);
      }
    });
  });
};

//takes in arry of uncategorized & object of categorized
//organizes the found items
//pushes the non-found items into a notFound array on object
const checkForItemsInDb = (items, list) => {
  let categorized = list;
  categorized.prices = [];
  categorized.notFound = [];
  return new Promise((resolve, reject) => {
    items.forEach((item, index, arr) => {
      checkForItemInDb(item)
      .then((res) => {
        if (res) {
          categorized.prices.push(res.price);
          if (categorized[res.category]) {
             categorized[res.category].push(res.name);
             return;
          }
          categorized[res.category] = [res.name];
        } else {
          categorized.notFound.push(item);
        }
        if (index === arr.length - 1) {
          resolve(categorized);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
        reject(err);
      });
    });
  })
};

const checkAPI = (item) => {

};

module.exports.categorizeItems = (items, list) => {
  //create a new list obj
  let categorized = list;
  //put each item to lower case
  items = items.map(item => item.toLowerCase());
  //check for each item in the db
  checkForItemsInDb(items, categorized)
    .then((organized) => {
      console.log('organized', organized);
    })
    .catch((err) => {
      console.log('err', err);
    })
    //if it does not exist, check the API
      //orginize the data
      //save to the DB
   //insert into list obj
   //return list obj
   return items;
};