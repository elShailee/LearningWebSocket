const HTTP = require('http');
const { WebSocketServer } = require('ws');
const express = require('express');
const cors = require('cors');

const httpServer = HTTP.createServer();
httpServer.listen(4000, () => console.log('listening on port 4000'));
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', ws => {
	console.log('connection made');

	setInterval(() => {
		const rand = Math.random();
		if (rand <= 0.05) {
			ws.send('random message from socket.');
		}
	}, 250);

	ws.on('close', () => {
		console.log('connection closed');
		ws.close();
	});

	ws.on('message', message => {
		message = message.toString();
		if (message === 'response') {
			ws.send('here is a WebSocket response for you.');
		} else if (message === 'object') {
			ws.send(JSON.stringify({ somekey: 'some value', someOtherKey: 'some other value' }));
		}
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
