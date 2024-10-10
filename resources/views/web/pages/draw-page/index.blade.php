<!-- resources/views/home/home.blade.php -->
@extends('layouts.website')

@section('content')
    <div class="w-full min-h-screen flex justify-center items-center">
        <iframe src="{{ env('APP_SERVICE_URL') . '/winwheel' }}" class="w-full h-screen overflow-y-hidden" frameborder="0"></iframe>
    </div>
@endsection
