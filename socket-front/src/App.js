import { AppContainer, Button } from './styles';

let ws = null;

const connect = () => {
	ws = new WebSocket('ws://localhost:4000');

	ws.onopen = () => {
		console.log('OPEN');
	};

	ws.onclose = () => {
		console.log('CLOSED');
		connect();
	};

	ws.onmessage = message => console.log('message recieved: ' + message.data);
};

connect();

const sendMessage = () => {
	ws?.send('banana');
};

function App() {
	return (
		<AppContainer>
			<Button onClick={sendMessage}>Some content</Button>
		</AppContainer>
	);
}

export default App;
