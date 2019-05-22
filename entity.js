const DEFAULT_R = 10;

class Entity
{
  constructor(maxSpeed, maxForce, position, velocity, mass=1, behavior)
  {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce; // essentially max acceleration

    this.position = position;
    this.velocity = velocity;

    this.mass = mass;

    this.behavior = behavior;
    this.behavior.setContext(this);
  }

  update()
  {
    return this.behavior.update();
  }

  move()
  {
    return this.position.add(this.velocity);
  }

  setBehavior(b)
  {
    this.behavior = b;
    return this.behavior.setContext(this);
  }

  getBehavior()
  {
    return this.behavior;
  }

  setPosition(p)
  {
    return this.position = p;
  }

  getPosition()
  {
    return this.position;
  }

  updateVelocity(v)
  {
    // perform vector addition, then cap the velocity
    // by max speed of this entity
    return this.velocity.add(v).limit(this.maxSpeed);
  }

  setVelocity(v)
  {
    return this.velocity = v.limit(this.maxSpeed);
  }

  getVelocity()
  {
    return this.velocity;
  }

  getMaxForce()
  {
    return this.maxForce;
  }

  getMaxSpeed()
  {
    return this.maxSpeed;
  }

  getMass()
  {
    return this.mass;
  }

  setMass(m)
  {
    return this.mass = m;
  }

  render()
  {
    fill(1000);
    ellipse(this.position.x, this.position.y, DEFAULT_R, DEFAULT_R);
  }

  getX()
  {
    // did this so that targets can either be positions themselves, or moving
    // entities. This is transparent to the behavior.
    return this.position.getX();
  }

  getY()
  {
    // did this so that targets can either be positions themselves, or moving
    // entities. This is transparent to the behavior.
    return this.position.getY();
  }

  getStoppingDistance(friction=0.4, gravAccel=9.8)
  {
    const v = this.velocity.magnitude();
    const vSq = v * v;
    return vSq / (2 * friction * gravAccel)
  }
}
