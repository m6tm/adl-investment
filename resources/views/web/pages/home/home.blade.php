<!-- resources/views/home/home.blade.php -->
@extends('layouts.website')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/pages/card.css') }}">

@section('content')
	<!-- Hero Section -->
	<section id="hero" class="hero section accent-background">

		<div class=" container position-relative py-5 " data-aos="fade-up" data-aos-delay="200">
			<div class="row gy-4 mt-5 justify-content-between">
				<div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
					<h2><span>{{ __('home.banner.title') }} </span><span class="accent">ADL </span></h2>
					<p class="hero-text">{{ __('home.banner.text') }}</p>
					<div class="d-flex">
						<a href="#" class="btn-get-started">{{ __('home.banner.call to action') }}</a>
					</div>
				</div>
				<div class="col-lg-3 order-1 order-lg-1">
					<img src="{{ asset('assets/img/Roue_ADL-transparent.png') }}" class="img-fluid"
						alt="{{ __('home.banner.image alternative') }}">
				</div>
			</div>
		</div>

	</section>
	<!-- /Hero Section -->

	<!-- About Section -->
	<section id="about" class="about section padding-vert">

		<!-- Section Title -->
		<div class="container section-title" data-aos="fade-up">
			<h2>{{ __('home.about.title') }}<br></h2>
		</div>
        <!-- End Section Title -->

		<div class="container">
			<div class="row gy-4">
				<div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
					<img src="{{ asset('assets/img/web/usa-1197608_640.jpg') }}" class="img-fluid rounded-4 mb-4"
						alt="{{ __('home.about.american dream alt') }}">
					<p>{{ __('home.about.text 1') }}</p>
					<p>{{ __('home.about.text 2') }}</p>
				</div>
				<div class="col-lg-6" data-aos="fade-up" data-aos-delay="250">
					<div class="content ps-0 ps-lg-5">
						<ul>
							<li><i class="bi bi-check-circle-fill"></i> <span>{{ __('home.about.list.1') }}</span></li>
							<li><i class="bi bi-check-circle-fill"></i> <span>{{ __('home.about.list.2') }}</span></li>
							<li><i class="bi bi-check-circle-fill"></i> <span>{{ __('home.about.list.3') }}</span></li>
							<li><i class="bi bi-check-circle-fill"></i> <span>{{ __('home.about.list.4') }}</span></li>
						</ul>
						<p>
							{{ __('home.about.text 3') }}
						</p>

						<div class="position-relative mt-4">
							<img src="{{ asset('assets/img/web/AmericanDream1_1024x630.jpeg') }}" class="img-fluid rounded-4"
								alt="{{ __('about.img alt') }}">
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
	@include('web.partials.pricing')
	@include('web.partials.winning')
	<section id="stats" class="stats section padding-vert">
		<div class="container" data-aos="fade-up" data-aos-delay="100">
			<div class="row gy-4 justify-content-center">
				<div class="col-lg-8">
					<div class="row gy-4 justify-content-center">
						<div class="col-lg-6 mb-6">
							<div class="stats-item d-flex  align-items-center ">
								<i class="bi bi-emoji-smile flex-shrink-0"></i>
								<div>
									<span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1"
										class="purecounter"></span>
									<p><strong>{{ __('home.rate.stats.players.title') }}</strong>
										<span>{{ __('home.rate.stats.players.subtitle') }}</span></p>
								</div>
							</div>
						</div><!-- End Stats Item -->
						<div class="col-lg-6 mb-6">
							<div class="stats-item d-flex  align-items-center ">
								<i class="bi bi-journal-richtext flex-shrink-0"></i>
								<div>
									<span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1"
										class="purecounter"></span>
									<p><strong>{{ __('home.rate.stats.winners.title') }}</strong>
										<span>{{ __('home.rate.stats.winners.subtitle') }}</span></p>
								</div>
							</div>
						</div><!-- End Stats Item -->
						<div class="col-lg-6 mb-6">
							<div class="stats-item d-flex  align-items-center ">
								<i class="bi bi-headset flex-shrink-0"></i>
								<div>
									<span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="1"
										class="purecounter"></span>
									<p><strong>{{ __('home.rate.stats.customer_service.title') }}</strong>
										<span>{{ __('home.rate.stats.customer_service.subtitle') }}</span></p>
								</div>
							</div>
						</div><!-- End Stats Item -->
						<div class="col-lg-6 mb-6">
							<div class="stats-item d-flex  align-items-center ">
								<i class="bi bi-people flex-shrink-0"></i>
								<div>
									<span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1"
										class="purecounter"></span>
									<p><strong>{{ __('home.rate.stats.countries.title') }}</strong>
										<span>{{ __('home.rate.stats.countries.subtitle') }}</span></p>
								</div>
							</div>
						</div><!-- End Stats Item -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- /Stats Section -->

	<!-- Call To Action Section -->
	<section id="call-to-action" class="call-to-action section dark-background padding-vert">
		<div class="container">
			<img src="{{ asset('assets/img/web/broker-6882754_1280.jpg') }}" alt="">
			<div class="content row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
				<div class="col-xl-10">
					<div class="text-center">
						<h3>{{ __('home.call_to_action.title') }}</h3>
						<p>{{ __('home.call_to_action.description') }}</p>
						<a class="cta-btn" href="#">{{ __('home.call_to_action.button') }}</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- /Call To Action Section -->

	<!-- Services Section -->
	<section id="services" class="services section padding-vert">

		<!-- Section Title -->
		<div class="container section-title" data-aos="fade-up">
			<h2>{{ __('home.services.title') }}</h2>
		</div><!-- End Section Title -->

		<div class="container">

			<div class="row gy-4">

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-box-arrow-in-right"></i>
                        </div>
                        <div class="position-relative mt-4">
                            <h3>{{ __('home.services.items.0.title') }}</h3>
                            <p>{{ __('home.services.items.0.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-currency-dollar"></i>
                        </div>
                        <div class="position-relative mt-2">
                            <h3>{{ __('home.services.items.1.title') }}</h3>
                            <p>{{ __('home.services.items.1.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-ticket"></i>
                        </div>
                        <div class="position-relative mt-4 align-items-center">
                            <h3>{{ __('home.services.items.2.title') }}</h3>
                            <p>{{ __('home.services.items.2.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-ui-radios"></i>
                        </div>
                        <div class="position-relative mt-4">
                            <h3>{{ __('home.services.items.3.title') }}</h3>
                            <p>{{ __('home.services.items.3.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-gift"></i>
                        </div>
                        <div class="position-relative mt-4">
                            <h3>{{ __('home.services.items.4.title') }}</h3>
                            <p>{{ __('home.services.items.4.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

				<div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                    <div class="service-item position-relative cursor-pointer" data-link="{{ route('tutoriel') }}">
                        <div class="icon">
                            <i class="bi bi-chat"></i>
                        </div>
                        <div class="position-relative mt-4">
                            <h3>{{ __('home.services.items.5.title') }}</h3>
                            <p>{{ __('home.services.items.5.description') }}</p>
                        </div>
                    </div>
				</div><!-- End Service Item -->

			</div>

		</div>

	</section>
	<!-- /Services Section -->

	<!-- Testimonials Section -->
	<section id="testimonials" class="testimonials section padding-vert">

		<!-- Section Title -->
		<div class="container section-title" data-aos="fade-up">
			<h2>{{ __('home.testimonials.title') }}</h2>
		</div><!-- End Section Title -->

		<div class="container" data-aos="fade-up" data-aos-delay="100">

			<div class="swiper init-swiper">
				<script type="application/json" class="swiper-config">
              {
                "loop": true,
                "speed": 600,
                "autoplay": {
                  "delay": 5000
                },
                "slidesPerView": "auto",
                "pagination": {
                  "el": ".swiper-pagination",
                  "type": "bullets",
                  "clickable": true
                },
                "breakpoints": {
                  "320": {
                    "slidesPerView": 1,
                    "spaceBetween": 40
                  },
                  "1200": {
                    "slidesPerView": 3,
                    "spaceBetween": 10
                  }
                }
              }
            </script>
				<div class="swiper-wrapper">

					<div class="swiper-slide">
						<div class="testimonial-item">
							<img src="{{ asset('assets/img/testimonials/testimonials-1.jpg') }}" class="testimonial-img" alt="">
							<h3>{{ __('home.testimonials.items.0.name') }}</h3>
							<h4>{{ __('home.testimonials.items.0.position') }}</h4>
							<div class="stars">
								<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
									class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
							</div>
							<p>
								<i class="bi bi-quote quote-icon-left"></i>
								<span>{{ __('home.testimonials.items.0.quote') }}</span>
								<i class="bi bi-quote quote-icon-right"></i>
							</p>
						</div>
					</div><!-- End testimonial item -->

					<div class="swiper-slide">
						<div class="testimonial-item">
							<img src="{{ asset('assets/img/testimonials/testimonials-2.jpg') }}" class="testimonial-img" alt="">
							<h3>{{ __('home.testimonials.items.1.name') }}</h3>
							<h4>{{ __('home.testimonials.items.1.position') }}</h4>
							<div class="stars">
								<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
									class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
							</div>
							<p>
								<i class="bi bi-quote quote-icon-left"></i>
								<span>{{ __('home.testimonials.items.1.quote') }}</span>
								<i class="bi bi-quote quote-icon-right"></i>
							</p>
						</div>
					</div><!-- End testimonial item -->

					<div class="swiper-slide">
						<div class="testimonial-item">
							<img src="{{ asset('assets/img/testimonials/testimonials-3.jpg') }}" class="testimonial-img" alt="">
							<h3>{{ __('home.testimonials.items.2.name') }}</h3>
							<h4>{{ __('home.testimonials.items.2.position') }}</h4>
							<div class="stars">
								<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
									class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
							</div>
							<p>
								<i class="bi bi-quote quote-icon-left"></i>
								<span>{{ __('home.testimonials.items.2.quote') }}</span>
								<i class="bi bi-quote quote-icon-right"></i>
							</p>
						</div>
					</div><!-- End testimonial item -->

					<div class="swiper-slide">
						<div class="testimonial-item">
							<img src="{{ asset('assets/img/testimonials/testimonials-4.jpg') }}" class="testimonial-img" alt="">
							<h3>{{ __('home.testimonials.items.3.name') }}</h3>
							<h4>{{ __('home.testimonials.items.3.position') }}</h4>
							<div class="stars">
								<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
									class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
							</div>
							<p>
								<i class="bi bi-quote quote-icon-left"></i>
								<span>{{ __('home.testimonials.items.3.quote') }}</span>
								<i class="bi bi-quote quote-icon-right"></i>
							</p>
						</div>
					</div><!-- End testimonial item -->

					<div class="swiper-slide">
						<div class="testimonial-item">
							<img src="{{ asset('assets/img/testimonials/testimonials-5.jpg') }}" class="testimonial-img" alt="">
							<h3>{{ __('home.testimonials.items.4.name') }}</h3>
							<h4>{{ __('home.testimonials.items.4.position') }}</h4>
							<div class="stars">
								<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
									class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
							</div>
							<p>
								<i class="bi bi-quote quote-icon-left"></i>
								<span>{{ __('home.testimonials.items.4.quote') }}</span>
								<i class="bi bi-quote quote-icon-right"></i>
							</p>
						</div>
					</div><!-- End testimonial item -->

				</div>
				<div class="swiper-pagination"></div>
			</div>

		</div>

	</section>

	<!-- Faq Section -->
	<section id="faq" class="faq section padding-vert">

		<div class="container">

			<div class="row gy-4">

				<div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
					<div class="content px-xl-5">
						<h3><span><strong>{{ __('home.faq.title') }}</strong></span></h3>
					</div>
				</div>

				<div class="col-lg-8" data-aos="fade-up" data-aos-delay="200">

					<div class="faq-container">
						<div class="faq-item faq-active">
							<h3><span class="num">1.</span> <span>{{ __('home.faq.items.0.question') }}</span>
							</h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.0.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">2.</span> <span>{{ __('home.faq.items.1.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.1.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">3.</span> <span>{{ __('home.faq.items.2.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.2.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">4.</span> <span>{{ __('home.faq.items.3.question') }}</span>
							</h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.3.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">5.</span> <span>{{ __('home.faq.items.4.question') }}</span>
							</h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.4.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">6.</span> <span>{{ __('home.faq.items.5.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.5.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">7.</span> <span>{{ __('home.faq.items.6.question') }}</span>
							</h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.6.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">8.</span> <span>{{ __('home.faq.items.7.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.7.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">9.</span> <span>{{ __('home.faq.items.8.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.8.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

						<div class="faq-item">
							<h3><span class="num">10.</span> <span>{{ __('home.faq.items.9.question') }}</span></h3>
							<div class="faq-content">
								<p>{{ __('home.faq.items.9.answer') }}</p>
							</div>
							<i class="faq-toggle bi bi-chevron-right"></i>
						</div><!-- End Faq item-->

					</div>

				</div>
			</div>

		</div>

	</section>
	<!-- /Faq Section -->

	<!-- Contact Section -->
	<section id="contact" class="contact section padding-vert">

		<!-- Section Title -->
		<div class="container section-title" data-aos="fade-up">
			<h2>{{ __('home.contact.title') }}</h2>
			{{-- <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p> --}}
		</div><!-- End Section Title -->

		<div class="container" data-aos="fade-up" data-aos-delay="100">

			<div class="row gx-lg-0 gy-4">

				<div class="col-lg-4">
					<div class="info-container d-flex flex-column align-items-center justify-content-center">
						<div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
							<i class="bi bi-geo-alt flex-shrink-0"></i>
							<div>
								<h3>{{ __('home.contact.address.title') }}</h3>
								<p>{{ __('home.contact.address.content') }}</p>
							</div>
						</div><!-- End Info Item -->

						<div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
							<i class="bi bi-telephone flex-shrink-0"></i>
							<div>
								<h3>{{ __('home.contact.call_us.title') }}</h3>
								<p>{{ __('home.contact.call_us.content') }}</p>
							</div>
						</div><!-- End Info Item -->

						<div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
							<i class="bi bi-envelope flex-shrink-0"></i>
							<div>
								<h3>{{ __('home.contact.email_us.title') }}</h3>
								<p>{{ __('home.contact.email_us.content') }}</p>
							</div>
						</div><!-- End Info Item -->

						<div class="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
							<i class="bi bi-clock flex-shrink-0"></i>
							<div>
								<h3>{{ __('home.contact.open_hours.title') }}</h3>
								<p>{{ __('home.contact.open_hours.content') }}</p>
							</div>
						</div><!-- End Info Item -->

					</div>

				</div>

				@if (session('success'))
					<div class="alert alert-success">
						{{ session('success') }}
					</div>
				@endif
				<div class="col-lg-8">
					<form action="{{ route('contact.store']) }}" method="post"
						class="php-email-form" data-aos="fade" data-aos-delay="100">
						@csrf
						<div class="row gy-4">

							<div class="col-md-6">
								<input type="text" name="nom" class="form-control"
									placeholder="{{ __('home.contact.form.name_placeholder') }}" required="">
							</div>

							<div class="col-md-6 ">
								<input type="email" class="form-control" name="email"
									placeholder="{{ __('home.contact.form.email_placeholder') }}" required="">
							</div>

							<div class="col-md-12">
								<input type="text" class="form-control" name="sujet"
									placeholder="{{ __('home.contact.form.subject_placeholder') }}" required="">
							</div>

							<div class="col-md-12">
								<textarea class="form-control" name="description" rows="8"
								 placeholder="{{ __('home.contact.form.message_placeholder') }}" required=""></textarea>
							</div>

							<div class="col-md-12 text-center">
								<div class="loading">{{ __('home.contact.form.loading') }}</div>
								<div class="error-message"></div>
								<div class="sent-message">{{ __('home.contact.form.success_message') }}</div>

								<button type="submit">{{ __('home.contact.form.submit_button') }}</button>
							</div>

						</div>
					</form>
				</div><!-- End Contact Form -->

			</div>

		</div>

	</section><!-- /Contact Section -->
@endsection