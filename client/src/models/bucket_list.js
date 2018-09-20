const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const BucketList = function (url) {
  this.url = url;
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe('GoalFormView:new-goal', this.newGoal.bind(this));
  PubSub.subscribe('GoalView:delete', this.deleteGoal.bind(this));
  PubSub.subscribe('GoalView:complete', this.completeGoal.bind(this));
};

BucketList.prototype.publishAll = function (goals) {
  PubSub.publish('BucketList:all-goals', goals);
}

BucketList.prototype.getData = function () {
  new Request(this.url)
    .get()
    .then(this.publishAll)
    .catch(console.error);
};

BucketList.prototype.newGoal = function (goal) {
  new Request(this.url)
    .post(goal.detail)
    .then(this.publishAll)
    .catch(console.error);
};

BucketList.prototype.deleteGoal = function (goalID) {
  new Request(this.url)
    .delete(goalID.detail)
    .then(this.publishAll)
    .catch(console.error);
};

BucketList.prototype.completeGoal = function (goalID) {
  const date = new Date().toGMTString().substring(0,16);
  const completedDate = { "completed": date };
  new Request(this.url)
    .put(goalID.detail, completedDate)
    .then(this.publishAll)
    .catch(console.error);
};

module.exports = BucketList;
