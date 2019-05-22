class Engine
{
  constructor()
  {
    this.entities = new EntityList();
  }

  update()
  {
    const ents = this.entities.toArray();

    for (let i = 0; i < ents.length; i++)
      ents[i].update();
  }

  addEntity(e)
  {
    return this.entities.addEntity(e);
  }

  removeEntityById(id)
  {
    return this.entities.removeEntityById(id);
  }

  getEntities()
  {
    return this.entities.toArray();
  }

  generateId()
  {
    return Math.random().toString(36).substring(2)
               + (new Date()).getTime().toString(36);
  }

  render()
  {
    background(0);

    const ents = this.entities.toArray();

    for (let i = 0; i < ents.length; i++)
      ents[i].render();
  }
}
