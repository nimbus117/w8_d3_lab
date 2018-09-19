const PubSub = require('../helpers/pub_sub.js');

const ListItemView = function (element) {
  this.element = element;
}

ListItemView.prototype.render = function (listItem) {
  const goal = document.createElement('p')
  goal.textContent = `Goal: ${listItem.goal}`;
  this.element.appendChild(goal);

  const createdDate = document.createElement('p')
  createdDate.textContent = `Created Date: ${listItem.created_date}`;
  this.element.appendChild(createdDate);

  const completedDate = document.createElement('p')
  completedDate.textContent = `Completed Date: ${listItem.completed_date}`;
  this.element.appendChild(completedDate);

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.value = listItem._id;
  this.element.appendChild(deleteButton);
  deleteButton.addEventListener('click', (evt) => {
    PubSub.publish('ListItemView:delete', event.target.value)
  });

  if(listItem.completed_date === ''){
    const completedButton = document.createElement('button')
    completedButton.classList.add('completed-button');
    completedButton.textContent = 'Completed';
    completedButton.value = listItem._id;
    this.element.appendChild(completedButton);
    completedButton.addEventListener('click', (evt) => {
      PubSub.publish('ListItemView:completed', event.target.value)
    });
  }else{this.element.classList.add('goal-completed');}
};


module.exports = ListItemView;
