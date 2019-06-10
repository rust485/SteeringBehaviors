class ShapeFactory
{
  static getTriangle(size=5, position, rotation)
  {
    const front = new Vector(size, 0);
    const bl = new Vector(-size, -size); // back left
    const br = new Vector(-size, size); // back right


    const vertices = [ front, bl, br ];

    return new Polygon(vertices, position, rotation);
  }
}
