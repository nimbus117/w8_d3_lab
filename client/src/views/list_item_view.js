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

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete';
  deleteButton.value = listItem._id;
  this.element.appendChild(deleteButton);
  deleteButton.addEventListener('click', (evt) => {
    PubSub.publish('ListItemView:delete', event.target.value)
  });

  if(listItem.completed_date === ''){
    const completedButton = document.createElement('button')
    completedButton.textContent = 'Completed';
    completedButton.value = listItem._id;
    this.element.appendChild(completedButton);
    completedButton.addEventListener('click', (evt) => {
      PubSub.publish('ListItemView:completed', event.target.value)
    });
  }

};


module.exports = ListItemView;
