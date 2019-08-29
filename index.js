// Apenas um rover
let roverLsm = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

const obstacles = [[0, 1], [1, 0], [1, 1]];
const possibleDirections = ["N", "E", "S", "W"];
const forwardArrays = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// ======================
function turnLeft(rover) {
  console.log("turnLeft was called!");
  const newDirectionIndex = possibleDirections.indexOf(rover.direction) - 1;
  rover.direction = possibleDirections[newDirectionIndex < 0 ? 3 : newDirectionIndex];
}

function turnRight(rover) {
  console.log("turnRight was called!");
  const newDirectionIndex = possibleDirections.indexOf(rover.direction) + 1;
  rover.direction = possibleDirections[newDirectionIndex > 3 ? 0 : newDirectionIndex];
}

function moveForward(rover) {
  console.log("moveForward was called");
  rover.travelLog.push({ x: rover.x, y: rover.y });
  const forwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const xFinalPos = rover.x + forwardArrayIndex[0];
  const yFinalPos = rover.y + forwardArrayIndex[1];
  const finalPos = { x: xFinalPos, y: yFinalPos };
  if (isPossibleToMove(finalPos, obstacles)) {
    return console.log("Opsss there is an obstacle");
  }
  rover.x = xFinalPos > 9 ? 9 : xFinalPos < 0 ? 0 : xFinalPos;
  rover.y = yFinalPos > 9 ? 9 : yFinalPos < 0 ? 0 : yFinalPos;
}

function moveBackward(rover) {
  console.log("moveBackward was called");
  rover.travelLog.push({ x: rover.x, y: rover.y });
  const backwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const xFinalPos = rover.x - backwardArrayIndex[0];
  rover.x = xFinalPos > 9 ? 9 : xFinalPos < 0 ? 0 : xFinalPos;
  const yFinalPos = rover.y - backwardArrayIndex[1];
  rover.y = yFinalPos > 9 ? 9 : yFinalPos < 0 ? 0 : yFinalPos;
}

function executeCommands(command, rover) {
  command
    .toLowerCase()
    .split("")
    .forEach(element => {
      switch (element) {
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
        default:
          console.log("Wrong command");
          break;
      }
      console.log(`Rover actual position: x = ${rover.x} y = ${rover.y} direction = ${rover.direction}`);
    });
}

function isPossibleToMove(roverFutPosition, obstaclesPos) {
  return (
    obstaclesPos.filter(obstacle => {
      return obstacle[0] == roverFutPosition.x && obstacle[1] == roverFutPosition.y;
    }).length > 0
  );
}

executeCommands("rrFf", roverLsm);
console.log(roverLsm.travelLog);
