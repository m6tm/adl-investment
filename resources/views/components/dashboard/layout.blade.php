@extends('dashboard.layout.base')

@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x-breadcrumb :breadcrumbs="$breadcrumb" />
			<!-- Breadcrumb End -->

			{{ $slot }}
		</div>
	</main>
@endsection
