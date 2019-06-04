class Ray
{
  constructor(position, direction)
  {
    this.position = position;
    this.direction = direction;
  }

  getDirection()
  {
    return this.direction;
  }

  setDirection(direction)
  {
    return this.direction = direction;
  }

  getPosition()
  {
    return this.position;
  }

  setPosition(position)
  {
    return this.position = position;
  }
}
