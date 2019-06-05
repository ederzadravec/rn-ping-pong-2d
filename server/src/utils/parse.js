const json = json => JSON.parse(json);

const object = params => JSON.stringify(params);

export const parse = {
  json,
  object
};
