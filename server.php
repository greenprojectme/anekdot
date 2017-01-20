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
    public static function all() { // вернуть список всех тегов
      return Api::select('*', 'tag', ['hide' => 0]);
    }
    public static function add($name) { // Добавить новый тег и вернуть список всех
      $result = Api::insert('tag', ['name' => $name]); // в фон (@todo?)
      return Tag::all();
    }
  }
/** @section Анекдоты @todo */
  class Anekdot {
    public static function all() {
      return Api::select('id, number, name', 'anekdot', ['hide' => 0]);
    }
    public static function add($caption, $number, $text, $name = '') {
      $anekdot = Api::insert('anekdot', ['caption' => $caption, 'number' => $number]);
      $version = Anekdot::upd($anekdot['id'], $text, '');
      return Anekdot::all();
    }
    public static function get($id) {
      $anekdot = Api::select('*', 'anekdot', ['anekdot.hide' => 0, 'anekdot.id' => $id]);
      $anekdot['version'] = Anekdot::versions($anekdot['id']);
      $anekdot['tag']     = Anekdot::tags    ($anekdot['id']);
      return $anekdot;
    }
    public static function versions($anekdot) {
      return Api::select('name, text', 'version', ['anekdot' => $anekdot, 'hide' => 0]);
    }
    public static function tags($anekdot) {
      return Api::select('tag.id, tag.name', 'link, tag', ['link.anekdot' => $anekdot, 'link.hide' => 0, 'tag.hide' => 0], ['link.tag' => 'tag.id']);
    }
    public static function upd($anekdot, $version, $name) {
      Api::insert('version', ['anekdot' => $anekdot, 'version' => $version, 'name' => $name]);
      return Anekdot::versions($anekdot);
    }
    public static function num($anekdot, $number) {
      
    }
    public static function tag($anekdot, $tag) {

    }
  }

/** @section Обработка запросов */
  $response = array();
  $method   = strtolower(_::str('method'));
  switch ($method) {
  /** @subsection Обработка запросов к Api */
    case     'tag.all': $response = Tag::all();               break; // Список всех тегов
    case     'tag.add': $response = Tag::add(_::str('name')); break; // Добавление нового тега
    // case 'anekdot.all': $response = Anekdot.all(); break; // и т. д.
    // @todo

  /** @subsection Обработка ошибочного запроса */
    default: Api::error(0, $method . ' : Неверный запрос к Api');    // Все прочие запросы игнорируются
  }
/** @section Ответ сервера */
  Api::out($response);
/** @section Закрытие подключеня к БД */
  $DBH = null;
?>
