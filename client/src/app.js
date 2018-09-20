const BucketList = require('./models/bucket_list.js');
const BucketListView = require('./views/bucket_list_view.js')
const GoalFormView = require('./views/goal_form_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const url = 'http://localhost:3000/api/list'
  const bucketList = new BucketList(url);
  bucketList.bindEvents();
  bucketList.getData();

  const bucketListElement = document.querySelector('#bucket-list');
  const bucketListView = new BucketListView(bucketListElement);
  bucketListView.bindEvents();

  const goalFormElement = document.querySelector('#goal-form');
  const goalFormView = new GoalFormView(goalFormElement);
  goalFormView.bindEvents();
});
