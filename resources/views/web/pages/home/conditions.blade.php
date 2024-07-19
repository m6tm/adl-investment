@extends('web.layout.app')
<link rel="stylesheet" href="{{ asset('assets/css/pages/home.css') }}">
<script src="{{ asset('assets/js/app.js') }}"></script>

@section('content')
    <!-- Page Title -->
<div class="page-title ">
    <div class="heading">
        <div class="container">
            <div class="row d-flex justify-content-center text-center">
                <div class="col-lg-8">
                    <h1>Conditions Terms</h1>
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
                <li><a href="{{ route('home') }}">Home</a></li>
                <li class="current">Terms</li>
            </ol>
        </div>
    </nav>
</div><!-- End Page Title -->

 <!-- About Section -->
 <section class="about section padding-vert">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
        <h2>Conditions Terms<br></h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
    </div><!-- End Section Title -->

    <div class="container">

        <div class="row gy-4">

        </div>

    </div>

</section><!-- /About Section -->
@endsection
