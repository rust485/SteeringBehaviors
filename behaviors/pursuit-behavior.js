class PursuitBehavior extends Behavior
{
  static DEFAULT_PREDICTION_TUNING = .1;

  constructor(ctx=null, options={})
  {
    super(ctx, options);

    this.predictionTuning = (options.predictionTuning !== undefined) ?
      options.predictionTuning : PursuitBehavior.DEFAULT_PREDICTION_TUNING;
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
    const target = this.ctx.getTarget();
    if (target === null)
      return new Vector(0, 0);

    const distToTarget = Vector.subtract(target.getPosition(),
      this.ctx.getPosition()).magnitude();

    const lookAhead = (distToTarget / this.ctx.getMaxSpeed()) * this.predictionTuning;

    const predictedTargetPos = PursuitBehavior.predictPosition(target.getPosition(),
      target.getVelocity(), lookAhead);

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
