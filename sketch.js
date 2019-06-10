Display.setInstance(new P5DisplayAdapter());

const DEBUG_MOUSE_POSITION = 'mouse-position';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const PLAYER_SPEED = 5.0;
const PLAYER_COLOR = Display.getInstance().color.GREEN;
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

const min = new Vector(0, 0);
const max = new Vector(CANVAS_WIDTH, CANVAS_HEIGHT);

const bounds = { min, max };

const fps = 80;

const engine = new Engine(new Mouse(), ENGINE_OPTIONS);
const factory = new EntityFactory(CANVAS_WIDTH, CANVAS_HEIGHT,
	FACTORY_OPTIONS);

const SEEKERS = 0;
const PURSUING = 0;
const FLEEING = 0;
const WANDERING = 0;
const EVADING = 0;
const GENERIC = 0;

function setup()
{
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(fps);

	const player = initPlayer();
	initEntities(player);
}

function initPlayer()
{
	// const player = factory.createControlledEntity(MIN_BOUND, MAX_BOUND);
	const player = factory.createMouseControlledEntity({
		mouse: engine.getMouse(),
		speed: PLAYER_SPEED,
		color: PLAYER_COLOR,
		bounds
	});
	player.addTags(PLAYER_TAG);
	engine.addEntity(player);

	engine.getCamera().setFollow(player);
	engine.getCamera().setFollowSpeed(player.getMaxSpeed());

	return player;
}

function initEntities(player)
{
	const disp = Display.getInstance();
	for (let i = 0; i < SEEKERS; i++)
	{
		const entity = factory.createSeekingEntity({ bounds });
		entity.setColor(disp.color.RED);
		entity.setTarget(player);
		engine.addEntity(entity);
	}

	for (let i = 0; i < FLEEING; i++)
	{
		const entity = factory.createFleeingEntity({ bounds });
		entity.setColor(disp.color.BLUE);
		entity.setAvoid(player);
		engine.addEntity(entity);
	}

	for (let i = 0; i < WANDERING; i++)
	{
		const entity = factory.createWanderingEntity({ bounds });
		entity.setColor(disp.color.YELLOW);
		engine.addEntity(entity);
	}

	for (let i = 0; i < PURSUING; i++)
	{
		const entity = factory.createPursuingEntity({ bounds });
		entity.setColor(disp.color.PINK);
		entity.setTarget(player);
		engine.addEntity(entity);
	}

	for (let i = 0; i < EVADING; i++)
	{
		const entity = factory.createEvadingEntity({ bounds });
		entity.setColor(disp.color.PURPLE);
		entity.setAvoid(player);
		engine.addEntity(entity);
	}

	for (let i = 0; i < GENERIC; i++)
	{
		const entity = factory.createGenericEntity({ bounds, target: player });
		entity.setColor(disp.color.WHITE);
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

	const entity = factory.createSeekingEntity({ position, bounds });

	entity.setTarget(engine.getEntities(PLAYER_TAG)[0]);

	engine.addEntity(entity);
}

function showDebugPanel()
{
	const mousePos = document.getElementById(DEBUG_MOUSE_POSITION);
	mousePos.textContent = 'Mouse in World Position: ' + engine.getMouse().getPosition();
}

function draw()
{
  engine.update();
  engine.render();

	showDebugPanel();
}
