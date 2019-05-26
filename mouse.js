const DEFAULT_TRANSLATOR = {
  translateFromScreenPosition: (pos) => pos,
}

class Mouse
{
  constructor(x=0, y=0, translator=DEFAULT_TRANSLATOR)
  {
    this.position = new Vector(x, y);
    this.translator = translator;
  }

  setTranslator(t)
  {
    return this.translator = t;
  }

  update()
  {
    this.position.x = (mouseX !== undefined) ? mouseX : 0;
    this.position.y = (mouseY !== undefined) ? mouseY : 0;
  }

  setPosition(x, y)
  {
    this.position = new Vector(x, y);
  }

  getX()
  {
    return this.translator.translateFromScreenPosition(this.position).x;
  }

  getY()
  {
    return this.translator.translateFromScreenPosition(this.position).y;
  }

  getPosition()
  {
    return this.translator.translateFromScreenPosition(this.position);
  }

  getRawX()
  {
    return this.position.x;
  }

  getRawY()
  {
    return this.position.y;
  }

  getRawPosition()
  {
    return this.position;
  }
}
