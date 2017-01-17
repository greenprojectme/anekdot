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
    public static function all() {}
    public static function add() {}
    public static function get($id) {}
    public static function ver($id) {}
    public static function upd($id, $version) {}
    public static function num($id, $num) {}
    public static function tag($id, $tag) {}
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
