<link rel="stylesheet" href="{{ asset('assets/css/partials/header.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/utils.css') }}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>

<header id="header" class="header fixed-top">
	<div class="bg-danger-2-500 py-2 px-3 md:px-20">
		<div class="lg:flex justify-between">
			<div class="md:flex space-x-4">
				<i class="bi bi-envelope text-white">
					<a href="mailto:{{ env('ADMIN_MAIL_ADDRESS') }}" class="text-white ms-2">{{ env('ADMIN_MAIL_ADDRESS') }}</a>
				</i>
				<a href="tel:{{ env('ADMIN_PHONE_NUMBER') }}"class="text-white text-nowrap">
					<i class="bi bi-phone me-2"><span>{{ env('ADMIN_PHONE_NUMBER') }}</span></i>
				</a>
				<div class="social-links space-x-3">
					<a href="#" class="twitter text-white text-sm"><i class="bi bi-twitter-x"></i></a>
					<a href="#" class="facebook text-white text-sm"><i class="bi bi-facebook"></i></a>
					<a href="#" class="instagram text-white text-sm"><i class="bi bi-instagram"></i></a>
					<a href="#" class="linkedin text-white text-sm"><i class="bi bi-linkedin"></i></a>
				</div>
			</div>
			<div class="social-links space-x-3 flex justify-end">
				<a href="{{ route('login') }}" class="text-neutral-200">
					<i class="bi bi-person-fill"></i>
					<span>{{ __('home.login') }}</span>
				</a>
				<a href="{{ route('register') }}" class="text-neutral-200">
					<i class="bi bi-pencil-square"></i>
					<span>{{ __('home.registration') }}</span>
				</a>
			</div>
		</div>
	</div>
	<div class="navbar px-3 md:px-20">
		<div class="flex-1">
		  <a href="{{ route('home') }}" class="btn btn-ghost text-xl logo">
			<h1 class="sitename">ADL - </h1>
			<span class="accent">Investment</span>
		  </a>
		</div>
		<div class="hidden md:block">
		  <ul class="menu menu-horizontal px-1">
			<li><a href="{{ route('home') }}" class="active">{{ __('partials/header.home') }}<br></a></li>
			<li><a href="{{ route('home') }}#contact" class="text-white">{{ __('partials/header.contact') }}</a></li>
			<li><a href="{{ route('tutoriel') }}#tutoriel" class="text-white">{{ __('partials/header.tuto') }}</a></li>
			<li><a href="{{ route('about') }}#aboutus" class="text-white">{{ __('partials/header.about') }}</a></li>
			<li><a href="{{ route('conditions') }}" class="text-white">{{ __('partials/header.service') }}</a></li>
			<li><a href="{{ route('privacy') }}" class="text-white">{{ __('partials/header.privacy_policy') }}</a></li>
			<li>
				<div class="dropdown dropdown-left py-0 h-full">
					<div tabindex="0" role="button" class="px-3 py-2">
						<span class="fi fi-{{ app()->getLocale() == 'en' ? 'us' : 'fr' }}"></span>
					</div>
					<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
						<li>
							<a href="{{ route('set.locale', 'fr') }}"><span class="fi fi-fr"></span> Français</a>
							<a href="{{ route('set.locale', 'en') }}"><span class="fi fi-us"></span> English</a>
						</li>
					</ul>
				</div>
			</li>
		  </ul>
		</div>
		<div class="dropdown dropdown-left md:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle text-white">
			  <svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
				  stroke-linecap="round"
				  stroke-linejoin="round"
				  stroke-width="2"
				  d="M4 6h16M4 12h16M4 18h7" />
			  </svg>
			</div>
			<ul
			  tabindex="0"
			  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
			  <li><a href="{{ route('home') }}" class="active">{{ __('partials/header.home') }}<br></a></li>
			  <li><a href="{{ route('home') }}#contact">{{ __('partials/header.contact') }}</a></li>
			  <li><a href="{{ route('tutoriel') }}#tutoriel">{{ __('partials/header.tuto') }}</a></li>
			  <li><a href="{{ route('about') }}#aboutus">{{ __('partials/header.about') }}</a></li>
			  <li><a href="{{ route('conditions') }}">{{ __('partials/header.service') }}</a></li>
			  <li><a href="{{ route('privacy') }}">{{ __('partials/header.privacy_policy') }}</a></li>
			</ul>
		  </div>
		</div>
	</div>
	<!-- End Top Bar -->

	<div class="branding align-items-cente hidden">

		<div class="container position-relative d-flex align-items-center justify-content-between">
			<a href="{{ route('home') }}" class="logo d-flex align-items-center">
				<h1 class="sitename">ADL - </h1>
				<span class="accent">Investment</span>
			</a>

			<nav id="navmenu" class="navmenu">
				<ul>
					<li><a href="{{ route('home') }}" class="active">{{ __('partials/header.home') }}<br></a></li>
					<li><a href="{{ route('home') }}#contact">{{ __('partials/header.contact') }}</a></li>
					<li><a href="{{ route('tutoriel') }}#tutoriel">{{ __('partials/header.tuto') }}</a></li>
					<li><a href="{{ route('about') }}#aboutus">{{ __('partials/header.about') }}</a></li>
					<li><a href="{{ route('conditions') }}">{{ __('partials/header.service') }}</a></li>
					<li><a href="{{ route('privacy') }}">{{ __('partials/header.privacy_policy') }}</a></li>
					<li>
						<div class="dropdown dropdown-end me-4">
							<div tabindex="0" role="button" class="p-3">
								<span class="fi fi-{{ app()->getLocale() == 'en' ? 'us' : 'fr' }}"></span>
							</div>
							<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
								<li>
									<a href="{{ route('set.locale', 'fr') }}"><span class="fi fi-fr"></span> Français</a>
									<a href="{{ route('set.locale', 'en') }}"><span class="fi fi-us"></span> English</a>
								</li>
							</ul>
						</div>
					</li>
					<i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
				</ul>
			</nav>
		</div>

	</div>

</header>
