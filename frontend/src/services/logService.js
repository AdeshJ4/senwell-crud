/*
It seems like a custom logging service. It might be used to log errors or messages for debugging and monitoring.

*/
function init() {}

function log(error) {
  console.error(error);
}

export default {
  init,
  log,
};
