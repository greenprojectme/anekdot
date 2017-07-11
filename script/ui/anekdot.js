class AnekdotUI extends Controller {
  get(id) {
    let self = this;
    $(self.view.list + ' li[data-anekdot="' + id + '"]').onceClass('active');
    Anekdot.get(id).then(function(response) {
      $(self.view.name, self.view.text).clear();
      $(self.view.name).html(response.title);
      var textArr = response.version[0].text.split('\n');
      textArr.forEach(string => $(self.view.text).add('p').text(string));
    });
  }
  rand() {
    let anekdot = Anekdot.rand();
    return this.get(anekdot.id);
  }

  Event() {
    let self = this;

    return {
    /** загрузка случайного анекдота */
      rand(event) {
        self.rand();
        return false;
      }
    }
  }
}
