#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define FIREBASE_HOST "https://homeio-test-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "X946hcgH6iyilpGFpcK0oLYwUC44zKUIF1Sv4ajs"
#define WIFI_SSID ""
#define WIFI_PASSWORD ""


FirebaseData firebaseData;
FirebaseJsonArray arr;

void setup() {
  //Classic Arduino
  Serial.begin(115200);
  pinMode(15, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(0, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(16, OUTPUT);
  pinMode(17, INPUT);
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
  delay(1);
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

void Ledy() {
  digitalWrite(15, OnOfftype("/Ledy/Led0"));
  digitalWrite(2, OnOfftype("/Ledy/Led1"));
}

void LedyRGB() {
  if (OnOfftype("/LedyRGB/LedRGB0/OnOff")) {
    analogWrite(0, LedRGB("R", "/LedyRGB/LedRGB0"));
    analogWrite(4, LedRGB("G", "/LedyRGB/LedRGB0"));
    analogWrite(16, LedRGB("B", "/LedyRGB/LedRGB0"));
  } else {
    //0,4,16
    analogWrite(0, 0);
    analogWrite(4, 0);
    analogWrite(16, 0);
  }
}
int getINT(String droga){
  int val;
  Firebase.getInt(firebaseData,droga, &val);
  return val;
}
void Ekran096(){
  int Length=getINT("/096/length");
  int i=0;
  display.clearDisplay();
  while (i<Length) 
  {
    int x;
    int y;    
    String xdroga = "/096/data/"+String(i);
    String ydroga = "/096/data/"+String(i+1);   
    x=getINT(xdroga);
    y=getINT(ydroga);
    display.drawPixel(x,y,1);
    Serial.print(i);
    i=i+2;
  }
  display.display();  
}
void Wykresy() {
}

void Ekran16x2() {
}