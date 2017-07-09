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
  /** Получить список всех тегов с сервера
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

    static all() {
      return api('anekdot.all')
        .then(Anekdot.save);
        // .then(Anekdot.list);
    }
    static get(id) {
      return api('anekdot.get', {id});
    }
    static rand() {
      let count = Anekdot.data && Anekdot.data.length;
      let index = $.number.rand(0, count);
      return Anekdot.data[index];
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

  /** @section INIT */
  $.ready(function() {
    /** загружает теги в список тегов */
    Tag.all()
      .then(tags);

    /** загружает анекдоты в список анекдотов */
    Anekdot.all()
      .then(anekdots)
      .then(randomAnekdot);

    /** добавляет событие сохранения анекдота */
    $('form#input-anekdot').on({
      submit: function(e) {
        saveAnekdot(getName(), 100, getText(), getName());
        return false;
      }
    })

    /** добавляем событие загрузки следующего анекдота */
    $('div#next-anekdot>div').on({click: randomAnekdot});

    /** добавляет событие сохранения тега */
    $('form#input-tag').on({
      submit: function(e) {
        var item = 'form#input-tag>input[name=name]';
        item = getInputText(item);
        saveTag(item);
        return false;
      }
    })
  });

  /** загрузка анекдота по id */
  function loadAnekdot(id) {
    $('ul.list.aside.anekdots li[data-anekdot="' + id + '"]').onceClass('active');
    Anekdot.get(id).then(function(response) {
      $('#anekdot>h2', '#anekdot>div').clear();
      $('#anekdot>h2').html(response.title);
      var textArr = response.version[0].text.split('\n');
      textArr.forEach(string => {$('#anekdot>div').add('p{' + string + '}');});
    });
  }
  /** загрузка случайного анекдота */
  function randomAnekdot() {
    let anekdot = Anekdot.rand();
    loadAnekdot(anekdot.id);
    return false;
  }
  /** сохраняет тег */
  function saveTag(name) {
    api('tag.add', {name}).then(function(response) {
      tags(response);
      $('form#input-tag').value('');
    });
  }
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
  function AddAnekdot() {
    var text = $('input.anekdot[name="text"]').value();
    Anekdot.addAnekdot(text);
    var tag = $('input.anekdot[name="tag"]').value();
    Anekdot.addTag(tag);
  }

  function api(method, data = {}) {
    data.method = method;
    return $.ajax(data, 'server.php', {method: 'post'}).then(response => response.json());
  }
  function list(list, container, callback, tag = 'li') {
    container = $(container).clear();
    list.map((item) => {
      let node = container.add(tag).text(item.title);
      if (callback) callback(item, node);
    });
    return list;
  }
  function tags(tags) {
    list(tags, 'ul.list.aside.tags');
    list(tags, 'div.tags>ul.list.aside.tags');
    return tags;
  }
  function anekdots(anekdots) {
    return list(anekdots, 'ul.list.aside.anekdots', callback);

    function callback(item, node) {
      node.data({anekdot: item.id}).on({click});
    }
    function click(event) {
      let anekdot = this.data('anekdot');
      loadAnekdot(anekdot);
      return false;
    }
  }

})(window, document);
