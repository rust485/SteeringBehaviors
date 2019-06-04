/**
 * Represents a 2D polygon. Note, the center is implied to exist at the origin.
 */
class Polygon
{
  /**
   * Creates a new polygon. Note, the order of the vertices matters, as
   * vertex i has an edge to vertex (i + 1) % vertices.length
   * @method constructor
   * @param  {Array}     [vertices=[]]  the vertices of the polygon, relative to the
   *                                    position of the polygon
   * @param  {Array}     [edges]
   */
  constructor(vertices=[], edges=undefined)
  {
    this.vertices = vertices;
    if (edges === undefined)
      this.initEdges()
    else
      this.edges = edges;
  }

  initEdges()
  {
    this.edges = [];
    if (this.vertices.length > 1)
      for (let i = 0; i < this.vertices.length - 1; i++)
        this.edges.push(new Line(this.vertices[i], this.vertices[i+1]));
  }

  getEdges()
  {
    return this.edges;
  }

  getVertices()
  {
    return this.vertices;
  }

  /**
   * Returns the points relative to this polygon's position
   * Note: Does not alter this Polygon
   * @method getDerivedVertices
   * @param  {Object}     [options={}]  allowed options are
   *                                      - translation: move all vertices to be relative to the specified translation
   *                                      - rotation: rotate all points about the origin by a specified theta
   * @return {Vector[]}                 returns an array consisting of this polygon's vertices after the optional
   *                                    operations have been applied
   */
  getDerivedVertices(options={})
  {
    const vertices = [];

    const translation = (options.translation !== undefined) ?
      options.translation : new Vector(0, 0);
    const rotation = (options.rotation !== undefined) ?
      options.rotation : 0;

    for (let vertex of this.vertices)
      vertices.push(Vector.rotate(vertex, rotation).translate(translation))

    return vertices;
  }

  getRotatedVertices(theta)
  {
    const vertices = [];
    for (let vertex of this.vertices)
      vertices.push(Vector.rotate(vertex, theta));
  }

  render(center, rotation, color)
  {
    const verts = this.getDerivedVertices({ translation: center, rotation })
    return DisplayUtils
      .translateAndDrawPolygon(verts, color)
  }

  withinRect(rect)
  {
    return true;
  }

  /**
   * Performs a deep clone of this Polygon
   * @method clone
   * @return {Polygon} a copy of this Polygon
   */
  clone()
  {
    const verts = [];
    const edges = [];
    for (let vertex of this.vertices)
      verts.push(vertex.clone());

    for (let edge of this.edges)
      edges.push(edge.clone());

    return new Polygon(this.position.clone(), verts, edges);
  }
}
