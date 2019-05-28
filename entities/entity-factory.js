const DEFAULT_MAX_SPEED = 5.0;
const DEFAULT_MAX_FORCE = 3.0;
const DEFAULT_MASS = 1.0;
const DEFAULT_SIZE = 5.0;
const DEFAULT_COLOR = DisplayUtils.colorLookup.RED;

const ORIGIN = new Vector(0, 0);

const INITIAL_VELOCITY = new Vector(0, 0);

class EntityFactory
{
  constructor(boundX, boundY, options={})
  {
    this.bounds = new Vector(boundX, boundY);

    this.maxSpeed = (options.maxSpeed !== undefined) ?
      options.maxSpeed : DEFAULT_MAX_SPEED;
    this.maxForce = (options.maxForce !== undefined) ?
      options.maxForce : DEFAULT_MAX_FORCE;
    this.mass = (options.mass !== undefined) ?
      options.mass : DEFAULT_MASS;
    this.size = (options.size !== undefined) ?
      options.size : DEFAULT_SIZE;
    this.color = (options.color !== undefined) ?
      options.color : DEFAULT_COLOR;
  }

  getRandomSpeed()
  {
    return (Math.random() * (this.maxSpeed - 1)) + 1
  }

  getRandomForce()
  {
    return (Math.random() * (this.maxForce - 1)) + 1
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

  setSize(s)
  {
    return this.size = s;
  }

  getSize()
  {
    return this.size;
  }

  static decidePosition(options)
  {
    if (options.position)
      return options.position;

    else if (options.bounds.max !== undefined &&
      options.bounds.min !== undefined)
      return EntityFactory.generatePointWithinRect(options.bounds.min,
        options.bounds.max);

    return ORIGIN.clone();
  }

  parseOptions(ops)
  {
    return {
      speed: (ops.speed !== undefined) ?
        ops.speed : this.getRandomSpeed(),
      force: (ops.force !== undefined) ?
        ops.force : this.getRandomForce(),
      mass: (ops.mass !== undefined) ?
        ops.mass : this.mass,
      size: (ops.size !== undefined) ?
        ops.size : this.size,
      color: (ops.color !== undefined) ?
        ops.color : this.color,
      target: (ops.target !== undefined) ? // yes, I know this is redundant.
        ops.target : undefined            // Just explicitly shows the options
    };
  }

  createBehaviorlessEntity(options={})
  {
    const behavior = new Behavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    return this.createEntityWithBehavior(pos, behavior, ops);
  }

  createControlledEntity(options={})
  {
    const behavior = new ControlledBehavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    return this.createEntityWithBehavior(pos, behavior, ops);
  }

  createMouseControlledEntity(options={})
  {
    const behavior = new SeekBehavior();
    behavior.setTarget(mouse);

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    return this.createEntityWithBehavior(pos, behavior, ops);
  }

  createSeekingEntity(options={})
  {
    const behavior = new SeekBehavior(null, options.target);

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    const e = this.createEntityWithBehavior(pos, behavior, ops);

    if (options.target !== undefined)
      e.setTarget(options.target);

    return e;
  }

  createFleeingEntity(options={})
  {
    const behavior = new FleeBehavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    const e = this.createEntityWithBehavior(pos, behavior, ops);

    if (options.avoid !== undefined) behavior.setAvoid(options.avoid);
    if (options.target !== undefined) e.setTarget(options.target);

    return e;
  }

  createWanderingEntity(options={})
  {
    const behavior = new WanderBehavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    return this.createEntityWithBehavior(pos, behavior, ops);
  }

  createPursuingEntity(options={})
  {
    const behavior = new PursuitBehavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    const e = this.createEntityWithBehavior(pos, behavior, ops);

    if (options.target !== undefined) e.setTarget(options.target);

    return e;
  }

  createEvadingEntity(options={})
  {
    const behavior = new EvadeBehavior();

    const pos = EntityFactory.decidePosition(options);

    const ops = this.parseOptions(options);

    const e = this.createEntityWithBehavior(pos, behavior, ops);

    if (options.avoid !== undefined) e.setAvoid(options.avoid);

    return e;
  }

  createEntityWithBehavior(pos, behavior, options={})
  {
    const vel = INITIAL_VELOCITY.clone();

    const color = options.color;

    const ops = {
      mass: options.mass,
      size: options.size,
      target: options.target,
      behavior,
    };

    return new Entity(options.speed, options.force, pos, vel,
      color, ops)
  }

  static generatePointWithinRect(min, max)
  {
    const delta = Vector.subtract(max, min);

    const x = Math.random() * delta.x + min.x;
    const y = Math.random() * delta.y + min.y;

    return new Vector(x, y);
  }
}
