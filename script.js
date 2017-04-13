(function (window, document, undefined) {
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
      //$.ajax('server.php').ask({method: 'tag.add', name}).try(Tag.list);
    }
  }

  /** @section Anekdot @class
    * Список анекдотов
    * @this param {type} description
    */
  class Anekdot {
    /** @subsection {Anekdot} @method @static */
    // @todo

    static addTag(tag) {
      var callback = function (response) {
        console.log(response);
      }
      $.ajax({ url: 'server.php', method: 'post' }).ask({ method: 'tag.add', name: tag }).try(callback);
    }

    static addAnekdot(text) {
      var callback = function (response) {
        console.log(response);
      }
      $.ajax({ url: 'server.php', method: 'post' }).ask({ method: 'anekdot.add', caption: '', number: '300', text: text, name: '' }).try(callback);
    }
  }

  /** @section INIT */
  $.ready(function () {
    var add = function AddAnekdot() {
      var text = $('input.anekdot[name="text"]').val();
      Anekdot.addAnekdot(text);
      var tag = $('input.anekdot[name="tag"]').val();
      Anekdot.addTag(tag);
    }

    // $('.anekdot[type="submit"]').on({ click: add });

    api().ask({method: 'tag.all'}).try(function(response) {
      $('ul.list.aside.tags').clear();
      response.map(({name}) => $('ul.list.aside.tags').add('li{'+name+'}'));
    });

    api().ask({method: 'anekdot.all'}).try(function(response) {
      $('ul.list.aside.anekdots').clear();
      response.map(({caption}) => $('ul.list.aside.anekdots').add('li{'+caption+'}'));
    });

    api().ask({method: 'anekdot.get', id: 12}).try(function(response) {
      $('#anekdot>h2', '#anekdot>div').clear();
      console.log(response)
      $('#anekdot>h2').html(response.caption);
      $('#anekdot>div').html(response.version[0].text);
    });

  });

  function api() {
    return $.ajax({
      url: 'server.php',
      method: 'post'
    });
  }

})(window, document);
