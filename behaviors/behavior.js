class Behavior
{
  constructor(ctx=null, options={})
  {
    this.ctx = ctx;
  }

  setContext(ctx)
  {
    return this.ctx = ctx;
  }

  getContext()
  {
    return this.ctx;
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
