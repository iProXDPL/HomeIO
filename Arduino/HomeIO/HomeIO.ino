#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <LiquidCrystal_I2C.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

LiquidCrystal_I2C lcd(0x27, 20, 4);

#define FIREBASE_HOST "https://homeio-test-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "X946hcgH6iyilpGFpcK0oLYwUC44zKUIF1Sv4ajs"
#define WIFI_SSID "X30"
#define WIFI_PASSWORD "siema123"

FirebaseData firebaseData;
unsigned long aktualnyCzas = 0;
unsigned long zapamietanyCzas = 0;
unsigned long roznicaCzasu = 0;

#define LED0 15
#define LED1 2
#define LEDRGBR 4
#define LEDRGBG 16
#define LEDRGBB 17
#define POT 34
void setup() {
  //Classic Arduino
  Serial.begin(115200);
  pinMode(LED0, OUTPUT);
  pinMode(LED1, OUTPUT);
  pinMode(LEDRGBR, OUTPUT);
  pinMode(LEDRGBG, OUTPUT);
  pinMode(LEDRGBB, OUTPUT);
  pinMode(POT, INPUT);
  //
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.display();
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(3,32);
  display.println(F("Wczytywanie..."));
  display.display();
  display.setCursor(0,0);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.print("Wczytywanie..");
  //
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  Serial.println(" ");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("");
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  Firebase.setwriteSizeLimit(firebaseData, "tiny");
  Serial.println("");
  Serial.println("");
  Serial.println("");
}

void loop() {
  Ledy();
  LedyRGB();
  Wykresy();
  Ekran16x2();
  Ekran096();
}

bool OnOfftype(String droga) {
  bool Val;
  Firebase.getBool(firebaseData, droga, &Val);
  return Val;
}

int LedRGB(String color, String droga) {
  int Val;
  String newdroga = droga + "/" + color;
  Firebase.getInt(firebaseData, newdroga, &Val);
  return Val;
}

String getText(String element, String droga) {
  String Val;
  String newdroga = droga + "/" + element;
  Firebase.getString(firebaseData, newdroga, &Val);
  return Val;
}

int getINT(String droga){
  int val;
  Firebase.getInt(firebaseData,droga, &val);
  return val;
}

void Ledy() {
  digitalWrite(LED0, OnOfftype("/Ledy/Led0"));
  digitalWrite(LED1, OnOfftype("/Ledy/Led1"));
}

void LedyRGB() {
  if (OnOfftype("/LedyRGB/LedRGB0/OnOff")) {
    analogWrite(LEDRGBR, LedRGB("R", "/LedyRGB/LedRGB0"));
    analogWrite(LEDRGBG, LedRGB("G", "/LedyRGB/LedRGB0"));
    analogWrite(LEDRGBB, LedRGB("B", "/LedyRGB/LedRGB0"));
  } else {
    //0,4,16
    analogWrite(LEDRGBR, 0);
    analogWrite(LEDRGBG, 0);
    analogWrite(LEDRGBB, 0);
  }
}
void Ekran096(){
  int Length=getINT("/096/length");
  int i=0;
  display.clearDisplay();
  for(;i<Length;i=i+2){
    int x;
    int y;    
    String xdroga = "/096/data/"+String(i);
    String ydroga = "/096/data/"+String(i+1);   
    x=getINT(xdroga);
    y=getINT(ydroga);
    display.drawPixel(x,y,1);
  }
  display.display();  
}
void Wykresy() {
  aktualnyCzas = millis();
  if(OnOfftype("/Pot/onoff")&& aktualnyCzas - zapamietanyCzas >= 1000){
    zapamietanyCzas = aktualnyCzas;
    int p = analogRead(POT);
    Firebase.pushInt(firebaseData,"/Pot/data",p);
  }
}

void Ekran16x2() {
  String Fir = getText("First","/16x2");
  String Sec = getText("Second","/16x2");
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(Fir);
  lcd.setCursor(0,1);
  lcd.print(Sec);
}