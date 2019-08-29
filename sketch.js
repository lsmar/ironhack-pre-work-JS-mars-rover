const mapXSize = 15;
const mapYSize = 15;
//* Defina as posições dos obstáculos
const obstacles = [[1, 0], [1, 1],[1, 2] ,[2, 2], [3, 2],[4, 2],[5, 2],[6, 2],[7, 2],[8, 2],[8, 3],[8, 4],[8, 5],[8, 6],[8, 7],[8, 8],[8, 9],[7, 9],[6, 9],[5, 9],[4, 9],[3, 9],[2, 9],[1, 9],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[6,5],[6,6],[6,7],[5,7],[4,7],[3,7],[2,7],[1,7],[0,7]];
let selectedRover;
const sizeCell = 30;

function setup() {
  
  createCanvas(mapXSize*sizeCell, mapYSize*sizeCell+30);
  fill('#6367DE');
  rect(0, 0, mapXSize*sizeCell, mapYSize*sizeCell);
  //linhas Y do grid
  for (let index = 1; index < mapYSize; index++) {
  line(0,index*sizeCell,mapXSize*sizeCell,index*sizeCell)
  }
  //linhas X do grid
  for (let index = 1; index < mapXSize; index++) {
  line(index*sizeCell,0,index*sizeCell,mapYSize*sizeCell)
  }
  for (let index = 0; index < obstacles.length; index++) {
  
    fill('#ff0000');
    translate((obstacles[index][0])*sizeCell, (obstacles[index][1])*sizeCell)
    // translate(0,0)
    rect(0, 0, sizeCell,sizeCell);
    translate(-(obstacles[index][0])*sizeCell, -(obstacles[index][1])*sizeCell)
  }
  angleMode(DEGREES);
    textSize(20);
  if(typeof selectedRover != 'undefined'){
  fill(roversArray[selectedRover-1].color);
  }
  
  text(`Selected Rover: ${typeof selectedRover != 'undefined'?roversArray[selectedRover-1].name:'none'}`, 5, (mapYSize+1)*sizeCell-10);
  noLoop();
}

function draw() {
  let rover;
  for(var roverIndex=0;roverIndex<roversArray.length;roverIndex++){
    rover = roversArray[roverIndex];
    for(let index =0;index<rover.travelLog.length;index++){
    
    console.log("aqui",rover.travelLog[index])
    fill(rover.color);
  translate((rover.travelLog[index].x)*sizeCell, (rover.travelLog[index].y)*sizeCell);
    square(10, 10, 10);
     translate(-(rover.travelLog[index].x)*sizeCell, -(rover.travelLog[index].y)*sizeCell);
  
  }
  
  
  // var pos =[rover.x,rover.y]
  
  // point((pos[0])*sizeCell+15, (pos[1])*sizeCell+15);
  fill(rover.color);
    translate((rover.x)*sizeCell+15, (rover.y)*sizeCell+15);
  rotate(rover.direction=='E'?90:rover.direction=='S'?180:rover.direction=='W'?270:0);
  triangle(0, -12, -10, 12,10 , 12);
  rotate(rover.direction=='E'?-90:rover.direction=='S'?-180:rover.direction=='W'?-270:0);
  translate(-((rover.x)*sizeCell+15), -((rover.y)*sizeCell+15));
  
  }
  
}
function keyPressed() {
  console.log(keyCode)
  if(keyCode>=49&&keyCode<52){
  selectedRover = keyCode-48;
    setup()
    draw()
  }
  else if(!selectedRover){
  alert("Please select a rover");
  }else{
  if(keyCode==39){
    executeCommands("R", roversArray[selectedRover-1]); 
    setup()
    draw()
  }else if(keyCode==37){
    executeCommands("L", roversArray[selectedRover-1]); 
    setup()
    draw()
  }
  else if(keyCode==38){
    executeCommands("F", roversArray[selectedRover-1]); 
    setup()
    draw()
  }else if(keyCode==40){
    executeCommands("B", roversArray[selectedRover-1]); 
    setup()
    draw()
  }}
  
  
  
}

//! Configurações de funcionamento não mexer
const possibleDirections = ["N", "E", "S", "W"];
const forwardArrays = [[0, -1], [1, 0], [0, 1], [-1, 0]];

//* Crie os rovers que deseja
let roversArray = [
  {
    direction: "N",
    x: 0,
    y: 0,
    color:'#40D25E',
    travelLog: [],
    name: "Rover 01"
  },
  {
    direction: "S",
    x: 2,
    y: 0,
    color:'#D240BD',
    travelLog: [],
    name: "Rover 02"
  },
  {
    direction: "N",
    x: 10,
    y: 10,
    color:'#D26640',
    travelLog: [],
    name: "Rover 03"
  }
];

//* Liste aqui os comandos que você gostaria de executar
// executeCommands("rrffffffffflfflffffffrflfff", roversArray[0]);
// executeCommands("f", roversArray[1]);
// executeCommands("rrFflfrfvfffffflf", roversArray[2]);

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
    alert("Opsss there is an obstacle");
    console.log("Opsss there is an obstacle");
    return false;
  }
  if (thereIsAnotherRover(position, rovers)) {
    alert("Opsss there is another rover");
    console.log("Opsss there is another rover");
    return false;
  }
  if (position.x > mapXSize - 1) {
    alert("Opss the rover is trying to leave the map →.")
    console.log("Opss the rover is trying to leave the map →.");
    return false;
  }
  if (position.x < 0) {
    alert("Opss the rover is trying to leave the map ←.")
    console.log("Opss the rover is trying to leave the map ←.");
    return false;
  }
  if (position.y > mapYSize - 1) {
    alert("Opss the rover is trying to leave the map ↓.")
    console.log("Opss the rover is trying to leave the map ↓.");
    return false;
  }
  if (position.y < 0) {
    alert("Opss the rover is trying to leave the map ↑.")
    console.log("Opss the rover is trying to leave the map ↑.");
    return false;
  }
  return true;
}
