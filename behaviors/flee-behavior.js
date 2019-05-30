class FleeBehavior extends Behavior
{
  getSteering()
  {
    const avoid = this.getAvoid();
    if (avoid === null)
      return new Vector(0, 0);

    const avoidPos = new Vector(avoid.getX(), avoid.getY());

    const desiredVelocity = Vector.subtract(avoidPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .scale(-1);
  }
}
