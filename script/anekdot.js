class Anekdot {
/** Список всех анекдотов с сервера
  */
  static all() {
    return api('anekdot.all')
    .then(Anekdot.save);
    // .then(Anekdot.list);
  }
  static get(id) {
    return api('anekdot.get', {id});
  }
  static rand() {
    let count = Anekdot.data && Anekdot.data.length;
    let index = $.number.rand(0, count);
    return Anekdot.data[index];
  }
  static add(anekdot) {
    return api('anekdot.add', anekdot)
    .then(Anekdot.save);
  }
/** Сохранение списка анекдотов локально
  * @param {Array} anekdots
  * @return {Array} anekdots
  */
  static save(anekdots) {
    Anekdot.data = anekdots;
    return anekdots;
  }
}
