const PubSub = require('../helpers/pub_sub.js');

const GoalFormView = function (form) {
  this.form = form;
};

GoalFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', this.handleSubmit);
};

GoalFormView.prototype.handleSubmit = function (e) {
  e.preventDefault();
  const newGoal = { title: e.target.goal.value, completed: "" };
  PubSub.publish('GoalFormView:new-goal', newGoal);
  e.target.reset();
};

module.exports = GoalFormView;
