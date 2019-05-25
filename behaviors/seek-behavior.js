class SeekBehavior extends Behavior
{
  constructor(ctx, target=null)
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

  update()
  {
    super.update();

    if (this.ctx === null || this.target === null)
      return;

    // allows for transparency, target could either be a Vector, or an entity.
    const targetPos = new Vector(this.target.getX(), this.target.getY());

    const desiredVelocity = Vector.subtract(targetPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());


    const stoppingDistance = this.ctx.getStoppingDistance();
    const distToTarget = Vector.subtract(targetPos, this.ctx.getPosition()).magnitude();

    if (distToTarget <= stoppingDistance)
      desiredVelocity.setMagnitude(this.ctx.maxSpeed * distToTarget / stoppingDistance);


    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity());

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }
}
