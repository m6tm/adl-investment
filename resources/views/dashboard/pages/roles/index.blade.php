@extends('dashboard.layout.base')

@php
	$title = 'Roles';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x-breadcrumb :breadcrumbs="[['title' => $title]]" />
			<!-- Breadcrumb End -->

			<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
				<!-- ====== Data Table One Start -->
				<div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<x-error-message-alert class="mx-5 mb-4" />
					<x-tables.role-table :roles="$roles" />
				</div>
				<!-- ====== Data Table One End -->
			</div>
		</div>
	</main>
@endsection
