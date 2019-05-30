class BehaviorState
{
  // entry and exit actions?
  constructor(ctx, behavior)
  {
    this.ctx = ctx;
    this.behavior = behavior;
  }

  getContext()
  {
    return this.ctx;
  }

  setContext(ctx)
  {
    return this.ctx = ctx;
  }

  getBehavior()
  {
    return this.behavior;
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

  setTarget(t)
  {
    if (this.behavior !== undefined)
      return this.behavior.setTarget(t);
    return null;
  }

  getTarget()
  {
    if (this.behavior !== undefined)
      return this.behavior.getTarget();
    return null;
  }
}
