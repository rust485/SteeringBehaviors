class Behavior
{
  constructor(ctx=null, options={})
  {
    this.ctx = ctx;
    this.target = (options.target !== undefined) ?
      options.target : null;
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
    // the target of this behavior is chosen by deciding if the behavior
    // has been explicitly assigned a target, and if not then the behavior's
    // target is whatever the object it is attached to is targeting
    if (this.target === null)
      return this.ctx.getTarget();
    return this.target;
  }

  setTarget(t)
  {
    return this.target = t;
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
