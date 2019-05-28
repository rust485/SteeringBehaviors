class PursuitBehavior extends Behavior
{
  static DEFAULT_PREDICTION_TUNING = .1;

  constructor(ctx=null, target=null, options={})
  {
    super(ctx);

    // the behavior also has a target, the target of the entity
    // is more of a storage for the main target of the entity
    this.target = target;
    this.predictionTuning = (options.predictionTuning !== undefined) ?
      options.predictionTuning : PursuitBehavior.DEFAULT_PREDICTION_TUNING;
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

  getSteering()
  {
    if (this.target === null)
      return new Vector(0, 0);
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

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity());
  }

  static predictPosition(position, velocity, time)
  {
    return Vector.add(velocity.clone().scale(time), position);
  }
}
