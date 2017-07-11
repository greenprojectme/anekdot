class UI {
  constructor(ui) {
    Object.assign(this, ui);
  }

/** Рендеринг значений в список
  * @param {array} list
  * @param {dom} container
  * @param {function} callback
  * @param {string} [tag='li']
  * @return {array} list
  */
  static list(list, container, callback, tag = 'li') {
    container = $(container).clear();
    list.map((item) => {
      let node = container.add(tag).text(item.title);
      if (callback) callback(item, node);
    });
    return list;
  }

  static value(input) { // ?
    return $(input).val();
  }
}

class Controller {
  constructor({view, form}) {
    Object.assign(this, {view, form});
    this.init();
  }
  init() {
    if (this.Event) this.event = this.Event();
    return this;
  }
}
