<?php
  class Tag {
  /** Список всех тегов
    * @returns {Array} of Tag
    */
    public static function all() { // вернуть список всех тегов
      return Api::select('*', 'tag', ['hide' => 0]);
    }

  /** Добавление тега
    * @param name {string} название добавляемого тега
    * @returns {Array} tag.all
    */
    public static function add($name) { // Добавить новый тег и вернуть список всех
      $result = Api::insert('tag', ['title' => $name]); // в фон (@todo?)
      return Tag::all();
    }

  /** Список всех анекдотов с выбранным тегом
    * @param tag {natural} идентификатор тега
    * @returns {Array}
    */
    public static function get($tag) {
      return Api::select('anekdot', 'link', ['tag' => $tag]);
    }

  /** Добавление тега анекдоту
    * @param anekdot {natural} идентификатор анекдота
    * @param tag {natural} идентификатор тега
    * @returns {Anekdot} anekdot.get
    */
    public static function attach($tag, $anekdot) {
      Api::insert('link', ['anekdot' => $anekdot, 'tag' => $tag]);
      return Anekdot::get($anekdot);
    }
  }
?>
