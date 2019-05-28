const LEFT = new Vector(-1, 0);
const RIGHT = new Vector(1, 0);
const UP = new Vector(0, -1);
const DOWN = new Vector(0, 1);
const NONE = new Vector(0, 0);

class ControlledBehavior extends Behavior
{
  getSteering()
  {
    let desiredHoriz = new Vector(this.ctx.getVelocity().x, 0).scale(-1);
    if (keyIsDown(LEFT_ARROW))
      desiredHoriz = LEFT.clone();
    else if (keyIsDown(RIGHT_ARROW))
      desiredHoriz = RIGHT.clone();

    let desiredVert = new Vector(0, this.ctx.getVelocity().y).scale(-1);
    if (keyIsDown(UP_ARROW))
      desiredVert = UP.clone();
    else if (keyIsDown(DOWN_ARROW))
      desiredVert = DOWN.clone();

    return Vector.add(desiredVert, desiredHoriz);
  }
}
