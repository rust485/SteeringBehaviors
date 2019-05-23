class Mouse
{
  constructor(x, y)
  {
    this.position = new Vector(x, y);
  }

  setPosition(x, y)
  {
    this.position = new Vector(x, y);
  }

  getX()
  {
    return this.position.x;
  }

  getY()
  {
    return this.position.y;
  }
}
