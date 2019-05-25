const DEFAULT_PADDING = 100;
const DEFAULT_FOLLOW_SPEED = 3;

class Camera
{
  constructor(follow=null, cameraOptions={})
  {
    this.follow = follow;
    this.center = (follow !== null) ? new Vector(follow.getX(), follow.getY()) : new Vector(0, 0);

    this.padding = (options.padding !== undefined) ?
      options.padding : DEFAULT_PADDING;

    this.followSpeed = (options.followSpeed !== undefined) ?
      options.followSpeed : DEFAULT_FOLLOW_SPEED;
  }


  setFollow(follow)
  {
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
      return Vector.subtract(this.center, this.follow.getPosition());
    return null;
  }

  needsAdjustment()
  {
    const v = this.vectorToFollow();
    return v !== null && v.magnitude() > paddingRadius;
  }
}
