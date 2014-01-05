<?php
//App::error(function(Exception $exception)
//{
//    Log::error($exception);
//    return \Illuminate\Support\Facades\Response::json($exception);
//});
//App::fatal(function($exception)
//{
//    //
//});

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
$app = $this->app;
# Handle HttpException errors (Not others)
$app->error(function(HttpExceptionInterface $exception, $code) use ($app)
{
    if ( $app['request']->header('accept') === 'application/json' )
    {
        // I thought you must create 'Request' object manually
        // as $app['response'] doesn't exit when this is ran...
        // However we can grab its Facade (apparently)
        // via $app['Response'] - Note the capitalization

        //$response = new Response; # Don't need

        return $app['Response']::json([
                'error' => true,
                'message' => $exception->getMessage(),
                'code' => $code],
            $code
        );
    }

});

//App::error(function(Exception $exception, $code)
//{
//    return Response::json(array(
//        'error' => 'Something went wrong (Exception)'
//    ), 500);
//});
//
//App::error(function(NotAllowedException $exception, $code)
//{
//    return Response::json(array(
//        'error' => 'Something went wrong (NotAllowedException)'
//    ), 401);
//});


//
//App::error(function(InvalidUserException $exception)
//{
//    Log::error($exception);
//
//    return 'Sorry! Something is wrong with this account!';
//});
