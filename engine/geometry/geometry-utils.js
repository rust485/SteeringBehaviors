class GeometryUtils
{
  static lineLineIntersection(l1, l2)
  {
    const x1 = l1.first().getX();
    const x2 = l1.second().getX();
    const x3 = l2.first().getX();
    const x4 = l2.second().getX();

    const y1 = l1.first().getY();
    const y2 = l1.second().getY();
    const y3 = l2.first().getY();
    const y4 = l2.second().getY();

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (0 <= t <= 1 && 0 <= u <= 1)
    {
      const xIntersect = x1 + t * (x2 - x1);
      const yIntersect = y1 + t * (y2 - y1);
      return new Vector(xIntersect, yIntersect);
    }
    return null;
  }

  static rayLineIntersect(ray, line)
  {
    const x1 = ray.position().getX();
    const x2 = ray.direction().getX();
    const x3 = line.first().getX();
    const x4 = line.second().getX();

    const y1 = ray.position().getY();
    const y2 = ray.direction().getY();
    const y3 = line.first().getY();
    const y4 = line.second().getY();

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denominator === 0) return null;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (0 <= t <= 1 && 0 <= u)
    {
      const xIntersect = x1 + t * (x2 - x1);
      const yIntersect = y1 + t * (y2 - y1);
      return new Vector(xIntersect, yIntersect);
    }

    return null;
  }
}
