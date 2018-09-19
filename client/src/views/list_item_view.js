const PubSub = require('../helpers/pub_sub.js');

const ListItemView = function (element) {
  this.element = element;
}
ListItemView.prototype.render = function (listItem) {
const goal = document.createElement('p')
goal.textContent = `Goal: ${listItem.goal}`;

this.element.appendChild(goal);

const completedDate = document.createElement('p')
completedDate.textContent = `Completed Date: ${listItem.completed_date}`;

this.element.appendChild(completedDate);

};

module.exports = ListItemView;
