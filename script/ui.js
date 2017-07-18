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
    let types = 'info,error,success,process'.split(',');

    let notify = {
      data(header, ...text) {
        $('#notify > h5').text(header);
        $('#notify > div').clear().loop(init, text.length, text);
        return this;
      },
      info(timeout = 5) {
        return show(timeout);
      },
      error(timeout = 5) {
        return show(timeout, 'error');
      },
      success(timeout = 3) {
        return show(timeout, 'success');
      },
      process(timeout = 3) {
        return show(timeout, 'process');
      }
    };

    return notify.data(header, ...text);

    function show(timeout = 0, type = 'info') {
      timeout *= 1e3;
      $('#notify').addClass('active').removeClass(types).addClass(type);
      return new Promise(function(resolve, reject) {
        if (timeout) {
          setTimeout(_ => {
            hide();
            resolve(notify);
          }, timeout);
        } else resolve(notify);
      });
    }

    function hide() {
      $('#notify').removeClass('active');
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
