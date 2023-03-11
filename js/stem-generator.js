// Based on the stem generator in Flash Math Creativity

// this seems good for now
const PLANT_SPACING = 50;

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randFloat(lower, upper) {
  const range = upper - lower;
  return lower + Math.random() * range;
}

function randInt(lower, upper) {
  // add 1 so this will actually pick the top number
  return Math.floor(randFloat(lower, upper + 1));
}

// create an SVG path, attach to the group, and return it
function createPathElem(parent) {
  return parent.appendChild(document.createElementNS(SVG_NAMESPACE, 'path'));
}

function getOrCreateGroup(svg, groupId, attributes) {
  const getGroup = document.getElementById(groupId);
  if (getGroup) {
    return getGroup;
  }
  const newGroupElem = svg.appendChild(
    document.createElementNS(SVG_NAMESPACE, 'g')
  );
  newGroupElem.setAttribute('id', groupId);
  Object.keys(attributes).forEach((a) => {
    newGroupElem.setAttribute(a, attributes[a]);
  });

  return newGroupElem;
}

async function generate(svgID) {
  const svgElem = document.getElementById(svgID);
  const [, , /* svgX = 0 */ /* svgY = 0 */ svgWidth, svgHeight] = svgElem
    .getAttribute('viewBox')
    .split(' ');
  const stemsGroup = getOrCreateGroup(svgElem, `${svgID}-stems`, {
    fill: 'none',
    stroke: 'green',
  });
  // const leavesGroup = ...

  const numPlants = Math.floor(svgWidth / PLANT_SPACING);

  stemsGroup.replaceChildren();
  // leavesGroup.replaceChildren();

  // make an array of plant IDs, then randomize it, and pass the ID to the function to tell which bucket to create the plant in
  // (also, don't do plants at the edges)
  const plantOrder = [];
  for (let i = 1; i < numPlants - 1; i++) {
    plantOrder.push(i);
  }
  for (let i = 0; i < plantOrder.length; i++) {
    const swapWith = randInt(0, plantOrder.length - 1);
    const temp = plantOrder[i];
    plantOrder[i] = plantOrder[swapWith];
    plantOrder[swapWith] = temp;
  }

  for (const i of plantOrder) {
    await sleep(randInt(100, 300));
    createPlant(
      i * PLANT_SPACING,
      (i + 1) * PLANT_SPACING,
      stemsGroup,
      svgHeight
    );
  }
}

function createPlant(xStart, xEnd, stemsGroup, height) {
  const stemPath = createPathElem(stemsGroup);
  const points = stemPoints(xStart, xEnd, height);

  // TODO: this depends on the stem height
  // const numLeaves = ?;

  stemPath.setAttribute('d', toPathCommands(points));
  const stemLength = Math.ceil(stemPath.getTotalLength());

  // animate it growing
  stemPath.setAttribute(
    'style',
    `stroke-dasharray: ${stemLength}; stroke-dashoffset: ${stemLength};`
  );
  stemPath.classList.add('stem-grow');

  // TODO: create leaves
}

function stemPoints(xStart, xEnd, svgHeight) {
  // create a point every 5 pixels, starting from the bottom of the svg area
  const dy = 5;

  // the initial x position is limited to this section
  const x = randInt(xStart, xEnd);

  const points = [{ x, y: svgHeight }];

  // height of the plants is random, from about 50% of the SVG height to almost the top
  var numPoints = randInt(
    Math.floor((0.5 * svgHeight) / dy),
    Math.floor(svgHeight / dy) - 4
  );

  // as the plant gets taller, it can vary more side-to-side
  // (up to 3 pixels at the very top)
  const offset = 3 / (numPoints * 10);

  for (let i = 1; i <= numPoints; i++) {
    points.push({
      x: points[i - 1].x + i * offset * randInt(-10, 10),
      y: svgHeight - dy * i,
    });
  }
  return points;
}

function toPathCommands(points) {
  let pathCommands = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    pathCommands += ` L ${point.x} ${point.y}`;
  }

  return pathCommands;
}

// TODO: is this the best way to do this?
function generateOnClick(event) {
  const svgID = event.currentTarget.svgID;
  generate(svgID);
}

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', generateOnClick);
generateButton.svgID = 'plantArea';

generate('plantArea');
