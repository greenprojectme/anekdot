<?php
  class Anekdot {
  /** Список всех анекдотов
    * @returns {Array[id, number, caption, anekdot]}
    */
    public static function all() {
      return Api::select('id, number, title', 'anekdot', ['hide' => 0]);
    }

  /** Добавление нового анекдота
    * @param caption {string} название анекдота (@todo - сделать необязательным)
    * @param number {number?} номер добавляемого анекдота
    * @param text {string} первая версия текста анекдота
    * @param name {string} название первой версии текста анекдота
    * @returns {Array} anekdot.all
    */
    public static function add($caption, $number, $text, $name = '') {
      $anekdot = Api::insert('anekdot', ['title' => $name, 'number' => $number]);
      $version = Version::attach($anekdot, $text, $name);
      /** @todo проверка успешности добавления */
      return Anekdot::all();
    }

  /** Полная информация об анекдоте
    * @param id {natural} идентификатор анекдота
    * @returns {Anekdot}
    */
    public static function get($id) {
      $anekdot = Api::select('id, number, title', 'anekdot', ['anekdot.hide' => 0, 'anekdot.id' => $id])[0];
      $anekdot['version'] = Anekdot::versions($anekdot['id']);
      $anekdot['tag']     = Anekdot::tags    ($anekdot['id']);
      return $anekdot;
    }

  /** Список тегов анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @returns {Array} of Tag
    */
    public static function tags($anekdot) {
      return Api::select('tag.id, tag.title', 'link, tag', ['link.anekdot' => $anekdot, 'link.hide' => 0, 'tag.hide' => 0], ['link.tag' => 'tag.id']);
    }

  /** Список версий текста анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @returns {Array} of Tag
    */
    public static function versions($anekdot) {
      return Api::select('title, text', 'version', ['anekdot' => $anekdot, 'hide' => 0]);
    }
  }
?>
