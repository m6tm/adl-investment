@extends('dashboard.layout.base')

@php
	$title = 'Create Permission';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumbs="[['title' => 'Permissions', 'route' => route('dashboard.permissions')], ['title' => $title]]" />
			<!-- Breadcrumb End -->

			<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
				<!-- ====== Data Table One Start -->
				<div class="rounded-sm border p-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				</div>
				<!-- ====== Data Table One End -->
			</div>
		</div>
	</main>
@endsection
