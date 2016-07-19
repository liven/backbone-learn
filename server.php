<?php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();


$app->get('/tasks/{id}', function($id) use($app) {
    $tasks = json_decode(file_get_contents(__DIR__ . '/database/tasks.json'), true);
    $result = null;
    foreach($tasks as $task) {
        if ($task['id'] == $id ) {
            $result = $task;
        }
    }
    return json_encode($result);
});

$app->run();
