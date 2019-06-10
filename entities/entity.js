class Entity
{
  static DEFAULT_MASS = 1;
  static DEFAULT_SIZE = 5;
  static DIR_RIGHT = new Vector(1, 0);
  static DEFAULT_FOV = 120;
  static DEFAULT_VIEW_DISTANCE = 80;

  constructor(maxSpeed, maxForce, position, velocity, color, options={})
  {
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    this.position = position;
    this.velocity = velocity;

    this.mass = (options.mass !== undefined) ? options.mass : Entity.DEFAULT_MASS;

    this.target = (options.target !== undefined) ? options.target : null;
    this.avoid = (options.avoid !== undefined) ? options.avoid : null;
    this.fov = (options.fov !== undefined) ? options.fov : Entity.DEFAULT_FOV;
    this.viewDistance = (options.viewDistance !== undefined) ? options.viewDistance : Entity.DEFAULT_VIEW_DISTANCE;

    this.behavior = (options.behavior !== undefined) ? options.behavior : new Behavior();
    this.behavior.setContext(this);

    this.tags = [];

    this.color = color;

    this.forward = Entity.DIR_RIGHT.clone();

    const size = (options.size !== undefined) ? options.size : Entity.DEFAULT_SIZE;

    this.graphic = ShapeFactory.getTriangle(size, this.position.clone(), this.getRotation());
    this.collider = new Collider(this.graphic.clone());
  }

  getRotation()
  {
    return this.forward.angleFromPositiveXAxis();
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
    this.position.add(this.velocity);
    this.graphic.move(this.velocity);
    this.collider.move(this.velocity);
    return this;
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

  setAvoid(a)
  {
    return this.avoid = a;
  }

  getAvoid()
  {
    return this.avoid;
  }

  getBehavior()
  {
    return this.behavior;
  }

  setPosition(p)
  {
    this.graphic.setPosition(p);
    this.collider.setPosition(p);
    return this.position = p;
  }

  getPosition()
  {
    return this.position;
  }

  setForward(forward)
  {
    this.forward = forward;
    this.graphic.setRotation(this.getRotation());
    this.collider.setRotation(this.getRotation());
    return this.forward;
  }

  updateVelocity(v)
  {
    v.limit(this.maxForce)
      .scale(1 / this.mass);

    // perform vector addition, then cap the velocity
    // by max speed of this entity
    this.velocity.add(v).limit(this.maxSpeed);

    if (this.velocity.magnitude() !== 0)
      this.setForward(this.velocity.clone().normalize());

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

  getGraphic()
  {
    return this.graphic;
  }

  setGraphic(graphic)
  {
    return this.graphic = graphic;
  }

  setMass(m)
  {
    return this.mass = m;
  }

  render(screenPos)
  {
    const options = {
      fill: this.color,
      stroke: this.color
    };

    this.graphic.render(screenPos, options);

    if (window.DEBUG)
      this.renderDebug(screenPos);
  }

  renderDebug(screenPos)
  {
    const forwardEnd = Vector.add(screenPos, this.forward.clone().scale(this.viewDistance));
    DisplayUtils.drawLine(screenPos, forwardEnd, DisplayUtils.colorLookup.BLUE);

    const fovColor = DisplayUtils.colorLookup.PURPLE;

    const theta = this.fov * Math.PI / 180;
    const leftFov = Vector.add(screenPos, this.forward.clone().rotate(theta / 2).scale(this.viewDistance));
    DisplayUtils.drawLine(screenPos, leftFov, fovColor);

    const rightFov = Vector.add(screenPos, this.forward.clone().rotate(-theta / 2).scale(this.viewDistance));
    DisplayUtils.drawLine(screenPos, rightFov, fovColor);

    this.collider.render(screenPos);
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

  within(boundingArea)
  {
    return true;
  }

  canSee(targ)
  {
    const pos = new Vector(targ.getX(), targ.getY());

    return (Vector.subtract(pos, this.position).magnitude() <= this.viewDistance &&
      this.withinFov(pos))

  }

  withinFov(point)
  {
    const relativePoint = Vector.subtract(point, this.position);
    const rads = Math.abs(this.forward.angleBetween(relativePoint));
    const degs = rads * 180 / Math.PI;
    return degs <= this.fov / 2;
  }
}
