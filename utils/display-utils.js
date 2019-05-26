class DisplayUtils
{
  static colorLookup = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
  }

  static drawTriangle(center, rotation, d, color)
  {
    const front = new Vector(d, 0);
    const bl = new Vector(-d, -d); // back left
    const br = new Vector(-d, d); // back right

    push();
    fill(color);
    translate(center.x, center.y);
    rotate(rotation);
    triangle(front.x, front.y, bl.x, bl.y, br.x, br.y);
    pop();
  }

  drawShape(points, center, rotation, color)
  {
    push();
    fill(color);
    translate(center.x, center.y);
    rotate(rotation);

    for (let i = 0; i < this.points.length; i++)
      vertex(points[i].getX(), points[i].getY());

    pop();
  }
}
