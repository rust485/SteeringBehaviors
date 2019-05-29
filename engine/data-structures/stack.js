class Stack
{
  constructor()
  {
    this.elements = [];
  }

  getElements()
  {
    return this.elements;
  }

  getSize()
  {
    return this.elements.length;
  }

  isEmpty()
  {
    return this.elements.length === 0;
  }

  push(element)
  {
    return this.elements.push(element);
  }

  pop()
  {
    if (this.isEmtpy())
      return null;
    return this.elements.pop();
  }

  peek()
  {
    if (this.isEmtpy())
      return null;
    return this.elements[this.elements.length - 1];
  }
}
