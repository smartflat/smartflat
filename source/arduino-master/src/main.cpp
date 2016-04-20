#include <Arduino.h>
#include <Wire.h>

#define SERIAL_BAUD 9600

#define I2C_SLAVE_1 42
#define I2C_SLAVE_2 43

#define BRIGHTNESS 0
#define MOTION 1
#define TEMPERATURE 2
#define HUMIDITY 3

#ifndef isNaN
	inline bool isNaN (double x) {
		return x != x;
	}
#endif

void setup () {
	Wire.begin();
	Serial.begin(SERIAL_BAUD);
}

void setState (int id, unsigned char state) {
	Wire.beginTransmission(id);
	Wire.write(state);
	Wire.endTransmission();
}

void getUInt (int id, unsigned char state) {
	setState(id, state);

	int success = Wire.requestFrom(id, 1);

	if (success == 0) {
		Serial.print("false");
	} else {
		int c = (unsigned char) Wire.read();
		Serial.print(c);
	}
}

void getBoolean (int id, unsigned char state) {
	setState(id, state);

	int success = Wire.requestFrom(id, 1);

	if (success == 0) {
		Serial.print("false");
	} else {
		bool c = (unsigned char) Wire.read() == 1;
		Serial.print(c);
	}
}

void getFloat (int id, unsigned char state) {
	setState(id, state);

	int success = Wire.requestFrom(id, 4);

	if (success == 0) {
		Serial.print("false");
	} else {
		union {
			float value;
			byte buffer[4];
		} data;

		int i = 0;

		while (Wire.available()) {
			data.buffer[i++] = (byte) Wire.read();
		}

		if (isNaN(data.value)) {
			Serial.print("false");
		} else {
			Serial.print(data.value);
		}
	}
}

void getData (int id) {
	Serial.print("{\"id\":");
	Serial.print(id);
	Serial.print(",\"brightness\":");
	getUInt(id, BRIGHTNESS);
	Serial.print(",\"motion\":");
	getBoolean(id, MOTION);
	Serial.print(",\"temperature\":");
	getFloat(id, TEMPERATURE);
	Serial.print(",\"humidity\":");
	getFloat(id, HUMIDITY);
	Serial.println("}");
}

void loop () {
	getData(I2C_SLAVE_1);
	delay(1000);
	getData(I2C_SLAVE_2);
	delay(1000);
}
