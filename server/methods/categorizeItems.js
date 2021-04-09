const axios = require('axios');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groceryGuru');

const itemsSchema = mongoose.Schema({
  name: String,
  category: String,
});

const Items = mongoose.model('Items', itemsSchema);

//utility function for checkForItemsInDb
// -- handles individual items
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

//takes in array of uncategorized & object of categorized
//organizes the found items
//pushes the non-found items into a notFound array on object
const checkForItemsInDb = (items, list) => {
  let categorized = list;
  categorized.notFound = [];
  return new Promise((resolve, reject) => {
    items.forEach((item, index, arr) => {
      checkForItemInDb(item)
      .then((res) => {
        if (res) {
          if (categorized[res.category]) {
             categorized[res.category].push(res.name);
          } else {
            categorized[res.category] = [res.name];
          }
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

const checkForItemInAPI = (item) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${item}&number=1&metaInformation=true`)
    .then((result) => {
      if (result.data.results[0]) {
        let itemObj = {
          name: item,
          category: result.data.results[0].aisle
        }
        Items.updateOne({name: item}, itemObj, {upsert: true}, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(itemObj);
          }
        })
      } else {
        resolve(null);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const checkForItemsInAPI = (items, list) => {
  let categorized = list;
  categorized.notFound = [];
  return new Promise((resolve, reject) => {
    items.forEach((item, index, arr) => {
      checkForItemInAPI(item)
      .then((res) => {
        if (res) {
          if (categorized[res.category]) {
             categorized[res.category].push(res.name);
          } else {
            categorized[res.category] = [res.name];
          }
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
      })
    })
  })
}

module.exports.categorizeItems = (items, list) => {

  let categorized = list;
  items = items.map(item => item.toLowerCase());

  return new Promise((resolve, reject) => {
    checkForItemsInDb(items, categorized)
      .then((organized) => {
        if (organized.notFound.length > 0) {
          return checkForItemsInAPI(organized.notFound, organized);
        } else {
          return organized;
        }
      }) .then((organizedList) => {
         resolve(organizedList);
      })
      .catch((err) => {
        reject(err);
      })
  })
};