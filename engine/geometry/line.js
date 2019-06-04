class Line
{
  constructor(p1, p2)
  {
    this.first = p1;
    this.second = p2;
  }

  getPoints()
  {
    return [ this.first, this.second ];
  }

  getFirst()
  {
    return this.first;
  }

  setFirst(first)
  {
    return this.first = first;
  }

  getSecond()
  {
    return this.second;
  }

  setSecond(second)
  {
    return this.second = second;
  }

  clone()
  {
    return new Line(this.first, this.second);
  }

  static rotateAboutOrigin(l, theta)
  {
    const line = l.clone();
    line.getFirst().rotate(theta);
    line.getSecond().rotate(theta);
    return line;
  }
}
