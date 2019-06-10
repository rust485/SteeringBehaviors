class Display
{
  static displayAdapter;

  static setInstance(adapter)
  {
    Display.displayAdapter = adapter;
  }

  static getInstance()
  {
    return Display.displayAdapter;
  }
}
