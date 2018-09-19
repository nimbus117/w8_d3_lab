const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function (url) {
  this.url = url

}
BucketList.prototype.bindEvents = function () {

};

BucketList.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
  .then((list) => {
PubSub.publish('BucketList:all', list)
console.log(list);
  })
  .catch(console.error)
};

module.exports = BucketList;
