class KeyboardControlledBehaviorManagerFactory extends GenericBehaviorManagerFactory
{
  static createBehaviorStates(ctx, options)
  {
    const controlledState = new BehaviorState(ctx, new ControlledBehavior(ctx, options));

    return controlledState;
  }
}
