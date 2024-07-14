@extends('web.layout.app')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">

@section('content')
    <!-- Page Title -->
    <div class="page-title ">
        <div class="heading">
            <div class="container">
                <div class="row d-flex justify-content-center text-center">
                    <div class="col-lg-8">
                        <h1>About Us</h1>
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
                    <li class="current">About Us</li>
                </ol>
            </div>
        </nav>
    </div><!-- End Page Title -->

      <!-- About Section -->
      <section id="about" class="about section padding-vert">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>About Us<br></h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div><!-- End Section Title -->

        <div class="container">

            <div class="row gy-4">
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <h3>Voluptatem dignissimos provident laboris nisi ut aliquip ex ea commodo</h3>
                    <img src="assets/img/about.jpg" class="img-fluid rounded-4 mb-4" alt="">
                    <p>Bienvenue sur ADL, la plateforme de jeu en ligne révolutionnaire basée sur des tirages de roue!
                        Notre mission est de fournir une expérience de jeu unique et sécurisée à nos utilisateurs.
                        Rejoignez-nous pour des tirages palpitants et des gains incroyables!</p>
                    <p>Temporibus nihil enim deserunt sed ea. Provident sit expedita aut cupiditate nihil vitae quo officia
                        vel. Blanditiis eligendi possimus et in cum. Quidem eos ut sint rem veniam qui. Ut ut repellendus
                        nobis tempore doloribus debitis explicabo similique sit. Accusantium sed ut omnis beatae neque
                        deleniti repellendus.</p>
                </div>
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                    <div class="content ps-0 ps-lg-5">
                        <p class="fst-italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore
                            magna aliqua.
                        </p>
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
                            in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident
                        </p>

                        <div class="position-relative mt-4">
                            <img src="assets/img/about-2.jpg" class="img-fluid rounded-4" alt="">
                            <a href="assets/img/Nobody -「AMV」- Anime MV.mp4" class="glightbox pulsating-play-btn"></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section><!-- /About Section -->

    <section class="about section padding-vert">

        <div class="container">

            <div class="row gy-4">
                <div class="col-lg-4">
                    <div class="content">
                        <img src="assets/img/about-illus.png" class="img-fluid">
                    </div>
                </div>
                <div class="col-lg-8">
                    <h2 class="text-danger text-xxl font-weight-bold">We dream big so you can win big</h2>
                    
                    <p class="hero-text">
                        There are many variations of passages of Lorem Ipsum available, 
                        but the majority have suffered alteration in some form, by injected humour, 
                        or randomised words which don't look even ...
                    </p>
                    <br>
                    <div class="content ps-0 ps-lg-5">
                        <ul>
                            <li><i class="bi bi-check-circle-fill"></i> <span>He of his in its price always and feedback of films.</span></li>
                            <li><i class="bi bi-check-circle-fill"></i> <span>Towards sight as not and each and, good. </span></li>
                            <li><i class="bi bi-check-circle-fill"></i> <span>Tone, the of preparations never a even viable a. </span></li>
                        </ul>
                    </div>

                </div>
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                    
                </div>
            </div>

        </div>

    </section>

    <section id="team" class="team section padding-vert">
    
        <div class="container">
    
            <div class="row gy-4">
    
                <div class="col-xl-3 col-md-6 d-flex" >
                    <div class="member">
                        <img src="assets/img/counter/counter-icon-1.png" class="img-fluid" alt="">
                        <h4 data-purecounter-start="0" data-purecounter-end="502010"
                        data-purecounter-duration="1" class="purecounter">K</h4>
                        <span>Players</span>
                    </div>
                </div><!-- End Team Member -->
    
                <div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
                    <div class="member">
                        <img src="assets/img/counter/counter-icon-2.png" class="img-fluid" alt="">
                        <h4 data-purecounter-start="0" data-purecounter-end="521000"
                        data-purecounter-duration="1" class="purecounter"></h4>
                        <span>Lotteries</span>
                    </div>
                </div><!-- End Team Member -->
    
                <div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
                    <div class="member">
                        <img src="assets/img/counter/counter-icon-3.png" class="img-fluid" alt="">
                        <h4 data-purecounter-start="0" data-purecounter-end="521000"
                        data-purecounter-duration="1" class="purecounter">K</h4>
                        <span>Jackpot</span>
                    </div>
                </div><!-- End Team Member -->
    
                <div class="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="400">
                    <div class="member">
                        <img src="assets/img/counter/counter-icon-4.png" class="img-fluid" alt="">
                        <h4 data-purecounter-start="0" data-purecounter-end="521000"
                        data-purecounter-duration="1" class="purecounter text-xxl">K</h4>
                        <span>Satisfied</span>
                    </div>
                </div><!-- End Team Member -->
    
            </div>
    
        </div>
    
    </section>

     <!-- How it works start -->
     <section class="how-works section-bg padding-vert">
        <div class="overlay position-relative pt-120 pb-120">
            <div class="shape-area">
                <img src="{{ asset('assets/img/ball/ball-bg-icon-1.png') }}" class="shape-1" alt="Image">
                <img src="{{ asset('assets/img/ball/ball-bg-icon-1.png') }}" class="shape-2" alt="Image">
                <img src="{{ asset('assets/img/ball/ball-bg-icon-1.png') }}" class="shape-3" alt="Image">
                <img src="{{ asset('assets/img/ball/ball-bg-icon-1.png') }}" class="shape-4" alt="Image">
                <img src="{{ asset('assets/img/ball/ball-bg-icon-1.png') }}" class="shape-5" alt="Image">
            </div>
            <div class="container wow fadeInUp">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-xl-7 col-xxl-6">
                        <div class="container section-title" data-aos="fade-up">
                            <h2>How it works<br></h2>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, </p>
                        </div><!-- End Section Title -->
                    </div>
                </div>
                <div class="row overflow-hidden">
                    <div class="col-lg-12">
                        <div class="scroll-line">
                            <div class="row align-items-center">
                                <div class="col-xl-5 col-md-7 col-sm-10">
                                    <div class="single-box wow fadeInLeft">
                                        <div class="text-area text-end">
                                            <h4>Set A Budget.</h4>
                                            <p>Playing the lottery is gambling, so keep it fun by treating it as part of your entertainment budget.</p>
                                        </div>
                                        <div class="icon-area">
                                            <img src="assets/img/counter/counter-icon-4.png" alt="icon">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 d-none d-sm-block d-flex justify-content-center">
                                    <div class="point-area">
                                        <span>1</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center justify-content-end">
                                <div class="col-sm-2 d-none d-sm-block d-flex justify-content-center">
                                    <div class="point-area">
                                        <span>2</span>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-md-7 col-sm-10">
                                    <div class="single-box wow fadeInRight">
                                        <div class="icon-area">
                                            <img src="assets/img/counter/counter-icon-4.png" alt="icon">
                                        </div>
                                        <div class="text-area">
                                            <h4>Choose Your Lottery.</h4>
                                            <p>There are 5 exciting draw-based jackpot you can try one or all of them. like powerball etc. & There are many variations...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-xl-5 col-md-7 col-sm-10">
                                    <div class="single-box wow fadeInLeft">
                                        <div class="text-area text-end">
                                            <h4>Pick Your Numbers.</h4>
                                            <p>Playing the lottery is gambling, so keep it fun by treating it as part of your entertainment budget.</p>
                                        </div>
                                        <div class="icon-area">
                                            <img src="assets/img/counter/counter-icon-4.png" alt="icon">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 d-none d-sm-block d-flex justify-content-center">
                                    <div class="point-area">
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center justify-content-end">
                                <div class="col-sm-2 d-none d-sm-block d-flex justify-content-center">
                                    <div class="point-area">
                                        <span>4</span>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-md-7 col-sm-10">
                                    <div class="single-box wow fadeInRight">
                                        <div class="icon-area">
                                            <img src="assets/img/counter/counter-icon-4.png" alt="icon">
                                        </div>
                                        <div class="text-area">
                                            <h4>Check Your Numbers.</h4>
                                            <p>Playing the lottery is gambling, so keep it fun by treating it as part of your entertainment budget.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('web.partials.team')

@endsection
