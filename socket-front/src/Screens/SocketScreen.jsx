import React from 'react';
import { Button } from './styles';

let ws = null;

const connect = () => {
	ws = new WebSocket('ws://localhost:4000');

	ws.onopen = () => {
		console.log('Websocket Connection Opened');
	};

	ws.onclose = () => {
		console.log('Websocket Connection closed');
		connect();
	};

	ws.onmessage = message => {
		console.log(message.data);
		console.timeEnd('WebSocket Timer');
	};
};

connect();

const sendMessage = () => {
	console.time('WebSocket Timer');
	ws?.send('returnInSec');
};

export default function SocketScreen() {
	return <Button onClick={sendMessage}>ask for response from server</Button>;
}
