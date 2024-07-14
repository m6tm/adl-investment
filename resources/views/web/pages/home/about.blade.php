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
@endsection