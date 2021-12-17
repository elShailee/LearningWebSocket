import React, { useEffect } from 'react';
import { Button } from './styles';

export default function SocketScreen() {
	let ws = null;
	let timerStart = null;

	const connect = () => {
		if (!ws) {
			ws = new WebSocket('ws://localhost:4000');

			ws.onopen = () => {
				console.log('Websocket Connection Opened');
			};

			ws.onclose = () => {
				console.log('Websocket Connection closed');
				ws = null;
			};

			ws.onmessage = message => {
				!isJsonString(message.data) && console.log(message.data);
				isJsonString(message.data) && console.log(JSON.parse(message.data));
				if (timerStart) {
					console.log(`response took ${performance.now() - timerStart}ms.`);
					timerStart = null;
				}
			};
		}
	};

	const isJsonString = str => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	const close = () => {
		ws?.close();
	};

	const sendMessage = text => {
		timerStart = performance.now();
		ws?.send(text);
	};

	useEffect(() => {
		connect();
		return () => {
			ws?.close();
			console.clear();
			console.log('Socket Connection Ended.');
		};
	}, [ws]);

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Button onClick={connect}> connect to server</Button>
				<Button onClick={close}> close server connection</Button>
			</div>
			<Button onClick={() => sendMessage('response')}>ask for response from server</Button>
			<Button onClick={() => sendMessage('object')}>ask for Data from server</Button>
		</div>
	);
}
