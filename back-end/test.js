const app = require('./app.js');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe("POST request to /api/login", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(app)
        .post("/api/login")
        .end((err, res) => {
            res.should.have.status(200)
            expect(res.body).to.be.a("object") // Use the expect syntax
            expect(res.body).to.have.property("success", true) // a way to check the exact value of a property of the response object
            done();   // resolve the Promise that these tests create so mocha can move on
      })
    })
})
  
describe("POST request to /api/register", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(app)
        .post("/api/register")
        .end((err, res) => {
          res.should.have.status(200)
          expect(res.body).to.be.a("object") // Use the expect syntax
          expect(res.body).to.have.property("success", true) // a way to check the exact value of a property of the response object
          done();   // resolve the Promise that these tests create so mocha can move on
      })
    })
})

describe("GET request to /api/news", () => {
  it("it should respond with an HTTP 200 status code and an object in the response body", done => {
    chai
      .request(app)
      .get("/api/news")
      .end((err, res) => {
        res.should.have.status(200)
        expect(res.body).to.be.a("object") // Use the expect syntax
        expect(res.body).to.have.property("success", true) // a way to check the exact value of a property of the response object
        done();   // resolve the Promise that these tests create so mocha can move on
      })
  })
})
  