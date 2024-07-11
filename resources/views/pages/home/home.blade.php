<!-- resources/views/home/home.blade.php -->
@extends('layout.app')

<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">

@section('content')
    <!-- Hero Section -->
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
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
                <img src="{{ asset('img/Website-Banner-2-(Smart-Bonanza) (1).jpg') }}" class="d-block w-100"
                    alt="...">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('img/Website-Banner-3-(Smart-Plus) (1).jpg') }}" class="d-block w-100"
                    alt="...">
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
    </div>

    <section id="hero" class="hero section accent-background">
        <div class="container position-relative text-center" data-aos="fade-up" data-aos-delay="100">
            <div class="row gy-5 justify-content-center">
                <div>
                    <h2><span>Welcome to </span><span class="accent">ADL</span></h2>
                    <p>Sed autem laudantium dolores. Voluptatem itaque ea consequatur eveniet. Eum quas beatae cumque eum quaerat.</p>
                </div>
            </div>
        </div>        
      </section>
    <!-- /Hero Section -->
@endsection
