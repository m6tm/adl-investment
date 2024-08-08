<!doctype html>
<html class="" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'ADL Investment') }} .:. @yield('title')</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss'])
</head>
<body class="bg-neutral-100 dark:bg-slate-800 dark:text-white">
    <!-- ===== Preloader Start ===== -->
    <div x-show="loaded" class="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
    <!-- ===== Preloader End ===== -->
    <!-- ===== Page Wrapper Start ===== -->
    <div class="flex h-screen overflow-hidden">
        <!-- ===== Sidebar Start ===== -->
        <x-dashboard.sidebar />
        <!-- ===== Content Area Start ===== -->
        <div
          class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        >
            <x-dashboard.header />
            @yield('content')
        </div>
    </div>
    <script src="https://unpkg.com/lucide@latest"></script>
    @vite(['resources/js/app.js'])
</body>
</html>
