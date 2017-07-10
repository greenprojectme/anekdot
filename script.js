(function(window, document, undefined) {
/** Сайт с пронумерованными анекдотами
  *
  */
  "use strict";

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
    Tag.add(name)
      .then(tags)
      .then(_ => $('form#input-tag').value(''))
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
    return Anekdot.add(anekdot)
      .then(anekdots);
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
