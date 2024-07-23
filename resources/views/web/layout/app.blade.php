<!DOCTYPE html>
<html lang="en">

<head>
  @include('web.links-head.css-link')
</head>

<body class="index-page">
    <header id="header" class="header fixed-top">
        @include('web.partials.header')
    </header>
    <main class="main">
        {{-- HERO SECTION    --}}
        @yield('content')
    </main>

    <footer id="footer" class="footer accent-background">
        @include('web.partials.footer')
    </footer>

    <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
<!-- <div id="preloader"></div> -->
        <!-- Importation de tous les fichiers JS utilisés dans l'application -->
    @include('web.links-head.js-link')
</body>

</html>
