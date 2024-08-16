<link rel="stylesheet" href="{{ asset('assets/css/partials/footer.css') }}">

<div class="container footer-top">
	<div class="row gy-4">
		<div class="col-lg-5 col-md-12 footer-about">
			<a href="index.html" class="logo d-flex align-items-center">
				<span class="sitename">ADL</span>
			</a>
			<p>{{ __('partials/footer.description') }}</p>
			<div class="social-links d-flex mt-4">
				<a href=""><i class="bi bi-twitter-x"></i></a>
				<a href=""><i class="bi bi-facebook"></i></a>
				<a href=""><i class="bi bi-instagram"></i></a>
				<a href=""><i class="bi bi-linkedin"></i></a>
			</div>
		</div>

		<div class="col-lg-2 col-6 footer-links">
			<h4>{{ __('partials/footer.useful_links') }}</h4>
			<ul>
				<li><a href="#">{{ __('partials/footer.home') }}</a></li>
				<li><a href="{{ route('about', ['lang' => app()->getLocale()]) }}#aboutus">{{ __('partials/footer.about_us') }}</a></li>
				<li><a href="{{ route('tutoriel', ['lang' => app()->getLocale()]) }}#tutoriel">{{ __('partials/footer.tutorial') }}</a></li>
				<li><a href="{{ route('conditions', ['lang' => app()->getLocale()]) }}">{{ __('partials/footer.terms_of_service') }}</a></li>
				<li><a href="{{ route('privacy', ['lang' => app()->getLocale()]) }}">{{ __('partials/footer.privacy_policy') }}</a></li>
			</ul>
		</div>

		<div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
			<h4>{{ __('partials/footer.contact_us') }}</h4>
			<p>{{ __('partials/footer.neighborhood') }}</p>
			<p>{{ __('partials/footer.city') }}</p>
			<p>{{ __('partials/footer.country') }}</p>
			<p class="mt-4"><strong>{{ __('partials/footer.phone') }}</strong> <span>+1 5589 55488 55</span></p>
			<p><strong>{{ __('partials/footer.email') }}</strong> <span>adl.investment.55@gmail.com</span></p>
		</div>

	</div>
</div>

<div class="container copyright text-center mt-4">
	<p>© <span>{{ __('partials/footer.copyright') }}</span> <strong class="px-1 sitename">ADL 2024</strong> <span>{{ __('partials/footer.all_rights_reserved') }}</span></p>
	<div class="credits">
		{{ __('partials/footer.designed_by') }} <a href="#">DevGroup</a>
	</div>
</div>
