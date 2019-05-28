const DEFAULT_CIRCLE_DISTANCE = 15;
const DEFAULT_ANGLE_VARIATION = .7;
const DEFAULT_CIRCLE_RADIUS = 5;

class WanderBehavior extends Behavior
{
  constructor(ctx=null, options={})
  {
    super(ctx);
    this.circleDistance = (options.circleDistance !== undefined) ?
      options.circleDistance : DEFAULT_CIRCLE_DISTANCE;
    this.angleVariation = (options.angleVariation !== undefined) ?
      options.angleVariation : DEFAULT_ANGLE_VARIATION;
    this.circleRadius = (options.circleRadius !== undefined) ?
      options.circleRadius : DEFAULT_CIRCLE_RADIUS;
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
      return null;

    const circleCenter = this.ctx.getVelocity()
      .clone().setMagnitude(this.circleDistance);

    const displacement = new Vector(0, 1);
    displacement.setMagnitude(this.circleRadius);

    displacement.setAngle(this.wanderAngle);

    this.updateWanderAngle();

    return circleCenter.add(displacement);
  }

  update()
  {
    if (this.ctx === null)
      return this.ctx;

    const steering = this.calculateWanderForce();

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }
}
