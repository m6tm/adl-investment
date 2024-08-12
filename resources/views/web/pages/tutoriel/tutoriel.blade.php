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
                            <h1>Tutoriel</h1>
                            <p class="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint
                                voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores.
                                Quasi
                                ratione sint. Sit quaerat ipsum dolorem.</p>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="breadcrumbs">
                <div class="container">
                    <ol>
                        <li><a href="{{ route('home') }}#services">Home</a></li>
                        <li class="">Pages</li>
                        <li class="current">Tutoriel</li>
                    </ol>
                </div>
            </nav>
        </div><!-- End Page Title -->
        <!-- Portfolio Section -->
        <section class="portfolio section padding-vert">

            <!-- Section Title -->
            <div class="container section-title" data-aos="fade-up">
                <h2>Tutoriel Game</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div><!-- End Section Title -->

            <div class="container">

                <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

                    <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                            <div class="portfolio-content h-100">
                                <a href="assets/img/Nobody -「AMV」- Anime MV.mp4" data-gallery="portfolio-gallery-app"
                                    class="glightbox"><img src="assets/img/Roue_ADL.png " class="img-fluid tuto-img mx-auto my-4"
                                        alt=""></a>
                                <div class="portfolio-info">
                                    <h4><a href="{{ route('tutoriel-details') }}" title="More Details">Tutoriel 1</a></h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                </div>
                            </div>
                        </div><!-- End Portfolio Item -->

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                            <div class="portfolio-content h-100">
                                <a href="assets/img/Nobody -「AMV」- Anime MV.mp4" data-gallery="portfolio-gallery-app"
                                    class="glightbox"><img src="assets/img/Roue_ADL.png" class="img-fluid tuto-img mx-auto my-4"
                                        alt=""></a>
                                <div class="portfolio-info">
                                    <h4><a href="{{ route('tutoriel-details') }}" title="More Details">Tutoriel 1</a></h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                </div>
                            </div>
                        </div><!-- End Portfolio Item -->

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                            <div class="portfolio-content h-100">
                                <a href="assets/img/Nobody -「AMV」- Anime MV.mp4" data-gallery="portfolio-gallery-app"
                                    class="glightbox"><img src="assets/img/Roue_ADL.png" class="img-fluid tuto-img mx-auto my-4"
                                        alt=""></a>
                                <div class="portfolio-info">
                                    <h4><a href="{{ route('tutoriel-details') }}" title="More Details">Tutoriel 1</a></h4>
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
