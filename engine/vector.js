/**
 * Class for wrapping the logic of a Vector
 */
class Vector
{
	/**
	 * Create a new vector with the given x and y coordinates
	 * @method constructor
	 * @param  {Number}    x horizontal coordinate of the vector
	 * @param  {Number}    y vertical coordinate of the vector
	 */
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	/**
	 * get the x value of this vector
	 * @method getX
	 * @return {Number} the x value of this vector
	 */
	getX()
	{
		return this.x;
	}

	/**
	 * get the y value of this vector
	 * @method getY
	 * @return {Number} the y value of this vector
	 */
	getY()
	{
		return this.y;
	}

	/**
	 * Calculate the magnitude of this vector
	 * @method magnitude
	 * @return {Number}  sqrt(x^2 + y^2)
	 */
	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * Calculate the cartesian distance between this vector and
	 * a given vector
	 * @method distance
	 * @param  {Vector} v the given vector
	 * @return {Number}   the cartesian distance between this vector and the given
	 */
	distance(v)
	{
		return Math.sqrt(Math.abs((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y)));
	}

	/**
	 * Normalizes this vector
	 * @method normalize
	 * @return {Vector}  reference to this Vector after normalizing
	 */
	normalize()
	{
		var mag = this.magnitude();

		// if the magnitude is zero, that means x = 0 and y =0, so just
		// return this vector without normalization
		if (mag == 0) return this;
		this.x /= mag;
		this.y /= mag;

		return this;
	}

	/**
	 * Apply a scalar to this vector
	 * @method scale
	 * @param  {Number} s the scalar
	 * @return {Vector}   reference to this Vector after applying the scalar
	 */
	scale(s)
	{
		this.x *= s;
		this.y *= s;

		return this;
	}

	/**
	 * Subtracts vector v's x and y coordinates from this vector's x
	 * and y coordinates.
	 * @method subtract
	 * @param  {Vector} v vector to subtract out of this vector
	 * @return {Vector}   reference to this vector after applying subtraction
	 */
	subtract(v)
	{
		this.x -= v.x;
		this.y -= v.y;

		return this;
	}

	/**
	 * Adds vector v's x and y coordinates to this vector's x and y coordinates.
	 * @method add
	 * @param  {Vector} v vector to add to this vector
	 * @return {Vector} 	a reference to this vector after the addition
	 */
	add(v)
	{
		this.x += v.x;
		this.y += v.y;

		return this;
	}

	/**
	 * Check if this vector equals another vector
	 * @method equals
	 * @param  {Vector} v vector to compare to
	 * @return {Boolean}  true if this vector's coordinates are the same as the
	 * 										given vector
	 */
	equals(v)
	{
		return this.x === v.x && this.y === v.y;
	}

	/**
	 * Calculate the dot product between this vector and another vector
	 * @method dotProduct
	 * @param  {Vector}   v vector to calculate dot product with
	 * @return {Number}     the dot product between this vector and v
	 */
	dotProduct(v)
	{
		return (this.x * v.x + this.y * v.y);
	}

	/**
	 * Calculate the cross product between this vector and another vector
	 * @method crossProduct
	 * @param  {Vector}     v vector to calculate cross product with
	 * @return {Number}       the cross product between this vector and v
	 */
	crossProduct(v)
	{
		return (this.x * v.y - this.y * v.x);
	}

	/**
	 * Calculate the angle between this vector and v about the origin
	 * @method angleBetween
	 * @param  {Vector}     v vector to calculate the angle between
	 * @return {Number}       angle between this vector and v in degrees
	 */
	angleBetween(v)
	{
		const dot = this.dotProduct(v);
		const det = this.crossProduct(v);
		return Math.atan2(det, dot);
	}

	/**
	 * Calculate the angle between 2 vectors
	 * @method angleBetweenTwoVectors
	 * @param  {Vector}               v1 first vector
	 * @param  {Vector}               v2 second vector
	 * @return {Number}                  angle from v1 to v2 in degrees
	 */
	static angleBetweenTwoVectors(v1, v2)
	{
		return Math.acos(v1.dotProduct(v2) / ((Math.sqrt(v1.x * v1.x + v1.y * v1.y)) * (Math.sqrt(v2.x * v2.x + v2.y * v2.y))));
	}

	/**
	 * Convert this vector to string form
	 * @method toString
	 * @return {String} (x, y)
	 */
	toString()
	{
		return '(' + this.x + ', ' + this.y + ')';
	}

	/**
	 * Sets this vector's rotation to match that of dir
	 * @method rotateToVector
	 * @param  {Vector} dir direction of this vector after the rotation
	 * @return {Vector}     a reference to this vector after applying the rotation
	 */
	rotateToVector(dir)
	{
		const mag = this.magnitude();
		this.x = dir.x;
		this.y = dir.y;
		this.normalize();
		this.scale(mag);
		return this;
	}

	/**
	 * Sets the angle of this Vector in radians from the
	 * positive x axis.
	 * @method setAngle
	 * @param  {Number} theta radians between this vector and the positive x axis
	 * @return {Vector} 			a reference to this vector after the angle has been set
	 */
	setAngle(theta)
	{
		const mag = this.magnitude();
		this.x = Math.cos(theta) * mag;
		this.y = Math.sin(theta) * mag;
		return this;
	}

	/**
	 * Calculate the angle between this vector and the positive
	 * x axis
	 * @method angleFromPositiveXAxis
	 * @return {Number}        angle between this vector and the positive
	 * 												 x axis in radians
	 */
	angleFromPositiveXAxis()
	{
		const signY = (this.y !== 0) ?
			this.y / Math.abs(this.y) : 1;
		return signY * Math.acos(this.x / this.magnitude());
	}

	/**
	 * Sets the magnitude to the specified value
	 * @method setMagnitude
	 */
	setMagnitude(mag)
	{
		this.normalize();
		this.scale(mag);
		return this;
	}

	/**
	 * Truncates this vector. If this vector's magnitude is greater than l, the
	 * magnitude will be reduced to l. If this vector's magnitude is less than l,
	 * it will not be altered.
	 * @method limit
	 * @param  {Number} l magnitude to truncate by
	 * @return {Vector}   a reference to this vector after the truncation
	 */
	limit(l)
	{
		if (this.magnitude() > l)
			this.setMagnitude(l);

		return this;
	}

	/**
	 * Returns a new vector resulting from the subtraction of v2 from v1, without
	 * altering either v1 or v2.
	 * @method subtract
	 * @param  {Vector} v1 vector to subtract from
	 * @param  {Vector} v2 vector to subtract
	 * @return {Vector}    the resulting vector produced by v1 - v2
	 */
	static subtract(v1, v2)
	{
		const v = v1.clone();

		return v.subtract(v2);
	}

	/**
	 * Returns a new vector resulting from the addition of v2 from v1, without
	 * altering either v1 or v2.
	 * @method add
	 * @param  {Vector} v1 vector to add to
	 * @param  {Vector} v2 vector to add
	 * @return {Vector}    the resulting vector produced by v1 + v2
	 */
	static add(v1, v2)
	{
		const v = v1.clone();

		return v.add(v2);
	}

	clone()
	{
		return new Vector(this.x, this.y);
	}

	/**
	 * Checks if this Vector is within a rectanglular area
	 * @method isWithinRect
	 * @param  {Vector}     min top left corner
	 * @param  {Vector}     max bottom right corner
	 * @return {Boolean}        true if this Vector is within the bounds presented
	 * 													by min and max
	 */
	isWithinRect(min, max)
	{
		return (min.x < this.x && min.y < this.y &&
			max.x > this.x && max.y > this.y);
	}

	/**
	 * Rotate this vector by theta (in radians)
	 * @method rotate
	 * @param  {Number} theta angle to rotate by in radians
	 * @return {Vector}       a reference to this Vector after rotation
	 */
	rotate(theta)
	{
		const x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
		const y = this.x * Math.sin(theta) + this.y * Math.cos(theta);

		this.x = x;
		this.y = y;

		return this;
	}

	static rotate(vector, theta)
	{
		return vector.clone().rotate(theta);
	}

	static scale(v, s)
	{
		return v.clone().scale(s);
	}

	set(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	toString()
	{
		return '(' + this.x + ', ' + this.y + ')';
	}
}
