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
}
