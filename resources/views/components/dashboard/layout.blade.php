@extends('dashboard.layout.base')

@section('title')
	{{ $title }}
@endsection

@section('content')
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css" />
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x-breadcrumb :breadcrumb="$breadcrumb" />
			<!-- Breadcrumb End -->

			{{ $slot }}
		</div>
	</main>
@endsection
