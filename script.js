(function(window, document, undefined) {
  "use strict";
/** Сайт с пронумерованными анекдотами
  * 
  */

/** @section Tag @class
  * Список тегов
  * @this param {type} description
  */
  class Tag {
  /** @subsection {Tag} @method @static */
  /** Получить список всех тегов с сервера
    */
    static all() {
      // $.ajax()
    }
  /** Вывести список всех тегов @ui
    * @param list {Object} список всех тегов
    */
    static list(list) {
      console.log(list);
    }
  /** Добавляет новый тег и загружает список всех тегов @callback Tag.all
    * @return {Boolean}
    */
    static add(name) {
      $.ajax('server.php').ask({method: 'tag.add', name}).try(Tag.list);
    }
  }

/** @section Anekdot @class
  * Список анекдотов
  * @this param {type} description
  */
  class Anekdot {
  /** @subsection {Anekdot} @method @static */
  // @todo
  }

/** @section INIT */
  $.ready(function() {
    // ...
  });
})(window, document);
