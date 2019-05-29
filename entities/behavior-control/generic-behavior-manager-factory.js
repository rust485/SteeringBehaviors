class GenericBehaviorManagerFactory
{
  static createGenericBehaviorManager(ctx, options={})
  {
    const startingState = this.createBehaviorStates(ctx, options);

    const manager = new BehaviorManager(ctx);

    manager.setCurrentState(startingState);
    return manager;
  }

  static createBehaviorStates(ctx, options)
  {
    const wanderingState = new BehaviorState(ctx, new WanderBehavior(ctx));
    const pursuingState = new BehaviorState(ctx, new PursuitBehavior(ctx, options));
    const seekingState = new BehaviorState(ctx, new SeekBehavior(ctx, options));

    wanderingState.checkTransition = (manager) => {
      const target = this.ctx.getTarget();
      if (target === null)
        return;

      if (this.ctx.canSee(target))
      {
        pursuingState.setTarget(target);
        manager.setCurrentState(pursuingState);
      }
    };

    pursuingState.checkTransition = (manager) => {
      if (this.target === null)
        manager.popCurrentState();

      if (!this.ctx.canSee(target))
      {
        manager.popCurrentState();
        // go to the target's last known location
        seekingState.setTarget(target.getPosition());
        manager.setCurrentState(seekingState);
      }
    };

    seekingState.checkTransition = (manager) => {
      if (this.target === null)
        manager.popCurrentState();

      if (this.getPosition().equals(this.target.getPosition()))
        manager.popCurrentState();

      if (this.ctx.canSee(this.ctx.getTarget()))
      {
        manager.popCurrentState();
        pursuingState.setTarget(this.ctx.getTarget());
        manager.setCurrentState(pursuingState);
      }
    }

    return wanderingState;
  }
}
