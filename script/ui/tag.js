class TagUI extends Controller {
/** Загрузка списка всех тегов */
  all() {
    let self = this;
    Tag.all()
      .then(tags => self.list(tags));
  }

/** Добавление нового тега */
  add(name) {
    let self = this;
    Tag.add(name)
      .then(tags => self.list(tags))
      .then(_ => $(self.form.add.name).value(''))
  }

/** Отрисовка списка тегов
  * @param {array} tags
  * @return {array} tags
  */
  list(tags) {
    let self = this;
    UI.list(tags, self.view.list);
    UI.list(tags, self.view.edit);
    return tags;
  }

/** @section События */
  Event() {
    let self = this;

    return {
    /** событие сохранения тега */
      add(e) {
        let item = UI.value(self.form.add.name);
        self.add(item);
        return false;
      }
    }
  }

/** @section @override @ui @ready */
  ready() {
    let self = this;

    self.all(); // список тегов

    $(self.form.add.form).on({ submit: self.event.add }); // событие сохранения тега

    return this;
  }
}
