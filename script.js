(function(window, document, undefined) {
/** Сайт с пронумерованными анекдотами
  *
  */
  "use strict";

/** @subsection Controllers */
  let anekdot = new AnekdotUI({
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
  });

  let tag = new TagUI({
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
  });

/** @section DATA */
  let ui = new UI({anekdot, tag});

/** @section INIT */
  $.ready(_ => ui.ready());

})(window, document);
