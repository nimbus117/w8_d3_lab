const createAppend = require('../helpers/create_append.js')
const PubSub = require('../helpers/pub_sub.js');

const GoalView = function (element) {
  this.element = element;
};

GoalView.prototype.render = function (goal) {
  createAppend('h3', goal.title, this.element);
  createAppend('p', `Created: ${goal.created}`, this.element)
  createAppend('p', `Completed: ${goal.completed}`, this.element)
  this.deleteButton(goal);
  if (goal.completed === '') { this.completeButton(goal) }
  else { this.element.classList.add('goal-completed') }
};

GoalView.prototype.deleteButton = function (goal) {
  const deleteButton = createAppend('button', 'Delete', this.element);
  deleteButton.classList.add('delete-button');
  deleteButton.value = goal._id;
  deleteButton.addEventListener('click', e => {
    PubSub.publish('GoalView:delete', e.target.value)
  });
}

GoalView.prototype.completeButton = function (goal) {
  const completedButton = createAppend('button', 'Complete', this.element);
  completedButton.classList.add('complete-button');
  completedButton.value = goal._id;
  completedButton.addEventListener('click', e => {
    PubSub.publish('GoalView:complete', e.target.value)
  });
}

module.exports = GoalView;
