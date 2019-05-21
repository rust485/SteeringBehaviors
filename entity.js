const DEFAULT_R = 10;

class Entity
{
  constructor(maxSpeed, maxForce, position, velocity, target, behavior)
  {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.position = position;
    this.velocity = velocity;
    this.behavior = behavior;

    this.behavior.setContext(this);
  }

  update()
  {
    return this.behavior.update();
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

  setVelocity(v)
  {
    return this.velocity = v;
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

  render()
  {
    fill(1000);
    ellipse(this.position.x, this.position.y, DEFAULT_R, DEFAULT_R);
  }
}
