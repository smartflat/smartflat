#include <Arduino.h>
#include <DHT.h>

#define DHT_PIN 4
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

int ledPins[] = {5, 6, 7, 8, 9, 10, 11, 12};

void setup() {
	pinMode(13, INPUT);
	for (int i = 0; i < 8; i++) {
		pinMode(ledPins[i],OUTPUT);
	}
}

void showBinNumber(int num) {
	for (int i = 0; i < 8; i++) {
		if (num%2)
			digitalWrite(ledPins[i], HIGH);
		else
			digitalWrite(ledPins[i], LOW);
		num/=2;
	}
}

void loop() {
	if (digitalRead(13) == HIGH) {
		for (int i=0; i<256; i++) {
			showBinNumber(i);
			delay(256-i);
		}
	} else {
		delay(2000);
		float humidity = dht.readHumidity();
		showBinNumber((int) humidity*2.56);
	}
}
