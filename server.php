<?php
  $root = $_SERVER['DOCUMENT_ROOT'];
  require_once($root . '/api/api.php');
  require_once($root . '/api/params.php');

  $project = 'anekdot';
  $connect = Api::$home . '/connect.ini';
  $handler = parse_ini_file($connect, true)[$project];
  $DBH     = Api::mysql($handler);

  // ...

/** @section Теги */
  class Tag {
  /** Список всех тегов
    * @returns {Array} of Tag
    */
    public static function all() { // вернуть список всех тегов
      return Api::select('*', 'tag', ['hide' => 0]);
    }

  /** Добавление тега
    * @param name {string} название добавляемого тега
    * @returns {Array} tag.all
    */
    public static function add($name) { // Добавить новый тег и вернуть список всех
      $result = Api::insert('tag', ['name' => $name]); // в фон (@todo?)
      return Tag::all();
    }

  /** Список всех анекдотов с выбранным тегом
    * @param tag {natural} идентификатор тега
    * @returns {Array}
    */
    public static function get($tag) {
      return Api::select('anekdot', 'link', ['tag' => $tag]);
    }

  /** Добавление тега анекдоту
    * @param anekdot {natural} идентификатор анекдота
    * @param tag {natural} идентификатор тега
    * @returns {Anekdot} anekdot.get
    */
    public static function attach($tag, $anekdot) {
      Api::insert('link', ['anekdot' => $anekdot, 'tag' => $tag]);
      return Anekdot::get($anekdot);
    }
  }

/** @section Анекдоты */
  class Anekdot {
  /** Список всех анекдотов
    * @returns {Array[id, number, caption, anekdot]}
    */
    public static function all() {
      return Api::select('id, number, caption', 'anekdot', ['hide' => 0]);
    }

  /** Добавление нового анекдота
    * @param caption {string} название анекдота (@todo - сделать необязательным)
    * @param number {number?} номер добавляемого анекдота
    * @param text {string} первая версия текста анекдота
    * @param name {string} название первой версии текста анекдота
    * @returns {Array} anekdot.all
    */
    public static function add($caption, $number, $text, $name = '') {
      $anekdot = Api::insert('anekdot', ['caption' => $caption, 'number' => $number]);
      $version = Anekdot::upd($anekdot, $text, $name);
      /** @todo проверка успешности добавления */
      return Anekdot::all();
    }

  /** Полная информация об анекдоте
    * @param id {natural} идентификатор анекдота
    * @returns {Anekdot}
    */
    public static function get($id) {
      $anekdot = Api::select('id, number, caption', 'anekdot', ['anekdot.hide' => 0, 'anekdot.id' => $id])[0];
      $anekdot['version'] = Anekdot::versions($anekdot['id']);
      $anekdot['tag']     = Anekdot::tags    ($anekdot['id']);
      return $anekdot;
    }

  /** Список тегов анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @returns {Array} of Tag
    */
    public static function tags($anekdot) {
      return Api::select('tag.id, tag.name', 'link, tag', ['link.anekdot' => $anekdot, 'link.hide' => 0, 'tag.hide' => 0], ['link.tag' => 'tag.id']);
    }

  /** Список версий текста анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @returns {Array} of Tag
    */
    public static function versions($anekdot) {
      return Api::select('name, text', 'version', ['anekdot' => $anekdot, 'hide' => 0]);
    }
  }

  class Version {
  /** Добавление версии текста анекдота
    * @param anekdot {natural} идентификатор анекдота
    * @param text {string} текст добавляемой версии
    * @param name {string?} название добавляемой версии
    */
    public static function attach($anekdot, $text, $name) {
      Api::insert('version', ['anekdot' => $anekdot, 'text' => $text, 'name' => $name]);
      return Anekdot::versions($anekdot);
    }
  }

  class Ratio {
  /** Добавление анекдоту номера
    * @param anekdot {natural} идентификатор анекдота
    * @param number {natural} добавляемый номер
    * @returns {Anekdot} anekdot.get
    */
    public static function attach($anekdot, $number) {
      // @todo unique
      Api::update('anekdot', ['number' => $number], $anekdot);
      return Anekdot::get($anekdot);
    }
  }

/** @section Обработка запросов к Api*/
  $response = array();
  $method   = strtolower(_::str('method'));

  switch ($method) {
  /** @subsection Работа с тегами */
    case 'tag.all': // Список всех тегов
      $response = Tag::all();
      break;
    case 'tag.add': // Добавление нового тега
      $response = Tag::add(_::str('name'));
      break;
    case 'tag.get': // Список всех анекдотов с данным тегом
      $response = Tag::get(_::int('tag'));
      break;
    case 'tag.attach': // Добавление тега анекдоту
      $response = Tag::attach(_::int('tag'), _::int('anekdot'));
      break;

  /** @subsection Работа с анекдотами */
    case 'anekdot.all': // Список всех анекдотов
      $response = Anekdot::all();
      break;
    case 'anekdot.add': // Добавление нового анекдота
      $response = Anekdot::add(_::str('caption'), _::int('number'), _::str('text'), _::str('name'));
      break;
    case 'anekdot.get': // Информация об анекдоте
      $response = Anekdot::get(_::int('id'));
      break;
    case 'anekdot.tags': // Список тегов анекдота
      $response = Anekdot::tag(_::int('anekdot'));
      break;
    case 'anekdot.version': // Список версий анекдота
      $response = Anekdot::versions(_::int('anekdot'));
      break;

  /** @subsection Работа с текстами анекдотов */
    case 'anekdot.upd': // Добавление версии анекдота
      $response = Version::upd(_::int('anekdot'), _::str('version'), _::str('name'));
      break;

  /** @subsection Работа с оценками и номерами */
    case 'ratio.attach': // Добавление анекдоту номера
      $response = Ratio::attach(_::int('anekdot'), _::int('number'));
      break;

      // @todo

  /** @subsection Обработка ошибочного запроса */
    default: // Все прочие запросы игнорируются
      Api::error(0, $method . ' : Неверный запрос к Api');
  }

/** @section Ответ сервера */
  Api::out($response);
/** @section Закрытие подключеня к БД */
  $DBH = null;
?>
