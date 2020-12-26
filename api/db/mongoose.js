// this file will have the connection logic to mongodb database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser: true}).then(()=>{
    console.log("connected to mongodb successfully :)");
}).catch((e)=>{
    console.log("error while attempting to connect mongodb");
    console.log(e);
})

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.exports = {
    mongoose
};