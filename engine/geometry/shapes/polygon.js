/**
 * Represents a 2D polygon. Note, the center is implied to exist at the origin.
 */
class Polygon
{
  /**
   * Creates a new polygon. Note, the order of the vertices matters, as
   * vertex i has an edge to vertex (i + 1) % vertices.length
   * @method constructor
   * @param  {Array}     vertices  the vertices of the polygon, relative to the origin with 0 rotation.
   * @param  {Vector}    position  the center of the polygon. The vertices will be translated to this position
   *                               on initialization.
   * @param  {Number}    rotation  the rotation of this Polygon about the origin.
   *                               The vertices will be rotated about the origin, then translated during
   *                               initialization.
   * @param  {Boolean}   process   set to true if the vertices should be rotated and translated to
   *                               the position and rotation specified, otherwise set to false.
   */
  constructor(vertices, position, rotation=0, process=true)
  {
    this.vertices = vertices;
    this.position = new Vector(0, 0);
    this.rotation = 0;

    if (process)
      this.init(position, rotation);
  }

  init(position, rotation)
  {
    this.setRotation(rotation);
    this.setPosition(position);
  }

  getPosition()
  {
    return this.position;
  }

  setPosition(position)
  {
    const diff = Vector.subtract(position, this.position);
    return this.move(diff);
  }

  getRotation()
  {
    return this.rotation;
  }

  setRotation(theta)
  {
    const diff = theta - this.rotation;
    return this.rotate(diff);;
  }

  rotate(theta)
  {
    for (let vert of this.vertices)
    {
      // first translate the vertex to be relative to this polygon's center
      const localized = Vector.subtract(vert, this.position);

      localized
        .rotate(theta) // rotate the localized vertex
        .add(this.position); // translate back to world coordinates

      vert.set(localized.getX(), localized.getY());
    }

    this.rotation += theta;
    return this;
  }

  move(translation)
  {
    for (let vert of this.vertices)
      vert.add(translation);

    this.position.add(translation);
    return this;
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
      vertices.push(Vector.rotate(vertex, rotation).add(translation))

    return vertices;
  }

  getTranslatedVertices(translation)
  {
    const verts = [];
    for (let vertex of this.vertices)
      verts.push(Vector.add(vertex, translation));

    return verts;
  }

  render(screenPos, options={})
  {
    const translation = Vector.subtract(screenPos, this.position);
    const vertsInScreen = this.getTranslatedVertices(translation);
    return Display.getInstance().drawPolygon(vertsInScreen, options)
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
    // this doesn't work for some reason
    const verts = [];
    for (let vertex of this.vertices)
      verts.push(vertex.clone());

    return new Polygon(verts, this.position.clone(), this.rotation, false);
  }
}
