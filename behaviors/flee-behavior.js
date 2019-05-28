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

  getSteering()
  {
    if (this.avoid === null)
      return new Vector(0, 0);

    const avoidPos = new Vector(this.avoid.getX(), this.avoid.getY());

    const desiredVelocity = Vector.subtract(avoidPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .scale(-1);
  }
}
