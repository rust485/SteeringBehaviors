class BehaviorManagerFactory
{
  static createBehaviorManager(ctx, options={})
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
      const ctxTarget = wanderingState.ctx.getTarget();
      if (ctxTarget === null)
        return;

      if (wanderingState.ctx.canSee())
      {
        pursuingState.setTarget(ctxTarget);
        manager.setCurrentState(pursuingState);
      }
    };

    pursuingState.checkTransition = (manager) => {
      // if the target is no longer set, go back to previous state
      const ctxTarget = wanderingState.ctx.getTarget();
      if (pursuingState.target === null)
        return manager.popCurrentState();

      // if the target is no longer in view, seek to last known position
      // and remove pursuit state from the history
      if (!pursuingState.ctx.canSee(target))
      {
        manager.popCurrentState();
        // go to the target's last known location
        seekingState.setTarget(target.getPosition());
        manager.setCurrentState(seekingState);
      }
    };

    seekingState.checkTransition = (manager) => {
      if (seekingState.target === null)
        manager.popCurrentState();

      const targPos = new Vector(seekingState.target.getX(), seekingState.target.getY());

      // if object this is attached to has sight of the target
      if (seekingState.ctx.canSee(pursuingState.getTarget()))
      {
        manager.popCurrentState();
        pursuingState.setTarget(seekingState.ctx.getTarget());
        manager.setCurrentState(pursuingState);
      }

      // if object this is attached to reaches the target position and cannot see
      // the target, go to the most recent state
      if (seekingState.ctx.getPosition().equals(targPos))
        manager.popCurrentState();

    }

    return wanderingState;
  }
}
