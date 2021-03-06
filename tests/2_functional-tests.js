/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
let Thread = require('../models/Thread');
let Reply = require('../models/Reply');

chai.use(chaiHttp);

let boardTest = 'Is this a Thread?';
before((done)=> {
  var newThread = new Thread({
    board: boardTest,
    text: 'This is a test.',
    delete_password: 'partyhard'
  });
  newThread.save((err) =>{
    done();
  });
});
suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('POST new thread', function (done) {
        chai.request(server)
          .post('/api/threads/'+boardTest)
          .send({
              board: 'Is this a Thread?',
              text: 'This is a test.',
              delete_password: 'partyhard'
          })
          .end((err,res)=>{
            
            assert.equal(res.status,200);
            
            done();
          })
      });
    });
    
    suite('GET', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    });
    
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
      
    });
    
  });

});
