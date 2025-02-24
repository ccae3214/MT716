const util = require('util');

// ...existing code...

// Replace this line
// const newObj = util._extend({}, oldObj);

// With this line
const newObj = Object.assign({}, oldObj);

// ...existing code...
