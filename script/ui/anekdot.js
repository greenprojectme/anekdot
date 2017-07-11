class AnekdotUI extends Controller {

  get(id) {
    let self = this;
    $(self.view.list + ' li[data-anekdot="' + id + '"]').onceClass('active');
    Anekdot.get(id).then(self.show);
  }

  show(anekdot) {
    $(self.view.name, self.view.text).clear();
    $(self.view.name).html(anekdot.title);
    let textArr = anekdot.version[0].text.split('\n');
    let view = $(self.view.text);
    textArr.forEach(string => view.add('p').text(string));
  }

  rand() {
    let anekdot = Anekdot.rand();
    return this.get(anekdot.id);
  }

/** сохраняет анекдот */
  add(caption, number, text, name) {
    let self = this;
    let anekdot = {caption, number, text, name};
    return Anekdot.add(anekdot)
      .then(self.save);
  }

  save(anekdots) {
    let self = this;
    return UI.list(anekdots, self.view.list, callback);

    function callback(item, node) {
      node.data({anekdot: item.id}).on({click});
    }

    function click(event) {
      let anekdot = this.data('anekdot');
      self.get(anekdot);
      return false;
    }
  }

/** @section События */
  Event() {
    let self = this;

    return {
    /** загрузка случайного анекдота */
      rand(event) {
        self.rand();
        return false;
      },

    /** Событие сохранения анекдота */
      add(e) {
        let name = UI.value(self.form.add.name);
        let text = UI.value(self.form.add.text);
        self.add(name, 100, text, name);
        return false;
      }
    }
  }
}
