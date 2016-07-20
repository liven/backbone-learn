<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();
$app['database'] = __DIR__.'/database/contacts.json';

$app->get('/contacts', function() use($app) {
    $tasks = json_decode(file_get_contents($app['database']), true);
    return json_encode($tasks);
});


$app->get('/contacts/{id}', function($id) use($app) {
    $tasks = json_decode(file_get_contents($app['database']), true);
    $result = null;
    foreach($tasks as $task) {
        if ($task['id'] == $id ) {
            $result = $task;
        }
    }
    return json_encode($result);
});

$app->put('/contacts/{id}',function(Request $request, $id) use($app) {
    $content = json_decode($request->getContent(),true);
    $tasks = json_decode(file_get_contents($app['database']), true);
    $result = null;
    foreach($tasks as $key => $task) {
        if ($task['id'] == $id ) {
            $newTask = array_merge($task, $content);
            $tasks[$key] = $newTask;
        }
    }
    file_put_contents($app['database'], json_encode($tasks));
    return new Response('');
});

$app->delete('/contacts/{id}',function($id) use($app) {
    $tasks = json_decode(file_get_contents($app['database']), true);
    $result = null;
    foreach($tasks as $key => $task) {
        if ($task['id'] == $id ) {
            unset($tasks[$key]);
        }
    }
    file_put_contents($app['database'], json_encode($tasks));
    return new Response('');
});

$app->post('/contacts',function(Request $request) use($app) {
    $content = json_decode($request->getContent(),true);
    $tasks = json_decode(file_get_contents($app['database']), true);
    $id = 0;
    foreach($tasks as $task) {
        if ($task['id'] > $id ) {
            $id = $task['id'];
        }
    }
    $content['id'] = $id + 1;
    $tasks[] = $content;
    file_put_contents($app['database'], json_encode($tasks));
    return new Response(json_encode($content));
});

$app['debug'] = true;
$app->run();
