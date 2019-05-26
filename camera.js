const DEFAULT_PADDING = 100;
const DEFAULT_FOLLOW_SPEED = 3;
const DEFAULT_BOUNDS = new Vector(800, 800);

class Camera
{
  constructor(bounds=DEFAULT_BOUNDS.clone(), follow=null, options={})
  {
    this.bounds = bounds
    this.follow = follow;
    this.center = (follow !== null) ? new Vector(follow.getX(), follow.getY()) : new Vector(0, 0);

    this.padding = (options.padding !== undefined) ?
      options.padding : DEFAULT_PADDING;

    this.followSpeed = (options.followSpeed !== undefined) ?
      options.followSpeed : DEFAULT_FOLLOW_SPEED;
  }

  getBounds()
  {
    return this.bounds;
  }

  setBounds()
  {
    return this.bounds;
  }

  setFollow(follow)
  {
    this.center = new Vector(follow.getX(), follow.getY());
    return this.follow = follow;
  }

  getFollow()
  {
    return this.follow;
  }

  setCenter(center)
  {
    return this.center = center;
  }

  getCenter()
  {
    return this.center;
  }

  setPadding(padding)
  {
    return this.padding = padding;
  }

  getPadding()
  {
    return this.padding;
  }

  setFollowSpeed(speed)
  {
    return this.followSpeed = speed;
  }

  getFollowSpeed()
  {
    return this.followSpeed;
  }

  getTopLeft()
  {
    return Vector.subtract(this.center, this.bounds.clone().scale(1/2));
  }

  getBottomRight()
  {
    return Vector.add(this.center, this.bounds.clone().scale(1/2));
  }

  update()
  {
    if (this.needsAdjustment())
    {
      const dir = this.vectorToFollow();
      dir.setMagnitude(this.followSpeed);

      this.center.add(dir);
    }

    return this;
  }

  vectorToFollow()
  {
    if (this.follow !== null)
      return Vector.subtract(this.follow.getPosition(), this.center);
    return null;
  }

  needsAdjustment()
  {
    const v = this.vectorToFollow();
    return v !== null && v.magnitude() > this.padding;
  }

  withinWindow(obj)
  {
    return obj.within(this.getTopLeft(), this.getBottomRight());
  }

  translateFromScreenPosition(pos)
  {
    const screenMiddle = this.bounds.clone().scale(1/2);

    const d = Vector.subtract(pos, screenMiddle);

    return Vector.add(this.center, d);
  }

  translateToScreenPosition(pos)
  {
    const screenMiddle = this.bounds.clone().scale(1/2);

    const d = Vector.subtract(pos, this.center);

    return Vector.add(screenMiddle, d);
  }

  render(renderList)
  {
    background(0);
    for (let i = 0; i < renderList.length; i++)
      renderList[i].render(this.translateToScreenPosition(renderList[i].getPosition()));
  }

  static withinWindow(obj, topLeft, topRight)
  {
    return obj.within(topLeft, topRight);
  }
}
