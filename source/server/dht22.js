import {Sensor} from 'raspi-sensors';
import io from './socket';

const DHT22 = new Sensor({
	type: 'DHT22',
	pin: 4
});

let state = {
	temperature: null,
	humidity: null
}

const send = (err, data) => {
	if (!err) {
		if (data.type === 'Temperature') {
			state.temperature = data.value.toFixed(2);
		} else if (data.type === 'Humidity') {
			state.humidity = data.value.toFixed(2);
			io.to('authenticated').emit('data', state);
		}
	} else {
		console.error('dht22', err);
	}
}

// DHT22.fetch(send);
// DHT22.fetchInterval(send, 2);

export function getState () {
	return state;
}
