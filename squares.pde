int width;

 void setup() {
    width = 0;
   size(400, 400);
   background(100);
 }

 void draw()
 {
background(255, 204, 0);
if (width = 200) {
  width = 0;
}
else {
  width = width + 1;
}
rect(0, 0, width, 100);


 }