const BucketList = require('./models/bucket_list.js');
const ListView = require('./views/list_view.js')
const FormView = require('./views/form_view.js')

document.addEventListener('DOMContentLoaded', () => {
const url = 'http://localhost:3000/api/list'
const bucketList = new BucketList(url);
bucketList.bindEvents();
bucketList.getData();

const listElement = document.querySelector('#goals-list');
const listView = new ListView(listElement);
listView.bindEvents();

const formElement = document.querySelector('#goal-form');
const formView = new FormView(formElement);
formView.bindEvents();
});
