class FleeBehavior extends Behavior
{
  constructor(ctx=null, avoid=null)
  {
    this.super(ctx);

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


    const stoppingDistance = this.ctx.getStoppingDistance();
    const distToTarget = Vector.subtract(targetPos, this.ctx.getPosition()).magnitude();

    if (distToTarget <= stoppingDistance)
      desiredVelocity.setMagnitude(this.ctx.maxSpeed * distToTarget / stoppingDistance);


    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .scale(-1);

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }
}
