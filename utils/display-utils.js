class DisplayUtils
{
  static colorLookup = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
    PINK: 'pink',
    PURPLE: 'purple',
  }

  static drawTriangle(center, rotation, d, color)
  {
    const front = new Vector(d, 0);
    const bl = new Vector(-d, -d); // back left
    const br = new Vector(-d, d); // back right

    push();
    fill(color);
    translate(center.getX(), center.getY());
    rotate(rotation);
    triangle(front.getX(), front.getY(), bl.getX(), bl.getY(), br.getX(), br.getY());
    pop();
  }

  static drawLine(p1, p2, color)
  {
    push();
    stroke(color);
    line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
    pop();
  }

  static drawShape(points, center, rotation, color)
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
