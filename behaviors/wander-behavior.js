class WanderBehavior extends Behavior
{
  constructor(ctx=null, circleDistance=5)
  {
    super(ctx);
    this.circleDistance = circleDistance;
  }

  getCircleDistance()
  {
    return this.circleDistance;
  }

  setCircleDistance(dist)
  {
    return this.circleDistance = dist;
  }

  update()
  {
    if (this.ctx === null)
      return this.ctx;

    const circleCenter = this.ctx.getVelocity()
      .clone().setMagnitude(circleDistance);

    const displayment = new Vector(0, -1);
    displacement.setMagnitude(CIRCLE_RADIUS);

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }
}
