class CompositeBehavior extends Behavior
{
  constructor(ctx=null, behaviors=[])
  {
    this.ctx = ctx;
    this.behaviors = behaviors;
  }

  getBehaviors()
  {
    return this.behaviors;
  }

  getSteering()
  {
    const steering = new Vector(0, 0);

    for (let i = 0; i < this.behaviors.length; i++)
      steering.add(behaviors[i].getSteering());

    return steering;
  }
}
