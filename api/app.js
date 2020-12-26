const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
// load in the mongoose models
const {List} = require('../api/db/models/listModel');
const {Task} = require('../api/db/models/taskModel');
 //const { List , Task } = require('./db/models');
 /*Route handlers*/

/*List handlers*/

// load middleware 
app.use(bodyParser.json());

/* get /lists
  to get all the lists
*/
app.get('/lists',function (req, res) {
        // to return all the list in the database
        List.find({}).then((lists) => {
            res.send(lists);
        }).catch((e) => {
            res.send(e);
        });
    });

/* post /lists
  to create new lists
*/
app.post('/lists',(req,res)=>{
    // create a new list and return the list back to the user (which includes id)
    // the list will be passed on via json request body
    let title = req.body.title;
    let newList = new List({
        title
    });

    newList.save().then((listDoc)=>{
        //the full list doc is returned inclding id
        res.send(listDoc);

    });
});

/* patch /lists
  to update specified lists
*/
app.patch('/lists/:id',(req,res)=>{
 // to update the specified list
 List.findOneAndUpdate({_id:req.params.id},{
     $set: req.body
 }).then(()=>{
     res.sendStatus(200);
 });
});

/* delete /lists
to delete specified list
*/
app.delete('/lists/:id',(req,res)=>{
 // to delete the specified list
 List.findOneAndRemove({
    _id:req.params.id
 }).then((removedListDoc)=>{
      res.send(removedListDoc);
 })
});
/* get lists/listId/tasks
   to get all the task of the specified list
 */
app.get('/lists/:listId/tasks',(req,res)=>{
//we want to return all task of specified list(specified by listId)
Task.find({
 _listId : req.params.listId
}).then((tasks)=>{
    res.send(tasks);
})
});

/**
 POST /lists/:listId/tasks
 Create a new task in a specific list
 */
app.post('/lists/:listId/tasks',(req, res) => {
    // We want to create a new task in a list specified by listId
    
    let newTask = new Task({
        title: req.body.title,
        _listId : req.params.listId
    });

    newTask.save().then((newTaskDoc)=>{
        //the full list doc is returned inclding id
        res.send(newTaskDoc);

    });
});

/* 
PATCH /lists/:listId/tasks/tasksId
to update the specified task
*/
app.patch('/lists/:listId/tasks/:taskId',(req,res) =>{
    // we want to update the speicfied task(specified by taskId)
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId : req.params.listId
    },{
        $set : req.body
    }).then(() => {
        res.sendStatus(200);
    });

});

/*
DELETE 
to delete an existing task 
*/
app.delete('/lists/:listId/tasks/:taskId',(req,res) =>{
  Task.findOneAndRemove({
      _id : req.params.taskId,
      _listId : req.params.listId
  }).then((removedTaskDoc)=>{
      res.send(removedTaskDoc);
  });

});

/* just for help
app.get('/lists/:listId/tasks/:taskId',(req,res) =>{
    Task.findOne({
        _id : req.params.taskId,
        _listId : req.params.listId
    }).then((task)=>{
        res.send(task);
    });
  
  });*/

app.listen(3000,()=>{
console.log("server is listening at port 3000");
});

