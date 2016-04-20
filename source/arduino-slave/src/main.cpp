#include <Arduino.h>
#include <Wire.h>
#include <DHT.h>

// basic settings
#define SERIAL_BAUD 9600
#define I2C_ADDRESS 42

// sensor settings

#define BRIGHTNESS_PIN 0
#define PIR_PIN 2
#define DHT_PIN 3
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

// states

#define BRIGHTNESS 0
#define MOTION 1
#define TEMPERATURE 2
#define HUMIDITY 3

// state

unsigned char state = 0;
float humidity;
float temperature;

// custom methods

void flush () {
	while (Wire.read() != -1);
}

void requestEvent () {
	unsigned char brightness;
	bool motion;
	switch (state) {
		case BRIGHTNESS:
			brightness = map(analogRead(BRIGHTNESS_PIN), 0, 1024, 0,255);
			Wire.write(brightness);
			Serial.print("Brightness: ");
			Serial.println(brightness);
		break;
		case MOTION:
			motion = digitalRead(PIR_PIN);
			Wire.write(motion);
			Serial.print("Motion: ");
			Serial.println(motion);
		break;
		case TEMPERATURE:
			Wire.write((byte*) &temperature, 4);
			Serial.print("Temperature: ");
			Serial.println(temperature);
		break;
		case HUMIDITY:
			Wire.write((byte*) &humidity, 4);
			Serial.print("Humidity: ");
			Serial.println(humidity);
		break;
		default:
			Wire.write(255);
			Serial.println("unknown state");
	}
}

void receiveEvent (int amount) {
	state = (unsigned char) Wire.read();
	flush();
}

void setup() {
	// Sensors
	pinMode(BRIGHTNESS_PIN, INPUT);
	pinMode(PIR_PIN, INPUT);
	dht.begin();

	// Serial
	Serial.begin(SERIAL_BAUD);

	// I²C
	Wire.begin(I2C_ADDRESS);
	Wire.onRequest(requestEvent);
	Wire.onReceive(receiveEvent);
}

void loop() {
	delay(2000);
	humidity = dht.readHumidity();
	temperature = dht.readTemperature();
}
