<?php
  $root = $_SERVER['DOCUMENT_ROOT'];
  require_once($root . '/api/api.php');
  require_once($root . '/api/params.php');

  $project = 'anekdot';
  $connect = Api::$home . '/connect.ini';
  $handler = parse_ini_file($connect, true)[$project];
  $DBH     = Api::mysql($handler);

  require_once('server/tag.php');
  require_once('server/anekdot.php');
  require_once('server/version.php');
  require_once('server/ratio.php');

/** @section Обработка запросов к Api @router */
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
