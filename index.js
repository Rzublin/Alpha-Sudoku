const cool = require('cool-ascii-faces')
const express = require('express')
var bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/pages/index.html')))  
  .get('/regeln', (req, res) => res.sendFile(path.join(__dirname+'/views/pages/regeln.html')))
  .get('/ueberuns', (req, res) => res.sendFile(path.join(__dirname+'/views/pages/ueberuns.html')))
  .get('/rangliste', (req, res) => {
	  res.sendFile(path.join(__dirname+'/views/pages/rangliste.html')); 
   })
  .get('/ranglisteDB', async (req, res) => {
	  try {
		console.log("Ajax GET");
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM rangliste');
		console.log(result);
		res.send(result);
		client.release();
	  } catch (err) {
		console.error(err);
		//res.send("Error " + err);
	  }
	})
	.post('/ranglisteDBPost', async (req, res) => {
	  try {
		console.log("Ajax SET");
		const text = 'INSERT INTO rangliste(name, zeit, schwierigkeit) VALUES($1, $2, $3);';
		var values = [];
		//
		var jsonString = '';
		var jsonValues =  "";
        req.on('data', function (data) {
            jsonString += data;
        });
        req.on('end', function () {
			jsonValues = JSON.parse(jsonString);
			console.log(jsonValues);
			console.log(jsonValues.name);
			console.log(jsonValues.zeit);
			console.log(jsonValues.schwierigkeit);
			console.log(text);
			values = [jsonValues.name, jsonValues.zeit, jsonValues.schwierigkeit];
			 //insert into test_table values (1, 'hello database');
			
			
        });
		//
		const client = await pool.connect();
		const result = await client.query(text, values);
		console.log(result);
			res.send(result);
			client.release();
		
	  } catch (err) {
		console.error(err);
		//res.send("Error " + err);
	  }
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
