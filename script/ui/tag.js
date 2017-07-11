class TagUI extends Controller {
/** сохраняет тег */
  add(name) {
    let self = this;
    Tag.add(name)
      .then(self.save)
      .then(_ => $(self.form.add.name).value(''))
  }

  save(tags) {
    let self = this;
    UI.list(tags, self.view.list);
    UI.list(tags, self.view.edit);
    return tags;
  }

/** @section События */
  Event() {
    let self = this;

    return {
    /** событие сохранения тега */
      add(e) {
        let item = getInputText(sekf.form.add.name);
        self.add(item);
        return false;
      }
    }
  }
}
