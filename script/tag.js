class Tag {
/** Cписок всех тегов с сервера
  */
  static all() {
    return api('tag.all')
      .then(Tag.save);
  }
/** Сохранение списка тегов локально
  * @param {Array} tags
  * @return {Array} tags
  */
  static save(tags) {
    Tag.data = tags;
    return tags;
  }
/** Добавляет новый тег и обновляет список тегов локально
  */
  static add(name) {
    return api('tag.add', name)
      .then(Tag.save);
  }
}
