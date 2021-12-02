import { useState } from 'react';
import PollingScreen from './Screens/PollingScreen';
import SocketScreen from './Screens/SocketScreen';
import { Button } from './Screens/styles';
import { AppContainer } from './styles';

function App() {
	const [connectionState, setConnectionState] = useState('polling');

	const switchConnectionsState = () => {
		setConnectionState(connectionState === 'socket' ? 'polling' : 'socket');
	};
	return (
		<AppContainer>
			Connection Protocol: {connectionState}
			<Button onClick={switchConnectionsState}>Switch Connection Protocol</Button>
			{connectionState === 'socket' ? <SocketScreen /> : <PollingScreen />}
		</AppContainer>
	);
}

export default App;
