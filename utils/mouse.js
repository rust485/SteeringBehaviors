class Mouse
{
  constructor(x=0, y=0)
  {
    this.position = new Vector(x, y);
  }

  update()
  {
    this.position.x = (mouseX !== undefined) ? mouseX : 0;
    this.position.y = (mouseY !== undefined) ? mouseY : 0;
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

  getPosition()
  {
    return this.position;
  }
}
