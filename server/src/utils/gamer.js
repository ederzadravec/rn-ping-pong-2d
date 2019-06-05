import R from "ramda";

var { gamers } = require("variables");

const add = (id, params) => {
  gamers = R.assoc(id, params, gamers);
  return gamers;
};

const get = id => {
  var gamer = R.pathOr({}, [id], gamers);
  return gamer;
};

const edit = (id, params) => {
  var gamer = { ...R.pathOr({}, [id], gamers), params };

  gamers = R.assoc(id, gamer, gamers);
  return gamers;
};

const remove = id => {
  gamers = R.dissoc(id, gamers);
  return null;
};

export const gamer = {
  add,
  get,
  edit,
  remove
};
