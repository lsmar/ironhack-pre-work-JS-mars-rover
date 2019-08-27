let roverLsm0 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};
let roverLsm1 = {
  direction: "N",
  x: 2,
  y: 2,
  travelLog: []
};
let roverLsm2 = {
  direction: "N",
  x: 3,
  y: 3,
  travelLog: []
};
let roverLsm3 = {
  direction: "N",
  x: 4,
  y: 4,
  travelLog: []
};
let roverLsm4 = {
  direction: "N",
  x: 1,
  y: 9,
  travelLog: []
};
let roversGlobal = [roverLsm0, roverLsm1, roverLsm2, roverLsm3, roverLsm4];

const obstacles = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]];
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
  const forwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const xFinalPos = rover.x + forwardArrayIndex[0];
  const yFinalPos = rover.y + forwardArrayIndex[1];
  const finalPos = { x: xFinalPos, y: yFinalPos };
  if (isPossibleToMove(finalPos, obstacles)) {
    return console.log("Opsss there is an obstacle");
  }
  if (thereIsAnotherRover(finalPos, roversGlobal)) {
    return console.log("Opsss there is another rover");
  }
  rover.travelLog.push({ x: rover.x, y: rover.y });
  rover.x = xFinalPos > 9 ? 9 : xFinalPos < 0 ? 0 : xFinalPos;
  rover.y = yFinalPos > 9 ? 9 : yFinalPos < 0 ? 0 : yFinalPos;
}

function moveBackward(rover) {
  console.log("moveBackward was called");
  const backwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const xFinalPos = rover.x - backwardArrayIndex[0];
  const yFinalPos = rover.y - backwardArrayIndex[1];
  const finalPos = { x: xFinalPos, y: yFinalPos };
  if (isPossibleToMove(finalPos, obstacles)) {
    return console.log("Opsss there is an obstacle");
  }
  if (thereIsAnotherRover(finalPos, roversGlobal)) {
    return console.log("Opsss there is another rover");
  }
  rover.travelLog.push({ x: rover.x, y: rover.y });
  rover.x = xFinalPos > 9 ? 9 : xFinalPos < 0 ? 0 : xFinalPos;
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

function thereIsAnotherRover(roverFutPosition, rovers) {
  return (
    rovers.filter(rover => {
      return rover.x == roverFutPosition.x && rover.y == roverFutPosition.y;
    }).length > 0
  );
}

executeCommands("rrFflfrffffffflf", roversGlobal[0]);
console.log("Rover 0", roversGlobal[0].travelLog);
executeCommands("rrFflfrffffffflf", roversGlobal[1]);
console.log("Rover 1", roversGlobal[1].travelLog);
executeCommands("rrFflfrffffffflf", roversGlobal[3]);
console.log("Rover 3", roversGlobal[3].travelLog);
