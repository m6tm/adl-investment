@extends('web.layout.app')
<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">

@section('content')
	<main id="tutoriel">
		<!-- Page Title -->
		<div class="page-title ">
			<div class="heading">
				<div class="container">
					<div class="row d-flex justify-content-center text-center">
						<div class="col-lg-8">
							<h1>{{ __('tutoriel.tutoriel') }}</h1>
						</div>
					</div>
				</div>
			</div>
			<nav class="breadcrumbs">
				<div class="container">
					<ol>
						<li><a href="{{ route('home', ['lang' => app()->getLocale()]) }}#services">{{ __('tutoriel.home') }}</a></li>
						<li class="current">{{ __('tutoriel.tutoriels') }}</li>
					</ol>
				</div>
			</nav>
		</div>
        <!-- End Page Title -->
		<!-- Portfolio Section -->
		<section class="portfolio section padding-vert">

			<!-- Section Title -->
			<div class="container section-title" data-aos="fade-up">
				<h2>{{ __('tutoriel.tutoriel_game') }}</h2>
				<p>{{ __('tutoriel.learn_to_play') }}</p>
            </div>
            <!-- End Section Title -->

			<div class="container">

				<div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

					<div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

						<div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
							<div class="portfolio-content h-100">
								<a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" class="glightbox"><img
										src="{{ asset('assets/img/Roue_ADL.png') }}" class="img-fluid tuto-img mx-auto my-4" alt=""></a>
								<div class="portfolio-info">
									<h4><a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" title="More Details">Tutoriel
											1</a></h4>
									<p>Lorem ipsum, dolor sit amet consectetur</p>
								</div>
							</div>
						</div><!-- End Portfolio Item -->

						<div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
							<div class="portfolio-content h-100">
								<a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" class="glightbox"><img
										src="{{ asset('assets/img/Roue_ADL.png') }}" class="img-fluid tuto-img mx-auto my-4" alt=""></a>
								<div class="portfolio-info">
									<h4><a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" title="More Details">Tutoriel
											1</a></h4>
									<p>Lorem ipsum, dolor sit amet consectetur</p>
								</div>
							</div>
						</div><!-- End Portfolio Item -->

						<div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
							<div class="portfolio-content h-100">
								<a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" class="glightbox"><img
										src="{{ asset('assets/img/Roue_ADL.png') }}" class="img-fluid tuto-img mx-auto my-4" alt=""></a>
								<div class="portfolio-info">
									<h4><a href="{{ route('tutoriel-details', ['lang' => app()->getLocale()]) }}" title="More Details">Tutoriel
											1</a></h4>
									<p>Lorem ipsum, dolor sit amet consectetur</p>
								</div>
							</div>
						</div><!-- End Portfolio Item -->

					</div><!-- End Portfolio Container -->

				</div>

			</div>

		</section><!-- /Portfolio Section -->
	</main>
@endsection
