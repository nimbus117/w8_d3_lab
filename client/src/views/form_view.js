const PubSub = require('../helpers/pub_sub.js');

const FormView = function(form){
  this.form = form
};

FormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

FormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newGoal = {
    goal: event.target.goal.value,
    completed_date: ""
  };
  PubSub.publish('FormView:new-list-item', newGoal);

  evt.target.reset();
};

module.exports = FormView;
