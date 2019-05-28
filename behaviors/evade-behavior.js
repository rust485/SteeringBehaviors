class EvadeBehavior extends Behavior
{
  static DEFAULT_PREDICTION_TUNING = .1;

  constructor(ctx=null, avoid=null, options={})
  {
    super(ctx);

    // the behavior also has a target, the target of the entity
    // is more of a storage for the main target of the entity
    this.avoid = avoid;
    this.predictionTuning = (options.predictionTuning !== undefined) ?
      options.predictionTuning : EvadeBehavior.DEFAULT_PREDICTION_TUNING;
  }

  getAvoid()
  {
    return this.avoid;
  }

  setAvoid(e)
  {
    return this.avoid = e;
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
    if (this.avoid === null)
      return new Vector(0, 0);

    const distToTarget = Vector.subtract(this.avoid.getPosition(),
      this.ctx.getPosition()).magnitude();

    const lookAhead = (distToTarget / this.ctx.getMaxSpeed()) * this.predictionTuning;

    const predictedTargetPos = PursuitBehavior.predictPosition(this.avoid.getPosition(),
      this.avoid.getVelocity(), lookAhead);

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
