class FleeBehavior extends Behavior
{
  constructor(ctx=null, avoid=null)
  {
    this.super(ctx);

    this.avoid = avoid;
  }

  setAvoid(e)
  {
    return this.avoid = e;
  }

  getAvoid()
  {
    return this.avoid;
  }

  update()
  {
    if (this.avoid === null)
      return this.ctx;

    
  }
}
