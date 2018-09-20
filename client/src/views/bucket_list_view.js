const PubSub = require('../helpers/pub_sub.js');
const GoalView = require('./goal_view.js');

const BucketListView = function (element) {
  this.element = element;
};

BucketListView.prototype.bindEvents = function () {
  PubSub.subscribe('BucketList:all-goals', e => {
    this.element.innerHTML = '';
    e.detail.forEach(goal => {
      const div = document.createElement('div');
      div.classList.add('goal');
      this.element.prepend(div)
      new GoalView(div).render(goal);
    });
  });
};

module.exports = BucketListView;
