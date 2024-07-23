<!-- resources/views/home/home.blade.php -->
@extends('web.layout.app')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/pages/card.css') }}">

@section('content')
    <!-- Hero Section -->
    <section id="hero" class="hero section accent-background">

        <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-5 justify-content-between">
                <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                    <h2><span>Welcome to </span><span class="accent">ADL </span></h2>
                    <p class="hero-text">Plongez dans l'univers excitant du jeu en ligne ADL et tentez votre chance avec
                        notre système de tirage de roue unique!
                        Préparez-vous à vivre une expérience de jeu inégalée avec notre roue de la fortune;
                        Tournez la roue et gagnez des prix incroyables en un instant,
                        connectez-vous chaque jour pour obtenir des tours gratuits et des récompenses supplémentaires;
                        participez à nos tournois hebdomadaires pour des prix encore plus grands .</p>
                    <div class="d-flex">
                        <a href="#" class="btn-get-started">Achetez un Ticket</a>
                        <a href="#" class="glightbox btn-watch-video d-flex align-items-center"><i
                                class="bi bi-play-circle"></i><span>Tutoriel</span></a>
                    </div>
                </div>
                <div class="col-lg-5 order-1 order-lg-2">
                    <img src="assets/img/index-illus.png" class="img-fluid" alt="">
                </div>
            </div>
        </div>

    </section>
    <!-- /Hero Section -->

    <!-- About Section -->
    <section id="about" class="about section padding-vert">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>About Us<br></h2>
        </div><!-- End Section Title -->

        <div class="container">

            <div class="row gy-4">
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                    <img src="assets/img/Free Vector _ Casino games design.jpg" class="img-fluid rounded-4 mb-4"
                        alt="">
                    <p>Bienvenue sur ADL, la plateforme de jeu en ligne révolutionnaire basée sur des tirages de roue!
                        Notre mission est de fournir une expérience de jeu unique et sécurisée à nos utilisateurs.
                        Rejoignez-nous pour des tirages palpitants et des gains incroyables!</p>
                    <p> Profitez de l'opportunité de gagner gros chaque jour avec
                        nos tirages réguliers et nos tournois palpitants. Avec une interface
                        sécurisée et des gains garantis, ADL est la plateforme de jeu en ligne parfaite pour tous les
                        amateurs
                        de sensations fortes. Commencez à jouer dès maintenant et laissez la roue tourner en votre faveur !

                    </p>
                </div>
                <div class="col-lg-6" data-aos="fade-up" data-aos-delay="250">
                    <div class="content ps-0 ps-lg-5">
                        {{-- <p class="fst-italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore
                            magna aliqua.
                        </p> --}}
                        <ul>
                            <li><i class="bi bi-check-circle-fill"></i> <span> Possibilité de gagner de l'argent
                                    instantanément lors de chaque tirage.</span></li>
                            <li><i class="bi bi-check-circle-fill"></i> <span>Obtenir des tours supplémentaires gratuits
                                    pour chaque jeu joué.</span></li>
                            <li><i class="bi bi-check-circle-fill"></i> <span>Monter en niveau pour débloquer des avantages
                                    exclusifs et des prix plus importants.</span></li>
                            <li><i class="bi bi-check-circle-fill"></i> <span>Rejoignez une communauté de joueurs passionnés
                                    et partagez vos succès.</span></li>
                        </ul>
                        <p>
                            Découvrez l'excitation ultime avec notre incroyable roue de la fortune sur ADL !
                            Chaque tour de roue vous rapproche de récompenses instantanées, des bonus exclusifs,
                            et des prix sensationnels.
                        </p>

                        <div class="position-relative mt-4">
                            <img src="assets/img/Best Casino Roulette Games.jpg" class="img-fluid rounded-4" alt="">
                            <a href="assets/img/Nobody -「AMV」- Anime MV.mp4" class="glightbox pulsating-play-btn"></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
    @include('web.partials.pricing')
    <section id="stats" class="stats section padding-vert">
        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-4 justify-content-center">
                {{-- <div class="col-lg-5">
                    <img src="assets/img/stats-img.svg" alt="" class="img-fluid">
                </div> --}}
                <div class="col-lg-8">
                    <div class="row gy-4 justify-content-center">
                        <div class="col-lg-6 mb-6">
                            <div class="stats-item d-flex  align-items-center ">
                                <i class="bi bi-emoji-smile flex-shrink-0"></i>
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="232"
                                        data-purecounter-duration="1" class="purecounter"></span>
                                    <p><strong>Nombre de joueur</strong> <span>présent dans l'application</span></p>
                                </div>
                            </div>
                        </div><!-- End Stats Item -->
                        <div class="col-lg-6 mb-6">
                            <div class="stats-item d-flex  align-items-center ">
                                <i class="bi bi-journal-richtext flex-shrink-0"></i>
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="521"
                                        data-purecounter-duration="1" class="purecounter"></span>
                                    <p><strong>Nombre de gagnant</strong> <span>par semaine</span></p>
                                </div>
                            </div>
                        </div><!-- End Stats Item -->
                        <div class="col-lg-6 mb-6">
                            <div class="stats-item d-flex  align-items-center ">
                                <i class="bi bi-headset flex-shrink-0"></i>
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="1453"
                                        data-purecounter-duration="1" class="purecounter"></span>
                                    <p><strong>Service client</strong> <span>disponible H24/7</span></p>
                                </div>
                            </div>
                        </div><!-- End Stats Item -->
                        <div class="col-lg-6 mb-6">
                            <div class="stats-item d-flex  align-items-center ">
                                <i class="bi bi-people flex-shrink-0"></i>
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="1"
                                        class="purecounter"></span>
                                    <p><strong>Nombre de pays</strong> <span>accédant à la plateforme</span></p>
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
            <img src="assets/img/Experience the Thrill with Mini Roulette 🎰✨.jpg" alt="">
            <div class="content row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                <div class="col-xl-10">
                    <div class="text-center">
                        <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" class="glightbox play-btn"></a>
                        <h3>Commencer maintenant</h3>
                        <p>Préparez-vous à vivre une expérience de jeu inégalée avec notre roue de la fortune !
                            Tournez la roue et gagnez des prix incroyables en un instant,
                            connectez-vous chaque jour pour obtenir des tours gratuits et des récompenses
                            supplémentaires;
                            participez à nos tournois hebdomadaires pour des prix encore plus grands .
                        </p>
                        <a class="cta-btn" href="#">Commencer maintenant</a>
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
            <h2>Comment ça marche? </h2>
        </div><!-- End Section Title -->

        <div class="container">

            <div class="row gy-4">

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item  position-relative element">
                            <div class="icon">
                                <i class="bi bi-box-arrow-in-right"></i>
                            </div>
                            <div class="position-relative mt-4">
                                <h3>Inscription descriptif</h3>
                                <p>Inscrivez-vous dès maintenant sur ADL pour accéder à une expérience de jeu inégalée
                                    et
                                    laisser la roue tourner en votre faveur !
                                </p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item position-relative ">
                            <div class="icon">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                            <div class="position-relative mt-2">
                                <h3>Dépôt d'argent</h3>
                                <p>Déposez de l'argent sur votre compte ADL et débloquerez des bonus exclusifs, des
                                    tours
                                    supplémentaires et
                                    l'accès à des tirages spéciaux avec des prix encore plus impressionnants. </p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item position-relative">
                            <div class="icon">
                                <i class="bi bi-ticket"></i>
                            </div>
                            <div class="position-relative mt-4 align-items-center">
                                <h3>Achat de ticket</h3>
                                <p>Achetez des tickets pour participer à nos tirages excitants et augmentez vos chances
                                    de
                                    gagner des prix
                                    et décrochez des jackpots!
                                </p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item position-relative">
                            <div class="icon">
                                <i class="bi bi-ui-radios"></i>
                            </div>
                            <div class="position-relative mt-4">
                                <h3>type de tirage</h3>
                                <p>Nos tirages offrent une variété de possibilités pour gagner. Choisissez entre des
                                    tirages
                                    quotidiens,
                                    hebdomadaires, ou mensuels, chacun offrant des récompenses uniques et des
                                    opportunités
                                    de gains exceptionnels.</p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item position-relative">
                            <div class="icon">
                                <i class="bi bi-gift"></i>
                            </div>
                            <div class="position-relative mt-4">
                                <h3>Bonus</h3>
                                <p>Profitez de nos bonus exclusifs en achetant des tickets et en participant
                                    régulièrement
                                    aux tirages.</p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                    <a href="{{ route('tutoriel') }}" class="readmore stretched-link text-black">
                        <div class="service-item position-relative">
                            <div class="icon">
                                <i class="bi bi-chat"></i>
                            </div>
                            <div class="position-relative mt-4">
                                <h3>Chat </h3>
                                <p>
                                    Rejoignez notre chat en direct pour discuter avec d'autres joueurs passionnés,
                                    partager des astuces et des stratégies, et célébrer vos victoires ensemble..</p>
                            </div>
                        </div>
                    </a>
                </div><!-- End Service Item -->

            </div>

        </div>

    </section>
    <!-- /Services Section -->

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials section padding-vert">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
            <h2>Temoignages</h2>
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
                            <img src="assets/img/testimonials/testimonials-1.jpg" class="testimonial-img" alt="">
                            <h3>Saul Goodman</h3>
                            <h4>Ceo &amp; Founder</h4>
                            <div class="stars">
                                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i>
                            </div>
                            <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                <span>ADL a changé ma vie! Les tirages sont incroyables et les gains sont réels.</span>
                                <i class="bi bi-quote quote-icon-right"></i>
                            </p>
                        </div>
                    </div><!-- End testimonial item -->

                    <div class="swiper-slide">
                        <div class="testimonial-item">
                            <img src="assets/img/testimonials/testimonials-2.jpg" class="testimonial-img" alt="">
                            <h3>Sara Wilsson</h3>
                            <h4>Designer</h4>
                            <div class="stars">
                                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i>
                            </div>
                            <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                <span>Je ne peux plus m'arrêter de jouer sur ADL. C'est addictif et tellement
                                    amusant!</span>
                                <i class="bi bi-quote quote-icon-right"></i>
                            </p>
                        </div>
                    </div><!-- End testimonial item -->

                    <div class="swiper-slide">
                        <div class="testimonial-item">
                            <img src="assets/img/testimonials/testimonials-3.jpg" class="testimonial-img" alt="">
                            <h3>Jena Karlis</h3>
                            <h4>Store Owner</h4>
                            <div class="stars">
                                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i>
                            </div>
                            <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                <span>ADL m'a permis de gagner de l'argent tout en m'amusant. Une expérience
                                    unique!</span>
                                <i class="bi bi-quote quote-icon-right"></i>
                            </p>
                        </div>
                    </div><!-- End testimonial item -->

                    <div class="swiper-slide">
                        <div class="testimonial-item">
                            <img src="assets/img/testimonials/testimonials-4.jpg" class="testimonial-img" alt="">
                            <h3>Matt Brandon</h3>
                            <h4>Freelancer</h4>
                            <div class="stars">
                                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i>
                            </div>
                            <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                <span>Les tirages sur ADL sont palpitants! Je recommande à tous les amateurs de
                                    jeux.</span>
                                <i class="bi bi-quote quote-icon-right"></i>
                            </p>
                        </div>
                    </div><!-- End testimonial item -->

                    <div class="swiper-slide">
                        <div class="testimonial-item">
                            <img src="assets/img/testimonials/testimonials-5.jpg" class="testimonial-img" alt="">
                            <h3>John Larson</h3>
                            <h4>Entrepreneur</h4>
                            <div class="stars">
                                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                    class="bi bi-star-fill"></i>
                            </div>
                            <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                <span>ADL est la meilleure plateforme de jeu en ligne que j'ai jamais utilisée. Des
                                    gains
                                    incroyables!</span>
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
                        <h3><span><strong>Questions courantes </strong></span></h3>
                    </div>
                </div>

                <div class="col-lg-8" data-aos="fade-up" data-aos-delay="200">

                    <div class="faq-container">
                        <div class="faq-item faq-active">
                            <h3><span class="num">1.</span> <span>Comment participer aux tirages ?</span>
                            </h3>
                            <div class="faq-content">
                                <p>Pour participer, choisissez votre type de tirage, achetez des tickets et attendez le
                                    tirage!</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">2.</span> <span>Quels sont les types de tickets disponibles et
                                    leur durée de validité ?</span></h3>
                            <div class="faq-content">
                                <p>Nous proposons trois types de tickets : 3 Jours (valide pour un tirage),
                                    1 Semaine (valide pour deux tirages consécutifs) et
                                    1 Mois (valide pour huit tirages consécutifs).</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">3.</span> <span>Quand ont lieu les tirages?</span></h3>
                            <div class="faq-content">
                                <p>Les tirages se déroulent tous les lundis, mercredis et samedis à 19h00 GMT.</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">4.</span> <span>Puis-je acheter des tickets pour plusieurs tirages
                                    à l'avance ?</span>
                            </h3>
                            <div class="faq-content">
                                <p>Oui, vous pouvez acheter des tickets pour plusieurs tirages à l'avance selon la durée
                                    de validité du ticket choisi.
                                </p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">5.</span> <span>Comment valider mon accès à la plateforme?</span>
                            </h3>
                            <div class="faq-content">
                                <p>La validité des tickets varie en fonction du type choisi: 3 jours, 1 semaine ou 1
                                    mois.
                                </p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">6.</span> <span>Quelles sont les conditions pour recevoir un
                                    ticket bonus ?</span></h3>
                            <div class="faq-content">
                                <p>ous recevez un ticket bonus si vous n'avez rien gagné au cours du mois précédent,
                                    selon les conditions spécifiées pour chaque bonus mensuel.</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">7.</span> <span>Comment puis-je vérifier si j'ai gagné ?</span>
                            </h3>
                            <div class="faq-content">
                                <p>Vous pouvez consulter l'historique des tirages dans votre compte pour voir si vos
                                    tickets ont été sélectionnés comme gagnants.
                                    Les résultats sont disponibles pour les trois derniers tirages.</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">8.</span> <span>Comment sont calculés les gains et les taxes
                                    applicables ?</span></h3>
                            <div class="faq-content">
                                <p>Les gains sont calculés en fonction du type de ticket et du montant du prix.
                                    Les taxes applicables dépendent du pays de résidence et sont déduites
                                    automatiquement
                                    lors du paiement des gains.
                                </p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">9.</span> <span>Puis-je utiliser des codes promo pour acheter des
                                    tickets à prix réduit ?</span></h3>
                            <div class="faq-content">
                                <p>Oui, les codes promo générés par l'administrateur peuvent être utilisés pour
                                    bénéficier
                                    de réductions sur l'achat de tickets.</p>
                            </div>
                            <i class="faq-toggle bi bi-chevron-right"></i>
                        </div><!-- End Faq item-->

                        <div class="faq-item">
                            <h3><span class="num">10.</span> <span>Comment puis-je retirer mes gains ?</span></h3>
                            <div class="faq-content">
                                <p>Vous pouvez retirer vos gains à partir de votre portefeuille électronique. Les fonds
                                    sont transférés selon vos préférences de paiement.
                                </p>
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
            <h2>Contact</h2>
            {{-- <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p> --}}
        </div><!-- End Section Title -->

        <div class="container" data-aos="fade-up" data-aos-delay="100">

            <div class="row gx-lg-0 gy-4">

                <div class="col-lg-4">
                    <div class="info-container d-flex flex-column align-items-center justify-content-center">
                        <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                            <i class="bi bi-geo-alt flex-shrink-0"></i>
                            <div>
                                <h3>Address</h3>
                                <p>A108 Adam Street, New York, NY 535022</p>
                            </div>
                        </div><!-- End Info Item -->

                        <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                            <i class="bi bi-telephone flex-shrink-0"></i>
                            <div>
                                <h3>Call Us</h3>
                                <p>+1 5589 55488 55</p>
                            </div>
                        </div><!-- End Info Item -->

                        <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                            <i class="bi bi-envelope flex-shrink-0"></i>
                            <div>
                                <h3>Email Us</h3>
                                <p>info@example.com</p>
                            </div>
                        </div><!-- End Info Item -->

                        <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="500">
                            <i class="bi bi-clock flex-shrink-0"></i>
                            <div>
                                <h3>Open Hours:</h3>
                                <p>Mon-Sat: 11AM - 23PM</p>
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
                    <form action="{{ route('Contact.store') }}" method="post" class="php-email-form" data-aos="fade"
                        data-aos-delay="100">
                        @csrf
                        <div class="row gy-4">

                            <div class="col-md-6">
                                <input type="text" name="nom" class="form-control" placeholder="Your Name"
                                    required="">
                            </div>

                            <div class="col-md-6 ">
                                <input type="email" class="form-control" name="email" placeholder="Your Email"
                                    required="">
                            </div>

                            <div class="col-md-12">
                                <input type="text" class="form-control" name="sujet" placeholder="Subject"
                                    required="">
                            </div>

                            <div class="col-md-12">
                                <textarea class="form-control" name="description" rows="8" placeholder="Message" required=""></textarea>
                            </div>

                            <div class="col-md-12 text-center">
                                <div class="loading">Loading</div>
                                <div class="error-message"></div>
                                <div class="sent-message">Your message has been sent. Thank you!</div>

                                <button type="submit">Send Message</button>
                            </div>

                        </div>
                    </form>
                </div><!-- End Contact Form -->

            </div>

        </div>

    </section><!-- /Contact Section -->
@endsection
