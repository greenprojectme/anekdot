<?php
  class Version {
  /** Добавление версии текста анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @param text {string} текст добавляемой версии
    * @param name {string?} название добавляемой версии
    */
    public static function attach($anekdot, $text, $name) {
      Api::insert('version', ['anekdot' => $anekdot, 'text' => $text, 'title' => $name]);
      return Anekdot::versions($anekdot);
    }
  }
?>
