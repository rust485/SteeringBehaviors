class CompositeBehavior extends Behavior
{
  constructor(ctx=null, options={})
  {
    super(ctx, options);
    this.behaviors = (options.behaviors !== undefined) ?
      options.behaviors : [];
  }

  getBehaviors()
  {
    return this.behaviors;
  }

  addBehavior(b)
  {
    this.behaviors.push(b);
    return this;
  }

  removeBehavior(b)
  {
    this.behaviors = this.behaviors.filter(behavior => !behavior.equals(b));
    return this;
  }

  setBehaviors(b)
  {
    this.behaviors = b;
  }

  getSteering()
  {
    const steering = new Vector(0, 0);

    for (let i = 0; i < this.behaviors.length; i++)
      steering.add(behaviors[i].getSteering());

    return steering;
  }
}
