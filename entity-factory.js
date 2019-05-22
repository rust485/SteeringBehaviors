class EntityFactory
{
  constructor(boundX, boundY, maxSpeed = 5.0, maxForce = 3.0, mass = 1.0)
  {
    this.bounds = new Vector(boundX, boundY);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.mass = mass;
  }

  static createEntity()
  {
    const pos = new Vector(Math.random() * this.bound.x,
      Math.random() * this.bound.y);

    const vel = new Vector(0, 0);

    const behavior = new Behavior();

    return new Entity(this.maxSpeed, this.maxForce, pos, vel,
      this.mass, behavior);
  }
}
