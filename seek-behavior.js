class SeekBehavior extends Behavior
{
  constructor(ctx, target=null)
  {
    super(ctx);
    this.target = target;
  }

  update()
  {
    super.update();
    if (this.ctx === null || this.target === null)
      return;

    // allows for transparency, target could either be a Vector, or an entity.
    const targetPos = new Vector(this.target.getX(), this.target.getY());

    const desiredVelocity = targetPos.subtract(this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .limit(this.ctx.getMaxForce())
      .scale(1 / this.ctx.getMass());

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }

  setTarget(t)
  {
    return this.target = t;
  }

  getTarget()
  {
    return this.target;
  }

  getStoppingDistance()
  {
    if (this.ctx !== null)
      return this.ctx.getStoppingDistance();

    return undefined;
  }
}
