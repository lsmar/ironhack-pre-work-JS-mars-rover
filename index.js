//* Configure o tamanho do seu grid
const mapXSize = 10;
const mapYSize = 10;


//* Defina as posições dos obstáculos
const obstacles = [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]];

//! Configurações de funcionamento não mexer
const possibleDirections = ["N", "E", "S", "W"];
const forwardArrays = [[0, -1], [1, 0], [0, 1], [-1, 0]];

//* Crie os rovers que deseja
let roversArray = [
  {
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [],
    name: "Rover 01"
  },
  {
    direction: "S",
    x: 2,
    y: 2,
    travelLog: [],
    name: "Rover 02"
  },
  {
    direction: "W",
    x: 3,
    y: 3,
    travelLog: [],
    name: "Rover 03"
  },
  {
    direction: "N",
    x: 4,
    y: 4,
    travelLog: [],
    name: "Rover 04"
  }
];

//* Liste aqui os comandos que você gostaria de executar
executeCommands("rrffffffffflfflffffff", roversArray[0]);
executeCommands("f", roversArray[2]);
executeCommands("rrFflfrfvfffffflf", roversArray[3]);

function turnLeft(rover) {
  console.log("turnLeft command was called!");
  const newDirectionIndex = possibleDirections.indexOf(rover.direction) - 1;
  rover.direction = possibleDirections[newDirectionIndex < 0 ? 3 : newDirectionIndex];
  return true;
}

function turnRight(rover) {
  console.log("turnRight command was called!");
  const newDirectionIndex = possibleDirections.indexOf(rover.direction) + 1;
  rover.direction = possibleDirections[newDirectionIndex > 3 ? 0 : newDirectionIndex];
  return true;
}

function moveForward(rover) {
  console.log("moveForward command was called");
  const forwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const finalPos = { x: rover.x + forwardArrayIndex[0], y: rover.y + forwardArrayIndex[1] };
  if (!checkFuturePosition(finalPos, obstacles, roversArray)) return false;
  rover.travelLog.push({ x: rover.x, y: rover.y });
  rover.x = finalPos.x;
  rover.y = finalPos.y;
  return true;
}

function moveBackward(rover) {
  console.log("moveBackward command was called");
  const forwardArrayIndex = forwardArrays[possibleDirections.indexOf(rover.direction)];
  const finalPos = { x: rover.x - forwardArrayIndex[0], y: rover.y - forwardArrayIndex[1] };
  if (!checkFuturePosition(finalPos, obstacles, roversArray)) return false;
  rover.travelLog.push({ x: rover.x, y: rover.y });
  rover.x = finalPos.x;
  rover.y = finalPos.y;
  return true;
}

function executeCommands(command, rover) {
  //* Verifica se o comamando é válido
  if (!/^[BFLRbflr]+$/g.test(command))
    return console.log(`The command that you send for rover: ${rover.name} is not valid, please verify and try again\n`);
  //* O commando é válido vamos exeutar.
  console.log(`Starting with ${rover.name}\n3\n2\n1\n`);
  const stepsToExecute = command.toLowerCase().split("");
  for (let i = 0; i < stepsToExecute.length; i++) {
    if (
      stepsToExecute[i] === "r"
        ? turnRight(rover)
        : stepsToExecute[i] === "l"
        ? turnLeft(rover)
        : stepsToExecute[i] === "f"
        ? moveForward(rover)
        : moveBackward(rover)
    )
      console.log(`Rover actual position: x = ${rover.x} y = ${rover.y} direction = ${rover.direction}\n`);
    else return console.log(`It is not possible to continue. The rover position is: x=${rover.x} and y=${rover.y}\n`);
  }
  console.log(`${rover.name} position history is: `, rover.travelLog, "\n");
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

function checkFuturePosition(position, obstaclesPos, rovers) {
  if (isPossibleToMove(position, obstaclesPos)) {
    console.log("Opsss there is an obstacle");
    return false;
  }
  if (thereIsAnotherRover(position, rovers)) {
    console.log("Opsss there is another rover");
    return false;
  }
  if (position.x > mapXSize - 1) {
    console.log("Opss the rover is trying to leave the map →.");
    return false;
  }
  if (position.x < 0) {
    console.log("Opss the rover is trying to leave the map ←.");
    return false;
  }
  if (position.y > mapYSize - 1) {
    console.log("Opss the rover is trying to leave the map ↓.");
    return false;
  }
  if (position.y < 0) {
    console.log("Opss the rover is trying to leave the map ↑.");
    return false;
  }
  return true;
}