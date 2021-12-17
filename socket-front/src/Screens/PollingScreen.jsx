import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './styles';
import Axios from 'axios';

export default function PollingScreen() {
	const axiosInstance = Axios.create({ baseURL: 'http://localhost:4001/' });
	const [poll, setPoll] = useState(null);

	const sendMessage = useCallback(async () => {
		console.time('Polling Timer');
		const response = await axiosInstance.get();
		console.log(response.data);
		console.timeEnd('Polling Timer');
	}, [axiosInstance]);

	const connect = useCallback(() => {
		console.log('object');
		if (poll) return;
		setPoll(
			setInterval(() => {
				sendMessage();
			}, 250),
		);
	}, [poll, sendMessage]);

	const disconnect = () => poll && clearInterval(poll);

	useEffect(() => {
		connect();
		return () => {
			disconnect();
			console.clear();
			console.log('Polling Connection Ended.');
		};
	}, [connect, disconnect]);

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Button onClick={connect}> connect to server</Button>
				<Button onClick={disconnect}> close server connection</Button>
			</div>
			<Button onClick={sendMessage}>ask for response from server</Button>
		</div>
	);
}
