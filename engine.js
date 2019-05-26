class Engine
{
  constructor(options={})
  {
    this.entities = new EntityList();
    const camParams = {};
    if (options.camera !== undefined)
    {
      camParams.follow = (options.camera.follow !== undefined) ?
        options.camera.follow : null;
      camParams.bounds = options.camera.bounds;
      camParams.options = options.camera.options;
    }

    this.camera = new Camera(camParams.bounds,
      camParams.follow, camParams.options);
  }

  update()
  {
    const ents = this.entities.toArray();

    for (let i = 0; i < ents.length; i++)
      ents[i].update();
  }

  addEntity(e)
  {
    if (e.id === undefined)
      e.id = this.generateId();
    return this.entities.addEntity(e);
  }

  removeEntityById(id)
  {
    return this.entities.removeEntityById(id);
  }

  getEntities(tag=undefined)
  {
    if (tag === undefined)
      return this.entities.toArray();

    return this.entities.toArray().filter(e => e.containsTag(tag));
  }

  getCamera()
  {
    return this.camera;
  }

  setCamera(cam)
  {
    return this.camera = cam;
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
    ents.forEach(e => e.render());
    // this.camera.render(ents);
  }
}
