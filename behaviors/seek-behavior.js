class SeekBehavior extends Behavior
{
  getSteering()
  {
    const target = this.ctx.getTarget();
    if (target === null)
      return new Vector(0, 0);

    // allows for transparency, target could either be a Vector, or an entity.
    const targetPos = new Vector(target.getX(), target.getY());

    const desiredVelocity = Vector.subtract(targetPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const stoppingDistance = this.ctx.getStoppingDistance();
    const distToTarget = Vector.subtract(targetPos, this.ctx.getPosition()).magnitude();

    if (distToTarget <= stoppingDistance)
      desiredVelocity.setMagnitude(this.ctx.maxSpeed * distToTarget / stoppingDistance);

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity());
  }
}
