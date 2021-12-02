const HTTP = require('http');
const { WebSocketServer } = require('ws');

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
		console.log('received:"' + data + '"');
		setTimeout(() => {
			ws.send('banana back');
		}, 1000);
	});
});
