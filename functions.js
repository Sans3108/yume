module.exports = {
  getIDfromMention: function(a) {
    if (typeof a !== typeof "string")
      return new Error("Param 1 is not a string!");

    if (a.startsWith("<@") && a.endsWith(">")) {
      let id = a.slice(2, -1);
      if (id.startsWith("!")) {
        id = id.slice(1);
      }
      return id;
    } else return new Error("Doesn't start with <@ and end with >");
  },
  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  arrayContains: function(needle, arrhaystack) {
    return arrhaystack.includes(needle);
  }
};
