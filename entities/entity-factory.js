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

  createMouseControlledEntity(minBounds, maxBounds)
  {
    const behavior = new SeekBehavior();
    behavior.setTarget(mouse);
    const pos = Vector.generatePointWithinRect(minBounds, maxBounds);

    return this.createEntityWithBehavior(pos, behavior);
  }

  createSeekingEntity(minBounds, maxBounds, options={})
  {
    const behavior = new SeekBehavior();

    const pos = (options.position !== undefined) ?
      options.position : Vector.generatePointWithinRect(minBounds, maxBounds);
    const speed = (options.speed !== undefined) ?
      options.speed : Math.random() * 3 + 1;
    const force = (options.force !== undefined) ?
      options.force : Math.random();

    const e = this.createEntityWithBehavior(pos, behavior, speed, force);

    if (options.target !== undefined) e.setTarget(options.target);

    return e;
  }

  createEntityWithBehavior(pos, behavior, speed=this.maxSpeed, force=this.maxForce)
  {
    const vel = new Vector(0, 0);

    return new Entity(speed, force, pos, vel,
      this.mass, behavior)
  }

  createFleeingEntity(minBounds, maxBounds, options={})
  {
    const behavior = new FleeBehavior();

    const pos = (options.position !== undefined) ?
      options.position : Vector.generatePointWithinRect(minBounds, maxBounds);
    const speed = (options.speed !== undefined) ?
      options.speed : Math.random() * 3 + 1;
    const force = (options.force !== undefined) ?
      options.force : Math.random();

    const e = this.createEntityWithBehavior(pos, behavior, speed, force);

    if (options.avoid !== undefined) behavior.setAvoid(options.avoid);
    if (options.target !== undefined) e.setTarget(options.target);

    return e;
  }
}
