<?php
  class Ratio {
  /** Добавление анекдоту номера
    * @param anekdot {natural} идентификатор анекдота
    * @param number {natural} добавляемый номер
    * @returns {Anekdot} anekdot.get
    */
    public static function attach($anekdot, $number) {
      // @todo unique
      Api::update('anekdot', ['number' => $number], $anekdot);
      return Anekdot::get($anekdot);
    }
  }
?>
