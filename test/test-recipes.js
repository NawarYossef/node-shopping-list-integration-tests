const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const recipesRouter = require('./recipesRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


chai.use(chaiHttp);


describe("Recipe List", function(){
  before(function(){
		return runServer();
	})

	after(function(){
		return closeServer();
	})

	it("should list items on GET", function(){
		return chai.request(app)
		.get("/recipes")
		.then(function(res){
			res.should.be.json;
			res.shoud.have.status(200)
			
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');

			res.body.should.have.length.of.at.least(1);
			res.body.forEach(function(item) {
				item.should.be.a('object');
				item.should.include.keys('id', 'name', 'ingredients');
		})
	})
		
	
})