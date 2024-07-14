@extends('web.layout.app')
<link rel="stylesheet" href="{{ asset('assets/css/pages/404.css') }}">

@section('content')

<section class="error-page padding-vert ">
    <div class="overlay pt-120 pb-120">
        <div class="container wow fadeInUp">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <img src="assets/img/error-page-illus.png" class="max-un" alt="Illustration">
                </div>
            </div>
        </div>
    </div>
</section>
@endsection