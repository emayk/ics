<?php
error_reporting(E_ALL);
require('./vendor/autoload.php');
require_once('./Activity.php');
$app_id = '61939';
$app_key = '4cab3f20d5ec5f89f81d';
$app_secret = '8add43cf163f2ae857d6';



$message = '[ '.date('d-M-Y h:i:s',null).'] ';
if (isset($argv)) {
    $message = $message . $argv[1];
}

$activity_type = 'activity';
$activity_data = null;
$email = 'test@server_name_d.com';

$action_text = $message;
$activity = new Activity($activity_type, $action_text, $email);
$data = $activity->getMessage();

$pusher = new Pusher(
                     $app_key,
                     $app_secret,
                     $app_id,
                     false, 'https://api.pusherapp.com', 443 );

$pusher->trigger('server_name_d', $activity_type, $data);



