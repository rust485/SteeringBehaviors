class Behavior
{
  constructor(ctx=null)
  {
    this.ctx = ctx;
  }

  setContext(ctx)
  {
    return this.ctx = ctx;
  }

  update()
  {
    return this.ctx;
  }

  setTarget()
  {
    return undefined;
  }
}
