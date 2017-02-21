// region define

// DIGITAL
#define PIR_PIN 3
#define DHT_PIN 4
#define LED_0 5
#define LED_1 6
#define LED_2 7
#define LED_3 8
#define LED_4 9
#define LED_5 10
#define LED_6 11
#define LED_7 12
#define LEFT_PIN 13

// ANALOG
#define I2C_1 4
#define I2C_2 5
#define BRIGHTNESS 7

// endregion

// region include

#include <Arduino.h>
#include <DHT.h>

DHT dht(DHT_PIN, DHT22);

int ledPins[] = {LED_0, LED_1, LED_2, LED_3, LED_4, LED_5, LED_6, LED_7};

void setup () {
	pinMode(13, INPUT);
	for (int i = 0; i < 8; i++) {
		pinMode(ledPins[i],OUTPUT);
	}
}

void showBinNumber (int num) {
	for (int i = 0; i < 8; i++) {
		if (num%2)
			digitalWrite(ledPins[i], HIGH);
		else
			digitalWrite(ledPins[i], LOW);
		num/=2;
	}
}

void loop () {
	for (int i = 0; i < 10; i++) {
		showBinNumber(
			map(
				analogRead(BRIGHTNESS),
				0,
				1024,
				0,
				255
			)
		);
		delay(256-i);
	}
	for (int i = 0; i < 256; i++) {
		showBinNumber(i);
		delay(256-i);
	}
	for (int i = 0; i < 5; i++) {
		float humidity = dht.readHumidity();
		showBinNumber((int) humidity*2.56);
		delay(2000);
	}
}
