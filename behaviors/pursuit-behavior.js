const DEFAULT_PREDICTION_TUNING = .5;

class PursuitBehavior extends Behavior
{
  constructor(ctx=null, target=null, options={})
  {
    super(ctx);

    // the behavior also has a target, the target of the entity
    // is more of a storage for the main target of the entity
    this.target = target;
    this.predictionTuning = (options.predictionTuning !== undefined) ?
      options.predictionTuning : DEFAULT_PREDICTION_TUNING;
  }

  getTarget()
  {
    return this.target;
  }

  setTarget(target)
  {
    return this.target = target;
  }

  getPredictionTuning()
  {
    return this.predictionTuning;
  }

  setPredictionTuning(tuning)
  {
    return this.predictionTuning = tuning;
  }

  update()
  {
    super.update();

    if (this.ctx === null || this.target === null)
      return;

    const distToTarget = Vector.subtract(this.target.getPosition(),
      this.ctx.getPosition()).magnitude();

    const lookAhead = (distToTarget / this.ctx.getMaxSpeed()) * this.predictionTuning;

    const predictedTargetPos = PursuitBehavior.predictPosition(this.target.getPosition(),
      this.target.getVelocity(), lookAhead);

    const desiredVelocity = Vector.subtract(predictedTargetPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    const stoppingDistance = this.ctx.getStoppingDistance();

    if (distToTarget <= stoppingDistance)
      desiredVelocity.setMagnitude(this.ctx.maxSpeed * distToTarget / stoppingDistance);


    const steering = Vector.subtract(desiredVelocity, this.ctx.getVelocity());

    this.ctx.updateVelocity(steering);
    this.ctx.move();
    return this.ctx;
  }

  static predictPosition(position, velocity, time)
  {
    return Vector.add(velocity.clone().scale(time), position);
  }
}
