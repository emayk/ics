<!DOCTYPE html>
<!-- <head>
  <title>Pusher Test</title>
  <script src="http://js.pusher.com/2.1/pusher.min.js" type="text/javascript"></script>
  <script type="text/javascript">
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher('4cab3f20d5ec5f89f81d');
    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function(data) {
      alert(data.message);
    });
  </script>
</head>
 -->

<html>
<head>
  <title>Monitoring Pusher </title>
<link href="{{ Icsview::asset('message/activity-streams.css') }}"rel="stylesheet" type="text/css" />
<script type="text/javascript" src="{{ Icsview::asset('message/jquery-1.7.1.min.js') }} "></script>
<script type="text/javascript" src="{{ Icsview::asset('message/pusher.min.js') }} "></script>
<script type="text/javascript" src="{{ Icsview::asset('message/PusherActivityStreamer.js') }} "></script>

<script type="text/javascript">
$(function() {
  var pusher = new Pusher('4cab3f20d5ec5f89f81d');
  var channel = pusher.subscribe('server_name_d');
  var streamer = new PusherActivityStreamer(channel, '#activity_stream_example');

});
</script>
</head>
<body>
Event From Client ::::
<hr>
<ul id="activity_stream_example" class="activity-stream"></ul>




</body>
</html>