const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;

const PLAYER_TAG = 'player';
const ENGINE_OPTIONS = {
	camera: {
		bounds: new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		options: {
			padding: 300,
		}
	}
}

const FACTORY_OPTIONS = {
	maxSpeed: 3,
	maxForce: 1,
	mass: 1,
	size: 5,
}

const MIN_BOUND = new Vector(0, 0);
const MAX_BOUND = new Vector(CANVAS_WIDTH, CANVAS_HEIGHT);

let fps = 80;

const engine = new Engine(new Mouse(), ENGINE_OPTIONS);
const factory = new EntityFactory(CANVAS_WIDTH, CANVAS_HEIGHT,
	FACTORY_OPTIONS);

const SEEKERS = 5;
const FLEEING = 1;

function setup()
{
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(fps);

  // const player = factory.createControlledEntity(MIN_BOUND, MAX_BOUND);
  const player = factory.createSeekingEntity(MIN_BOUND, MAX_BOUND,
		{ target: engine.getMouse(), speed: 5.0, color: DisplayUtils.colorLookup.GREEN });
	player.addTags(PLAYER_TAG);
  engine.addEntity(player);

	engine.getCamera().setFollow(player);
	engine.getCamera().setFollowSpeed(player.getMaxSpeed());

	for (let i = 0; i < SEEKERS; i++)
	{
		const entity = factory.createSeekingEntity(MIN_BOUND, MAX_BOUND);
		entity.setTarget(player);
		engine.addEntity(entity);
	}

	for (let i = 0; i < FLEEING; i++)
	{
		const entity = factory.createFleeingEntity(MIN_BOUND, MAX_BOUND);
		entity.getBehavior().setAvoid(player);
		entity.setColor(DisplayUtils.colorLookup.BLUE);
		engine.addEntity(entity);
	}
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{
	const position = engine.getMouse().getPosition().clone();

	const entity = factory.createSeekingEntity(MIN_BOUND, MAX_BOUND, { position });

	entity.setTarget(engine.getEntities(PLAYER_TAG)[0]);

	entity.getBehavior().setTarget(entity.getTarget());
	engine.addEntity(entity);
}

function draw()
{
  engine.update();
  engine.render();
}
