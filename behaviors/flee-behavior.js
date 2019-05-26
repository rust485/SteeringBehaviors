class FleeBehavior extends Behavior
{
  constructor(ctx=null, avoid=null)
  {
    super(ctx);

    this.avoid = avoid;
  }

  setAvoid(e)
  {
    return this.avoid = e;
  }

  getAvoid()
  {
    return this.avoid;
  }

  update()
  {
    if (this.ctx === null || this.avoid === null)
      return this.ctx;

    const avoidPos = new Vector(this.avoid.getX(), this.avoid.getY());

    const desiredVelocity = Vector.subtract(avoidPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .scale(-1);

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }
}
