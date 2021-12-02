const HTTP = require('http');
const { WebSocketServer } = require('ws');
const express = require('express');
const cors = require('cors');

const httpServer = HTTP.createServer();
httpServer.listen(4000, () => console.log('listening on port 4000'));
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', ws => {
	console.log('connection made');

	ws.on('close', () => {
		console.log('connection closed');
		ws.close();
	});

	ws.on('message', data => {
		console.log('WebSocket request recieved');
		ws.send('here is a WebSocket response for you.');
	});
});

const expressServer = express();
expressServer.listen(4001, () => console.log('listening on port 4001'));

expressServer.use(express.json());
expressServer.use(cors());

expressServer.get('/', (req, res) => {
	console.log('HTTP request recieved');
	res.send('here is a HTTP response for you.');
});
