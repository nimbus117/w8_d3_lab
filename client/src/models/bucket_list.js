const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function (url) {
  this.url = url

}

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('FormView:new-list-item', (evt) => {
    this.postNewGoal(evt.detail);
  });
  PubSub.subscribe('ListItemView:delete', (evt) => {
    this.deleteGoal(evt.detail);
  });
  PubSub.subscribe('ListItemView:completed', (evt) => {
    this.completedGoal(evt.detail);
  });
};

BucketList.prototype.deleteGoal = function (goalID) {
  const request = new Request(this.url);
  request.delete(goalID)
    .then((goals) => {
      PubSub.publish('BucketList:all', goals)
    })
    .catch(console.error)
};

BucketList.prototype.completedGoal = function (goalID) {
  const request = new Request(this.url);
  const date = new Date().toGMTString().substring(0,16);
  const completedDate = {"completed_date": date}
  request.put(goalID, completedDate)
    .then((goals) => {
      PubSub.publish('BucketList:all', goals)
    })
    .catch(console.error)
};

BucketList.prototype.postNewGoal = function (goal) {
  const request = new Request(this.url);
  request.post(goal)
    .then((goals) => {
      PubSub.publish('BucketList:all', goals)
    })
    .catch(console.error)
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
