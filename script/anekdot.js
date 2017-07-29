class Anekdot {
/** Список всех анекдотов с сервера */
  static all() {
    return api('anekdot.all')
      .then(Anekdot.save);
  }

/** Получение анекдота по идентификатору
  * @param {natural} id
  * @return {object}
  */
  static get(id) {
    return api('anekdot.get', {id});
  }

/** Получение случайного анекдота (вызывать не ранее получения списка всех анекдотов)
  * @return {object}
  */
  static rand() {
    let count = (Anekdot.data || []).length;
    if (count === 0) return null;
    let index = $.number.rand(0, count);
    return Anekdot.data[index];
  }

/** Добавление нового анекдота
  * @param {object} anekdot
  */
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
