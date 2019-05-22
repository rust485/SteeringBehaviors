class ControlledEntityFactory
{
  static bounds = new Vector(10, 10);
  static maxSpeed = 5.0;
  static maxForce = 3.0;
  static mass = 1.0;

  constructor(boundX, boundY, maxSpeed = 5.0, maxForce = 3.0, mass = 1.0)
  {
    this.bounds = new Vector(boundX, boundY);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.mass = mass;
  }

  static setBounds(bx, by)
  {
    ControlledEntityFactory.bounds = new Vector(bx, by);
  }

  static setMaxSpeed(ms)
  {
    ControlledEntityFactory.maxSpeed = ms;
  }

  static setMaxForce(mf)
  {
    ControlledEntityFactory.maxForce = mf;
  }

  static setMass(m)
  {
    ControlledEntityFactory.mass = m;
  }

  static createEntity()
  {
    const pos = new Vector(Math.random() * ControlledEntityFactory.bounds.x,
      Math.random() * ControlledEntityFactory.bounds.y);

    const vel = new Vector(0, 0);

    const behavior = new ControlledBehavior();

    return new Entity(this.maxSpeed, this.maxForce, pos, vel,
      this.mass, behavior);
  }
}
