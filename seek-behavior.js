class SeekBehavior extends Behavior
{
  constructor(ctx)
  {
    super(ctx);
  }

  update()
  {
    super.update();
    if (this.ctx === null || this.ctx.getTarget() === null)
      return;

    // allows for transparency, target could either be a Vector, or an entity.
    const targetPos = new Vector(this.ctx.getTarget().getX(), this.ctx.getTarget().getY());

    const desiredVelocity = targetPos.subtract(this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity());

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }

  getStoppingDistance()
  {
    if (this.ctx !== null)
      return this.ctx.getStoppingDistance();

    return undefined;
  }
}
