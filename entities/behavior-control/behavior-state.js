class BehaviorState
{
  // entry and exit actions?
  constructor(ctx, behavior)
  {
    this.ctx = ctx;
    this.behavior = behavior;
  }

  enter()
  {
    return null;
  }

  exit()
  {
    return null;
  }

  update()
  {
    return this.behavior.update();
  }

  checkTransition(manager)
  {
    return null;
  }

  setTarget(targ)
  {
    if (this.behavior !== undefined && this.behavior.setTarget !== undefined)
      this.behavior.setTarget(targ);

    return this;
  }

  getTarget()
  {
    if (this.behavior.getTarget !== undefined)
      return this.behavior.getTarget();

    return null;
  }
}
