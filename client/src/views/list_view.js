const PubSub = require('../helpers/pub_sub.js');
const ListItemView = require('./list_item_view.js');

const ListView = function (element) {
this.element = element
}

ListView.prototype.bindEvents = function () {
PubSub.subscribe('BucketList:all', (evt) => {
  this.element.innerHTML = '';
  evt.detail.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('list-item');
    this.element.appendChild(div)
    const listItem = new ListItemView(div);
    listItem.render(item)
  });

})
};

module.exports = ListView;
