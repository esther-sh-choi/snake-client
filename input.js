const {
  MOVE_UP_KEY,
  MOVE_LEFT_KEY,
  MOVE_DOWN_KEY,
  MOVE_RIGHT_KEY,
  KEY_MAP,
} = require("./constants");

let connection;
let interval;
let prevKey;

const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = (key) => {
  const moveFunc = (direction) => {
    clearInterval(interval);
    interval = setInterval(() => connection.write(`Move: ${direction}`), 100);
  };
  if (key === "\u0003") {
    process.exit();
  }
  if (key === MOVE_UP_KEY && prevKey !== MOVE_DOWN_KEY) {
    moveFunc("up");
  }
  if (key === MOVE_DOWN_KEY && prevKey !== MOVE_UP_KEY) {
    moveFunc("down");
  }
  if (key === MOVE_LEFT_KEY && prevKey !== MOVE_RIGHT_KEY) {
    moveFunc("left");
  }
  if (key === MOVE_RIGHT_KEY && prevKey !== MOVE_LEFT_KEY) {
    moveFunc("right");
  }

  if (KEY_MAP[key]) {
    connection.write(`Say: ${KEY_MAP[key]}`);
  }

  prevKey = key;
};

module.exports = { setupInput };
