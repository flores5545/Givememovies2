const mongoose = require('mongoose');
const KEY = process.env.ATLAS_MONGODB;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`${KEY}`);
  console.log('connected to db');
}


module.exports = mongoose;