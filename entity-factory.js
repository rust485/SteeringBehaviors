class EntityFactory
{
  constructor(boundX, boundY, maxSpeed = 5.0, maxForce = 3.0, mass = 1.0)
  {
    this.bounds = new Vector(boundX, boundY);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.mass = mass;
  }

  setBounds(bx, by)
  {
    this.bounds = new Vector(bx, by);
  }

  getBounds()
  {
    return this.bounds;
  }

  setMaxSpeed(ms)
  {
    this.maxSpeed = ms;
  }

  getMaxSpeed()
  {
    return this.maxSpeed;
  }

  setMaxForce(mf)
  {
    this.maxForce = mf;
  }

  getMaxForce()
  {
    return this.maxForce;
  }

  setMass(m)
  {
    this.mass = m;
  }

  getMass()
  {
    return this.mass;
  }

  createBehaviorlessEntity(minBounds, maxBounds)
  {
    const behavior = new Behavior();

    const pos = Vector.generatePointWithinRect(minBounds, maxBounds);

    return this.createEntityWithBehavior(pos, behavior);
  }

  createControlledEntity(minBounds, maxBounds)
  {
    const behavior = new ControlledBehavior();

    const pos = Vector.generatePointWithinRect(minBounds, maxBounds);

    return this.createEntityWithBehavior(pos, behavior);
  }

  createSeekingEntity(minBounds, maxBounds)
  {
    const behavior = new SeekBehavior();

    const pos = Vector.generatePointWithinRect(minBounds, maxBounds);

    return this.createEntityWithBehavior(pos, behavior);
  }

  createEntityWithBehavior(pos, behavior)
  {
    const vel = new Vector(0, 0);

    return new Entity(this.maxSpeed, this.maxForce, pos, vel,
      this.mass, behavior)
  }
}
