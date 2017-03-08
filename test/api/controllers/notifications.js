const should = require('should');
const request = require('supertest');
const server = require('../../../app');

describe('controllers', function() {
  describe('notifications', function() {
    describe('POST /notification', function() {
      it('should return a default message', function(done) {
        request(server)
          .get('/notification')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql({message: 'ok'});

            done();
          });
      });
    });
  });
});
