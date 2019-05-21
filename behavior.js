class Behavior
{
  constructor(ctx=undefined)
  {
    this.context = ctx;
  }

  setContext(ctx)
  {
    return this.context = ctx;
  }

  update()
  {
    return this.context;
  }
}
