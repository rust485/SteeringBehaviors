const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const PLAYER_TAG = 'player';

let fps = 60;
const engine = new Engine();

const keyCodes = [];

function setup()
{
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(fps);

  const player = ControlledEntityFactory.createEntity();
	player.addTag(PLAYER_TAG);
  engine.addEntity(player);
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{

}

function draw()
{
  engine.update();
  engine.render();
}
