<link rel="stylesheet" href="{{ asset('assets/css/partials/header.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/utils.css') }}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>

<header id="header" class="header fixed-top">
	<div class="topbar d-flex align-items-center">
		<div class="container d-flex justify-content-center justify-content-md-between">
			<div class="contact-info d-flex align-items-center">
				<i class="bi bi-envelope d-flex align-items-center">
					<a href="mailto:{{ env('ADMIN_MAIL_ADDRESS') }}">{{ env('ADMIN_MAIL_ADDRESS') }}</a>
				</i>
				<a href="tel:{{ env('ADMIN_PHONE_NUMBER') }}">
					<i class="bi bi-phone d-flex align-items-center ms-4"><span>{{ env('ADMIN_PHONE_NUMBER') }}</span></i>
				</a>
			</div>
			<div class="social-links d-none d-md-flex align-items-center">
				<a href="#" class="twitter"><i class="bi bi-twitter-x"></i></a>
				<a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
				<a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
				<a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
			</div>
			<div class="social-links d-none d-md-flex align-items-center">
				<a href="{{ route('login') }}">
					<i class="bi bi-person-fill"></i>
					<span>{{ __('home.login') }}</span>
				</a>
				<a href="{{ route('register') }}">
					<i class="bi bi-pencil-square"></i>
					<span>{{ __('home.registration') }}</span>
				</a>
			</div>
		</div>
	</div><!-- End Top Bar -->

	<div class="branding d-flex align-items-cente">

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
