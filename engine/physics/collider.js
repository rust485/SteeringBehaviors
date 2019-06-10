class Collider
{
  constructor(shape)
  {
    this.shape = shape;
  }

  setRotation(theta)
  {
    return this.shape.setRotation(theta);
  }

  rotate(theta)
  {
    return this.shape.rotate(theta);
  }

  setPosition(position)
  {
    return this.shape.setPosition(position);
  }

  move(translation)
  {
    return this.shape.move(translation);
  }

  getShape()
  {
    return this.shape;
  }

  setShape(shape)
  {
    this.shape = shape;
    this.init();
  }

  static getSATBounds(collider, axisProj)
  {
    const min = -Infinity;
    const max = Infinity;

    for (let vert in collider.shape.getVertices())
    {
      const d = vert.dotProduct(axisProj);
      const min = Math.min(min, d);
      const max = Math.max(max, d);
    }

    return { min, max };
  }

  // performs SAT from the perspective of c1 only
  static checkCollisionHelper(c1, c2)
  {
    for (let i = 0; i < c1.vertices.length; i++)
    {
      const j = (i + 1) % c1.vertices.length;
      const axisProj = Vector.subtract(c1.vertices[j], c1.vertices[i]);

      const c1Bounds = Collider.getSATBounds(c1, axisProj);
      const c2Bounds = Collider.getSATBounds(c2, axisProj);

      if (!(c2Bounds.max >= c1Bounds.min && c1Bounds.max >= c2Bounds.min))
        return false;
    }

    return true;
  }

  static checkCollision(c1, c2)
  {
    return (Collider.checkCollisionHelper(c1, c2) || Collider.checkCollisionHelper(c2, c1));
  }

  render(screenPos)
  {
    const options = {
      stroke: Display.getInstance().color.PURPLE,
    };

    return this.shape.render(screenPos, options);
  }
}
