(function(window, document, undefined) {
/** Сайт с пронумерованными анекдотами
  *
  */
  "use strict";

  /** @section INIT */
  $.ready(function() {
    let ui = new UI({
      anekdot: new AnekdotUI({
        view: {
          list: 'ul.list.aside.anekdots',
          name: '#anekdot > h2',
          text: '#anekdot > div'
        },
        form: {
          add : { // Добавление анекдота
            form: '#input-anekdot',
            name: '#input-anekdot > input[name=name]',
            text: '#input-anekdot > textsrea'
          },
          next: '#next-anekdot > div' // "следующий анекдот"
        }
      }),
      tag: new TagUI({
        view: {
          list: 'ul.list.aside.tags',
          edit: 'div.tags > ul.list.aside.tags'
        },
        form: {
          add: {   // Добавление тега
            form: '#input-tag',
            name: '#input-tag > input[name=name]'
          }
        }
      })
    });

    /** загружает теги в список тегов */
    Tag.all()
      .then(tags);

    /** загружает анекдоты в список анекдотов */
    Anekdot.all()
      .then(anekdots)
      .then(ui.anekdot.event.rand);

    /** добавляем событие загрузки следующего анекдота */
    $(ui.anekdot.form.next).on({click: ui.anekdot.event.rand});

    /** добавляет событие сохранения анекдота */
    $(ui.anekdot.form.add.form).on({ submit: saveAnekdotEvent })

    /** добавляет событие сохранения тега */
    $(ui.tag.form.add.form).on({submit: saveTagEvent})

/** Событие сохранения анекдота */
  function saveAnekdotEvent(e) {
    saveAnekdot(getName(), 100, getText(), getName());
    return false;
  }

/** событие сохранения тега */
  function saveTagEvent(e) {
    let item = getInputText(ui.tag.form.add.name);
    saveTag(item);
    return false;
  }

  /** загрузка анекдота по id */
  function loadAnekdot(id) {
    return ui.anekdot.get(id);
  }
  /** сохраняет тег */
  function saveTag(name) {
    Tag.add(name)
      .then(tags)
      .then(_ => $(ui.tag.form.add.name).value(''))
  }
  function getInputText(item) {
    return $(item).val();
  }
  /** получает название анекдота из формы */
  function getName() {
    return getInputText(ui.anekdot.form.add.name);
  }
  /** получает текст анекдота из формы */
  function getText() {
    return getInputText(ui.anekdot.form.add.text);
  }

/** сохраняет анекдот */
  function saveAnekdot(caption, number, text, name) {
    let anekdot = {caption, number, text, name};
    return Anekdot.add(anekdot)
      .then(anekdots);
  }

  function tags(tags) {
    UI.list(tags, ui.tag.view.list);
    UI.list(tags, ui.tag.view.edit);
    return tags;
  }
  function anekdots(anekdots) {
    return UI.list(anekdots, ui.anekdot.view.list, callback);

    function callback(item, node) {
      node.data({anekdot: item.id}).on({click});
    }
    function click(event) {
      let anekdot = this.data('anekdot');
      loadAnekdot(anekdot);
      return false;
    }
  }

  });

})(window, document);
