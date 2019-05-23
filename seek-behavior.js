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
