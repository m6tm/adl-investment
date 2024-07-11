<!-- resources/views/home/home.blade.php -->
@extends('layout.app')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">

@section('content')
    <!-- Hero Section -->
    {{-- <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="{{ asset('img/Bullion-Coins!.jpg') }}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('img/Silver-Opportunities-Web-Banner.jpg') }}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('img/Website-Banner-1 (1).jpg') }}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('img/Website-Banner-2-(Smart-Bonanza) (1).jpg') }}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('img/Website-Banner-3-(Smart-Plus) (1).jpg') }}" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div> --}}

    <section id="hero" class="hero section accent-background">

        <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
          <div class="row gy-5 justify-content-between">
            <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h2><span>Welcome to </span><span class="accent">ADL Gaming</span></h2>
                <p>Plongez dans l'univers excitant du jeu en ligne ADL et tentez votre chance avec notre système de tirage de roue unique!</p>
              <div class="d-flex">
                <a href="#about" class="btn-get-started">Get Started</a>
                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" class="glightbox btn-watch-video d-flex align-items-center"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2">
              <img src="assets/img/hero-img.svg" class="img-fluid" alt="">
            </div>
          </div>
        </div>
  
        <div class="icon-boxes position-relative" data-aos="fade-up" data-aos-delay="200">
          <div class="container position-relative">
            <div class="row gy-4 mt-5">
  
              <div class="col-xl-3 col-md-6">
                <div class="icon-box">
                    <h5>Card Title</h5>
                    <p>Some text</p>
                    <a href="#" class="btn btn-primary">Acheter</a>
                </div>
              </div>
              <!--End Icon Box -->
  
              <div class="col-xl-3 col-md-6">
                <div class="icon-box">
                </div>
              </div>
              <!--End Icon Box -->
  
              <div class="col-xl-3 col-md-6">
                <div class="icon-box">
                </div>
              </div>
              <!--End Icon Box -->
  
              <div class="col-xl-3 col-md-6">
                <div class="icon-box">
                </div>
              </div>
              <!--End Icon Box -->
  
            </div>
          </div>
        </div>
  
      </section>

    
    <!-- /Hero Section -->
@endsection
