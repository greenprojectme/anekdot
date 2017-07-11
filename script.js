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
      .then(ui.tag.save);

    /** загружает анекдоты в список анекдотов */
    Anekdot.all()
      .then(ui.anekdot.save)
      .then(ui.anekdot.event.rand);

    /** добавляем событие загрузки следующего анекдота */
    $(ui.anekdot.form.next).on({click: ui.anekdot.event.rand});

    /** добавляет событие сохранения анекдота */
    $(ui.anekdot.form.add.form).on({ submit: ui.anekdot.event.add })

    /** добавляет событие сохранения тега */
    $(ui.tag.form.add.form).on({ submit: ui.tag.event.add });
  });

})(window, document);
