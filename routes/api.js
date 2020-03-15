/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var bcrypt = require('bcrypt');
let Thread = require('../models/Thread');
let Reply = require('../models/Reply');
let Board = require('../models/Board');

module.exports = (app)=> {
  app.route('/api/threads/:board')
    .post((req,res)=>{
      // Create new board 
      Board.create({name:req.params.board},(err,newBoard)=>{
        if(err) res.json(err)
        else{
          // Create a new thread
          Thread.create({
            board: newBoard.name,
            text: req.body.text,
            delete_password: bcrypt.hashSync(req.body.delete_password, 12) // Hash password
          }, (err, newThread) => {
            // Add the newThread to the new board
            newBoard.threads.push(newThread);
            newBoard.save();
            // Redirect to the new thread page
            err ? res.json(err) : res.redirect('/b/' + newBoard.name)
          });
        }
      })
    });

  app.route('/api/replies/:board')
    .post((req, res) => {
      Thread.findById(req.body.id,(err,thread)=>{
        let delete_password = bcrypt.hashSync(req.body.delete_password, 12);
        Reply.create({text:req.body.text, delete_password}, (err, createdReply)=>{
          // Find the board which reply is being posted to
          thread.replies.push(createdReply); // Store replies
          thread.bumped_on = createdReply.created_on; // Change date to current
          thread.save()
          res.redirect('/b/' + req.params.board+'/'+thread._id)
        });
      })
    });

};
