class EvadeBehavior extends Behavior
{
  static DEFAULT_PREDICTION_TUNING = .1;

  constructor(ctx=null, options={})
  {
    super(ctx, options);

    // the behavior also has a target, the target of the entity
    // is more of a storage for the main target of the entity
    this.predictionTuning = (options.predictionTuning !== undefined) ?
      options.predictionTuning : EvadeBehavior.DEFAULT_PREDICTION_TUNING;
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
    const avoid = this.getAvoid();
    if (avoid === null)
      return new Vector(0, 0);

    const distToTarget = Vector.subtract(avoid.getPosition(),
      this.ctx.getPosition()).magnitude();

    const lookAhead = (distToTarget / this.ctx.getMaxSpeed()) * this.predictionTuning;

    const predictedTargetPos = PursuitBehavior.predictPosition(avoid.getPosition(),
      avoid.getVelocity(), lookAhead);

    const desiredVelocity = Vector.subtract(predictedTargetPos, this.ctx.getPosition())
      .setMagnitude(this.ctx.getMaxSpeed());

    return Vector.subtract(desiredVelocity, this.ctx.getVelocity())
      .scale(-1);
  }

  static predictPosition(position, velocity, time)
  {
    return Vector.add(velocity.clone().scale(time), position);
  }
}
