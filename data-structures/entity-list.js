class EntityList
{
  constructor()
  {
    this.map = {};
  }

  getEntityById(id)
  {
    return this.map[id];
  }

  addEntity(entity)
  {
    return this.map[entity.id] = entity;
  }

  removeEntityById(id)
  {
    const entity = this.map[id];
    delete this.map[id];
    return entity;
  }

  toArray()
  {
    const array = [];
    const keys = Object.keys(this.map);

    for (let i = 0; i < keys.length; i++)
      array.push(this.map[keys[i]]);

    return array;
  }
}
