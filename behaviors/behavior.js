class Behavior
{
  constructor(ctx=null, options={})
  {
    this.ctx = ctx;
    this.target = (options.target !== undefined) ?
      options.target : null;
    this.avoid = (options.avoid !== undefined) ?
      options.avoid : null;
  }

  setContext(ctx)
  {
    return this.ctx = ctx;
  }

  getContext()
  {
    return this.ctx;
  }

  getTarget()
  {
    return (this.target === null) ?
      this.ctx.getTarget() : this.target;
  }

  setTarget(t)
  {
    return this.target = t;
  }

  getAvoid()
  {
    return (this.avoid === null) ?
      this.ctx.getAvoid() : this.avoid;
  }

  setAvoid(a)
  {
    return this.avoid = a;
  }

  getSteering()
  {
    return new Vector(0, 0);
  }

  update()
  {
    const desired = this.getSteering();

    this.ctx.updateVelocity(desired);
    this.ctx.move();
    return this.ctx;
  }
}
