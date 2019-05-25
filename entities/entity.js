const D = 5;

class Entity
{
  constructor(maxSpeed, maxForce, position, velocity, mass=1, behavior=new Behavior(), target=undefined)
  {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce; // essentially max acceleration

    this.position = position;
    this.velocity = velocity;

    this.mass = mass;

    console.log(behavior);
    this.behavior = behavior;
    this.behavior.setContext(this);

    this.tags = [];

    this.target = target;

    this.forward = new Vector(1, 0);
  }

  getTags()
  {
    return this.tags;
  }

  containsTag(tag)
  {
    return this.tags.indexOf(tag) !== -1;
  }

  addTags(tags)
  {
    return this.tags = this.tags.concat(tags);
  }

  removeTag(tag)
  {
    const newTags = [];
    for (let i = 0; i < this.tags.length; i++)
      if (this.tags[i] !== tag)
        newTags.push(this.tags[i]);

    return this.tags = newTags;
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

  setTarget(t)
  {
    return this.target = t;
  }

  getTarget()
  {
    return this.target;
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
    v.limit(this.maxForce)
      .scale(1 / this.mass);

    // perform vector addition, then cap the velocity
    // by max speed of this entity
    this.velocity.add(v).limit(this.maxSpeed);

    if (this.velocity.magnitude() !== 0)
      this.forward = this.velocity.clone().normalize();

    return this.velocity;
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
    return DisplayUtils.drawTriangle(this.position,
      this.forward.angleFromOrigin(), D);
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

  getStoppingDistance()
  {
    // might add some fancier math here later
    const dist = 1.75 * this.maxSpeed / this.maxForce;

    return dist;
  }

  predictPosition(frames)
  {
    if (frames <= 0)
      return this.position;

    const v = this.velocity.clone();
    v.scale(frames);

    return Vector.add(v,
      this.position);
  }
}
