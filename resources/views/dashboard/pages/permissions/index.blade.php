@extends('dashboard.layout.base')

@php
	$title = 'Permissions';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-title-md2 font-bold text-black dark:text-white">
					{{ $title }}
				</h2>

				<nav>
					<ol class="flex items-center gap-2">
						<li>
							<a class="font-medium" href="index.html">Dashboard /</a>
						</li>
						<li class="font-medium text-primary">{{ $title }}</li>
					</ol>
				</nav>
			</div>
			<!-- Breadcrumb End -->

			<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
				<!-- ====== Data Table One Start -->
				<div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<x-tables.permission-table :permissions="collect([])" />
				</div>
				<!-- ====== Data Table One End -->
			</div>
		</div>
	</main>
@endsection
