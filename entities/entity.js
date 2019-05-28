class Entity
{
  static DEFAULT_MASS = 1;
  static DEFAULT_SIZE = 5;
  static DIR_RIGHT = new Vector(1, 0);

  constructor(maxSpeed, maxForce, position, velocity, color, options={})
  {
    // mass=1, behavior=new Behavior(), target=undefined

    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce; // essentially max acceleration

    this.position = position;
    this.velocity = velocity;

    this.mass = (options.mass !== undefined) ? options.mass : Entity.DEFAULT_MASS;
    this.size = (options.size !== undefined) ? options.size : Entity.DEFAULT_SIZE;
    this.target = (options.target !== undefined) ? options.target : null;

    this.behavior = (options.behavior !== undefined) ? options.behavior : new Behavior();
    this.behavior.setContext(this);

    this.tags = [];

    this.color = color;

    this.forward = Entity.DIR_RIGHT.clone();
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
    if (this.behavior !== undefined)
      this.behavior.setTarget(t);
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

  render(pos)
  {
    return DisplayUtils.drawTriangle(pos,
      this.forward.angleFromPositiveXAxis(), this.size, this.color);
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

  getColor()
  {
    return this.color;
  }

  setColor(color)
  {
    return this.color = color;
  }

  getStoppingDistance()
  {
    // might add some fancier math here later
    const dist = 1.75 * this.maxSpeed / this.maxForce;

    return dist;
  }

  within(min, max)
  {
    // can later do something more fancy, for now will just do a
    // square of size 2 * this.size
    const r = this.size * 2;
    const d = new Vector(r, r);
    const tl = Vector.subtract(this.position, d);
    const br = Vector.add(this.position, d);

    return tl.isWithinRect(min, max) || br.isWithinRect(min, max);
  }
}
