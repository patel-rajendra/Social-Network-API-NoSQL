var Moment = require('moment');

module.exports = (timestamp) => {
  var date = new Moment(timestamp);

  return date.format('MMMM Do YYYY, h:mm:ss a');
};
