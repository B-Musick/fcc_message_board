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
let Thread = require('../models/Thread')
module.exports = function (app) {
  app.route('/api/threads/:board')
    .post((req,res)=>{
      // Create a new thread
      Thread.create({
        board: req.body.board,
        text: req.body.text,
        delete_password: bcrypt.hashSync(req.body.delete_password, 12) // Hash password
      },(err, newThread)=>{
        // Redirect to the new thread page
          err ? console.log(newThread) : res.redirect('/b/' + req.body.board)
      });
    });
    
  app.route('/api/replies/:board');

};
