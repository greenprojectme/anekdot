class UI {
/** Работа с UI
  * @param {array of Controller} ui Список контроллеров
  */
  constructor(ui) {
    Object.assign(this, ui);
  }

/** Обработка события инициализации DOM-страницы
  * @chainable
  */
  ready() {
    let self = this, ui, controller;
    for (ui in this) {
      controller = this[ui];
      controller.ready();
    }
    return this;
  }

/** Рендеринг значений в список @ui
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

/** Значение в поле ввода @static @ui
  * @return {string}
  */
  static value(input) { // ?
    return $(input).value();
  }

  static notify(header = '', ...text) {
    return {
      info() {
        show();
      }
    }

    function show() {
      $('#notify > h5').text(header);
      $('#notify > div').clear().loop(init, text.length, text);
    }

    function init(index, string) {
      this.add('p').text(string);
    }
  }
}

class Controller {
/** Базовый контроллер @constructor
  */
  constructor({view, form}) {
    Object.assign(this, {view, form});
    this.init();
  }

/** Инициализация контроллера / замыкание обработчиков событий @ui
  * @chainable
  */
  init() {
    if (this.Event) this.event = this.Event();
    return this;
  }

/** Обработчик события инициализации страницы (если контроллеру требуется установить обработку UI событий)
  * @chainable
  */
  ready() {

    return this;
  }
}
