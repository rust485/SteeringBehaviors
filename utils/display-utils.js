class DisplayUtils
{
  static colorLookup = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
    PINK: 'pink',
    PURPLE: 'purple',
    WHITE: 'white',
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

  static drawPolygon(vertices, options={})
  {
    push();

    (options.stroke !== undefined) ?
      stroke(options.stroke) : noStroke();

    (options.fill !== undefined) ?
      fill(options.fill) : noFill();

    beginShape();

    for (let vert of vertices)
      vertex(vert.getX(), vert.getY());

    endShape();
    pop();
  }
}
