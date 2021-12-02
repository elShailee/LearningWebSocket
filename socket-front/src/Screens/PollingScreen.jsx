import React from 'react';
import { Button } from './styles';
import Axios from 'axios';

export default function PollingScreen() {
	const axiosInstance = Axios.create({ baseURL: 'http://localhost:4001/' });
	const sendMessage = async () => {
		console.time('Polling Timer');
		const response = await axiosInstance.get();
		console.log(response.data);
		console.timeEnd('Polling Timer');
	};

	return <Button onClick={sendMessage}>ask for response from server</Button>;
}
