<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

	<head>
		@include('layouts.partials.head')
		{{-- @cookieconsentscripts --}}
	</head>

	<body class="index-page">
		{{-- @cookieconsentview --}}

		@include('layouts.partials.navbar')
		<main class="main">
			{{-- HERO SECTION    --}}
			@yield('content')
		</main>
		<x-support.client-message-component />

		<footer id="footer" class="footer accent-background">
			@include('layouts.partials.footer')
		</footer>

		<!-- Scroll Top -->
		<a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i
				class="bi bi-arrow-up-short"></i></a>

		<!-- Preloader -->
		<!-- <div id="preloader"></div> -->

		<!-- Importation de tous les fichiers JS utilisés dans l'application -->
		@include('layouts.partials.scripts')
	</body>

</html>
