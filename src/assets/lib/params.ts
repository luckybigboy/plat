export class Params {

  static serialize(value, key = null) {
    if ((value instanceof Array && !key) || !(value instanceof Object) && !key) {
      throw "Serialize expects root value to be an object";
    }
    // An array to push entries onto. Return the joined string
    let entries = [];
    // Check if it's an array first because arrays are instances of Object
    if (value instanceof Array) {
      for (let item of value) {
        // Only need to add the empty array syntax to the key
        entries.push(Params.serialize(item, `${key}[]`));
      }
    } else if (value instanceof Object) {
      for (let prop in value) {
        if (!value.hasOwnProperty(prop)) continue;
        let item = value[prop];
        if (key) prop = `${key}[${prop}]`; // Only need to do this if properties are nested.
        entries.push(Params.serialize(item, prop));
      }
    } else {
      // The default case which the other condition ultimate resolve to.
      entries.push(`${key}=${value}`);
    }
    return entries.join('&');
  }

}
