@extends('layouts.website')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">

@section('content')

    <!-- Page Title -->
    <div class="page-title">
        <div class="heading">
            <div class="container">
                <div class="row d-flex justify-content-center text-center">
                    <div class="col-lg-8">
                        <h1>Team of Service</h1>
                        <p class="mb-0">Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint
                            voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi
                            ratione sint. Sit quaerat ipsum dolorem.</p>
                    </div>
                </div>
            </div>
        </div>
        <nav class="breadcrumbs">
            <div class="container">
                <ol>
                    <li><a href="{{ route('load.page', 'home') }}">Home</a></li>
                    <li class="current">Team of Service</li>
                </ol>
            </div>
        </nav>
    </div><!-- End Page Title -->

    <!-- Team of Service Section -->
    <section id="team-of-service" class="team-of-service section padding-vert">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Team of Service<br></h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div><!-- End Section Title -->

        <div class="container">
            <div class="row gy-4">
                <div class="col-lg-12" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="text-danger section-title">Notre mission</h3>
                    <p>Bienvenue sur ADL, la plateforme de jeu en ligne révolutionnaire basée sur des tirages de roue!
                        Notre mission est de fournir une expérience de jeu unique et sécurisée à nos utilisateurs.
                        Rejoignez-nous pour des tirages palpitants et des gains incroyables!</p>
                    <p>Temporibus nihil enim deserunt sed ea. Provident sit expedita aut cupiditate nihil vitae quo officia
                        vel. Blanditiis eligendi possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut repellendus
                        nobis tempore doloribus debitis explicabo similique sit. Accusantium sed ut omnis beatae neque
                        deleniti repellendus.</p>
                </div>
                <div class="col-lg-12" data-aos="fade-up" data-aos-delay="250">
                    <h3 class="text-danger section-title">Notre equipe</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                    <ul>
                        <li><i class="bi bi-check-circle-fill"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</span></li>
                        <li><i class="bi bi-check-circle-fill"></i> <span>Duis aute irure dolor in reprehenderit in
                                voluptate velit.</span></li>
                        <li><i class="bi bi-check-circle-fill"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda
                                mastiro dolore eu fugiat nulla pariatur.</span></li>
                    </ul>
                    <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident.
                    </p>
                </div>
                <div class="col-lg-12" data-aos="fade-up" data-aos-delay="350">
                    <h3 class="text-danger section-title">Nos valeurs</h3>
                    <p>Temporibus nihil enim deserunt sed ea. Provident sit expedita aut cupiditate nihil vitae quo officia
                        vel. Blanditiis eligendi possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut repellendus
                        nobis tempore doloribus debitis explicabo similique sit. Accusantium sed ut omnis beatae neque
                        deleniti repellendus.</p>
                </div>
            </div>
        </div>
    </section><!-- End Team of Service Section -->


    {{-- @include('web.partials.team') --}}

@endsection
