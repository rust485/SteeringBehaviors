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
      const target = wanderingState.getTarget();
      if (target === null)
        return;

      if (wanderingState.ctx.canSee(target))
      {
        pursuingState.setTarget(target);
        return manager.setCurrentState(pursuingState);
      }
    };

    pursuingState.checkTransition = (manager) => {
      // if the target is no longer set, go back to previous state
      const target = pursuingState.getTarget();
      if (target === null)
        return manager.exitCurrentState();

      // if the target is no longer in view, seek to last known position
      // and remove pursuit state from the history
      if (!pursuingState.ctx.canSee(target))
      {
        manager.exitCurrentState();
        // go to the target's last known location
        seekingState.setTarget(target.getPosition().clone());
        return manager.setCurrentState(seekingState);
      }
    };

    seekingState.checkTransition = (manager) => {
      const target = seekingState.getTarget();

      if (target === null)
        return manager.exitCurrentState();

      const targPos = new Vector(target.getX(), target.getY());

      // if object this is attached to has sight of the target
      if (seekingState.ctx.canSee(pursuingState.getTarget()))
      {
        manager.exitCurrentState();
        return manager.setCurrentState(pursuingState);
      }

      // if object this is attached to reaches the target position and cannot see
      // the target, go to the most recent state
      if (seekingState.ctx.getPosition().equals(targPos))
        return manager.exitCurrentState();
    }

    seekingState.exit = () => {
      this.target = null;
    };

    return wanderingState;
  }
}
