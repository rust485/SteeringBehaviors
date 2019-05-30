class BehaviorManager
{
  // use push down automata?
  constructor(ctx=null, options={})
  {
    this.ctx = ctx;
    this.stack = new Stack();
  }

  getContext()
  {
    return this.ctx;
  }

  setContext(ctx)
  {
    return this.ctx = ctx;
  }

  getCurrentState()
  {
    return this.stack.peek();
  }

  setCurrentState(state)
  {
    this.stack.push(state);
    state.enter();
    return this;
  }

  exitCurrentState()
  {
    const state = this.stack.pop();
    state.exit();
    return this;
  }

  update()
  {
    const state = this.getCurrentState();
    if (state === null)
      return this.ctx;

    state.update();
    state.checkTransition(this);

    return this.ctx;
  }
}
