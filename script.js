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
      }
      $.ajax({ url: 'server.php', method: 'post' }).ask({ method: 'tag.add', name: tag }).try(callback);
    }

    static addAnekdot(text) {
      var callback = function (response) {
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

    api().ask({method: 'tag.all'}).try(function(response) {
      $('ul.list.aside.tags').clear();
      response.map(({name}) => $('ul.list.aside.tags').add('li{'+name+'}'));
    });

    api().ask({method: 'anekdot.all'}).try(function(response) {
      $('ul.list.aside.anekdots').clear();
      response.map(({caption, id}) => { 
        $('ul.list.aside.anekdots').add('li{'+caption+'}');
        var list = $('ul.list.aside.anekdots').find(['li']);
        var item = list.q(list.length-1);
        item.on({ click: function(event) { loadAnekdot(id) } });
      });
    });

    loadAnekdot(12);

    function loadAnekdot(ID) {
      api().ask({method: 'anekdot.get', id: ID}).try(function(response) {
        $('#anekdot>h2', '#anekdot>div').clear();
        $('#anekdot>h2').html(response.caption);
        $('#anekdot>div').html(response.version[0].text);
      });
    }
    
  });

  function api() {
    return $.ajax({
      url: 'server.php',
      method: 'post'
    });
  }

})(window, document);
