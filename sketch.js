const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const PLAYER_TAG = 'player';
const ENGINE_OPTIONS = {
	camera: {
		bounds: new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		options: {
			padding: 100,
		}
	}
}

const MIN_BOUND = new Vector(0, 0);
const MAX_BOUND = new Vector(CANVAS_WIDTH, CANVAS_HEIGHT);

let fps = 80;

const engine = new Engine(ENGINE_OPTIONS);
const mouse = new Mouse();
const factory = new EntityFactory(CANVAS_WIDTH, CANVAS_HEIGHT);

const keyCodes = [];

function setup()
{
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(fps);

  // const player = factory.createControlledEntity(MIN_BOUND, MAX_BOUND);
  const player = factory.createSeekingEntity(MIN_BOUND, MAX_BOUND,
		{ target: mouse, maxSpeed: 5.0 });
	player.addTags(PLAYER_TAG);
  engine.addEntity(player);

	// engine.getCamera().setFollow(player);
	// engine.getCamera().setFollowSpeed(player.getMaxSpeed);
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{
	const entity = factory.createSeekingEntity(MIN_BOUND, MAX_BOUND);

	entity.setTarget(engine.getEntities(PLAYER_TAG)[0]);

	entity.getBehavior().setTarget(entity.getTarget());
	engine.addEntity(entity);
}

function draw()
{
  engine.update();
  engine.render();
	mouse.update();
}
