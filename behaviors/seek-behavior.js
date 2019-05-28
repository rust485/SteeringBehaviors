class SeekBehavior extends Behavior
{
  constructor(ctx=null, target=null)
  {
    super(ctx);

    // the behavior also has a target, the target of the entity
    // is more of a storage for the main target of the entity
    this.target = target;
  }

  getTarget()
  {
    return this.target;
  }

  setTarget(target)
  {
    return this.target = target;
  }

  getSteering()
  {
    if (this.target === null)
      return new Vector(0, 0);

    // allows for transparency, target could either be a Vector, or an entity.
    const targetPos = new Vector(this.target.getX(), this.target.getY());

    const desiredVelocity = Vector.subtract(targetPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const stoppingDistance = this.ctx.getStoppingDistance();
    const distToTarget = Vector.subtract(targetPos, this.ctx.getPosition()).magnitude();

    if (distToTarget <= stoppingDistance)
      desiredVelocity.setMagnitude(this.ctx.maxSpeed * distToTarget / stoppingDistance);

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity());
  }
}
