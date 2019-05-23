const DEFAULT_R = 10;

class Entity
{
  constructor(maxSpeed, maxForce, position, velocity, mass=1, behavior=new Behavior(), target=undefined)
  {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce; // essentially max acceleration

    this.position = position;
    this.velocity = velocity;

    this.mass = mass;

    this.behavior = behavior;
    this.behavior.setContext(this);

    this.tags = [];

    this.target = target;
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
    const front = new Vector(5, 0);
    const bl = new Vector(-5, -5); // back left
    const br = new Vector(-5, 5); // back right

    push();
    fill(1000);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.angleFromOrigin());
    triangle(front.x, front.y, bl.x, bl.y, br.x, br.y);
    pop();
    // ellipse(this.position.x, this.position.y, DEFAULT_R, DEFAULT_R);
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
}
