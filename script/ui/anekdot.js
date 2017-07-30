class AnekdotUI extends Controller {
/** Загрузка списка всех анекдотов */
  all() {
    let self = this;
    return Anekdot.all()
      .then(anekdots => self.list(anekdots));
  }

/** Загрузка анекдота по идентификатору
  * @param {natural} id
  */
  get(id) {
    let self = this;
    $(self.view.list + ' li[data-anekdot="' + id + '"]').onceClass('active');
    Anekdot.get(id).then(anekdot => self.show(anekdot));
  }

/** Отображение анекдота в блоке просмотра @ui
  * @param {object} anekdot
  */
  show(anekdot) {
    let self = this;
    $(self.view.name, self.view.text).clear();
    $(self.view.name).text(anekdot.title);
    let textArr = anekdot.version[0].text.split('\n');
    let view = $(self.view.text);
    textArr.forEach(string => view.add('p').text(string));
  }

/** Загрузка случайного анекдота из списка
  */
  rand() {
    let self = this;
    let anekdot = Anekdot.rand();
    return anekdot === null
      ? self.default()
      : self.get(anekdot.id);
  }

/** Добавление нового анекдота */
  add(caption, number, text, name) {
    let self = this;
    let anekdot = {caption, number, text, name};
    return Anekdot.add(anekdot)
      .then(data => self.list(data));
  }

/** Отрисовка списка анекдотов
  * @param {array} anekdots
  * @return {array} anekdots
  */
  list(anekdots) {
    let self = this;
    return UI.list(anekdots, self.view.list, callback, 'li.control.button.large.block.left');

    function callback(item, node) {
      node.data({anekdot: item.id}).on({click});
    }

    function click(event) {
      let anekdot = this.data('anekdot');
      self.get(anekdot);
      return false;
    }
  }

/** Если анекдотов нет */
  default() {
    let self = this;
    $(self.view.name, self.view.text).clear();
    $(self.view.name).text('Анекдотов пока нет');
    $(self.view.text).add('label[for=layer-editor-toggle].control.button.large.fade')
      .html('Добавить первый анекдот');
  }

/** @section События */
  Event() {
    let self = this;

    return {
    /** загрузка случайного анекдота */
      rand(event) {
        self.rand();
        return false;
      },

    /** Событие сохранения анекдота */
      add(e) {
        let name = UI.value(self.form.add.name);
        let text = UI.value(self.form.add.text);
        self.add(name, 100, text, name);
        return false;
      }
    }
  }

/** @section @override @ui @ready */
  ready() {
    let self = this;

    self.all().then(self.event.rand); // список анекдотов

    $(self.form.next)    .on({ click : self.event.rand }); // событие загрузки следующего анекдота
    $(self.form.add.form).on({ submit: self.event.add  }); // событие сохранения анекдота

    return this;
  }
}
