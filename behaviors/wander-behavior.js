class WanderBehavior extends Behavior
{
  static DEFAULT_CIRCLE_RADIUS = 5;
  static DEFAULT_CIRCLE_DISTANCE = 15;
  static DEFAULT_ANGLE_VARIATION = .7;
  constructor(ctx=null, options={})
  {
    super(ctx, options);
    this.circleDistance = (options.circleDistance !== undefined) ?
      options.circleDistance : WanderBehavior.DEFAULT_CIRCLE_DISTANCE;
    this.angleVariation = (options.angleVariation !== undefined) ?
      options.angleVariation : WanderBehavior.DEFAULT_ANGLE_VARIATION;
    this.circleRadius = (options.circleRadius !== undefined) ?
      options.circleRadius : WanderBehavior.DEFAULT_CIRCLE_RADIUS;
    this.wanderAngle = 0;
  }

  getCircleDistance()
  {
    return this.circleDistance;
  }

  setCircleDistance(dist)
  {
    return this.circleDistance = dist;
  }

  getAngleVariation()
  {
    return this.angleVariation;
  }

  setAngleVariation(variation)
  {
    return this.angleVariation = variation;
  }

  getCircleRadius()
  {
    return this.circleRadius;
  }

  setCircleRadius(rad)
  {
    return this.circleRadius = rad;
  }

  getWanderAngle()
  {
    return this.wanderAngle;
  }

  setWandeAngle(angle)
  {
    return this.wanderAngle = angle;
  }

  updateWanderAngle()
  {
    return this.wanderAngle += (Math.random() * this.angleVariation) -
      (this.angleVariation * .5);
  }

  calculateWanderForce()
  {
    if (this.ctx === null)
      return new Vector(0, 0);

    const circleCenter = this.ctx.getVelocity()
      .clone().setMagnitude(this.circleDistance);

    const displacement = new Vector(0, 1);
    displacement.setMagnitude(this.circleRadius);

    displacement.setAngle(this.wanderAngle);

    this.updateWanderAngle();

    return circleCenter.add(displacement);
  }

  getSteering()
  {
    return this.calculateWanderForce();
  }
}
