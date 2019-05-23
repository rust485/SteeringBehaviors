class DisplayUtils
{
  static drawTriangle(center, rotation, d)
  {
    const front = new Vector(d, 0);
    const bl = new Vector(-d, -d); // back left
    const br = new Vector(-d, d); // back right

    push();
    fill(1000);
    translate(center.x, center.y);
    rotate(rotation);
    triangle(front.x, front.y, bl.x, bl.y, br.x, br.y);
    pop();
  }
}
