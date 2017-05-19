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
    }
    /** Добавляет новый тег и загружает список всех тегов @callback Tag.all
      * @return {Boolean}
      */
    static add(name) {
      //$.ajax('server.php').ask({method: 'tag.add', name}).then(Tag.list);
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
      var callback = function(response) {
      }
      $.ajax({url: 'server.php', method: 'post'}).ask({method: 'tag.add', name: tag}).then(callback);
    }

    static addAnekdot(text) {
      var callback = function(response) {
      }
      $.ajax({url: 'server.php', method: 'post'}).ask({method: 'anekdot.add', caption: '', number: '300', text: text, name: ''}).then(callback);
    }
  }

  /** @section INIT */
  $.ready(function() {
    var anekdots;
    var add = function AddAnekdot() {
      var text = $('input.anekdot[name="text"]').value();
      Anekdot.addAnekdot(text);
      var tag = $('input.anekdot[name="tag"]').value();
      Anekdot.addTag(tag);
    }

    function fillList(response, container, item) {
      $(container).clear();
      response.map(({name}) => $(container).add(item).text(name));
    }
    function loadList(method, container, item) {
      api(method).then(function(response) {fillList(response, container, item)});
    }
    /** загружает теги в список тегов */
    function loadTags(container, item) {
      return loadList('tag.all', container, item)
    }

    loadTags('ul.list.aside.tags', 'li');
    loadTags('div.tags>ul.list.aside.tags', 'li');

    /** загружает анекдоты в список анекдотов */
    var loadAnekdots = function() {
      api('anekdot.all')
        .then(listAnekdot)
        .then(function(response) {
          anekdots = response.map(e => e.id);
          loadNextAnekdot();
        });
    }
    loadAnekdots();

    function listAnekdot(response) {
      $('ul.list.aside.anekdots')
        .clear()
        .add(response.map(anekdot => 'li{' + anekdot.caption + '}[data-anekdot=' + anekdot.id + ']'))
          .on({click: function(event) {
            loadAnekdot(this.data('anekdot'));
          }});
      return response;
    }

    /** добавляет событие сохранения анекдота */
    $('form#input-anekdot').on({
      submit: function(e) {
        saveAnekdot(getName(), 100, getText(), getName());
        return false;
      }
    })
    function getInputText(item) {
      return $(item)[0].value;
    }
    /** получает название анекдота из формы */
    function getName() {
      return getInputText('input[name=name]');
    }
    /** получает текст анекдота из формы */
    function getText() {
      return getInputText('textarea');
    }
    /** сохраняет анекдот */
    function saveAnekdot(caption, number, text, name) {
      let anekdot = {caption, number, text, name};
      api('anekdot.add', anekdot).then(listAnekdot);
    }
    /** добавляем событие загрузки следующего анекдота */
    $('div#next-anekdot>div').on({click: function(event) {loadNextAnekdot()}})

    /** загрузка анекдота по id */
    function loadAnekdot(id) {
      $('ul.list.aside.anekdots li[data-anekdot="' + id + '"]').onceClass('active');
      api('anekdot.get', {id}).then(function(response) {
        $('#anekdot>h2', '#anekdot>div').clear();
        $('#anekdot>h2').html(response.caption);
        var textArr = response.version[0].text.split('\n');
        textArr.forEach(string => {$('#anekdot>div').add('p{' + string + '}');});
      });
    }
    /** загрузка случайного анекдота */
    function loadNextAnekdot() {
      var length = anekdots.length;
      var id = anekdots[$.number.rand(0, length)];
      loadAnekdot(id);
    }

    /** добавляет событие сохранения тега */
    $('form#input-tag').on({
      submit: function(e) {
        var item = 'form#input-tag>input[name=name]';
        item = getInputText(item);
        saveTag(item);
        return false;
      }
    })
    /** сохраняет тег */
    function saveTag(name) {
      api('tag.add', {name}).then(function(response) {
        fillList(response, 'div.tags>ul.list.aside.tags', 'li');
        fillList(response, 'ul.list.aside.tags', 'li');
        $('form#input-tag').value('');
      });
    }
  });

  function api(method, data = {}) {
    data.method = method;
    return $.ajax(data, 'server.php', {method: 'post'}).then(response => response.json());
  }

})(window, document);
