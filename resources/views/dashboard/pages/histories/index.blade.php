@extends('dashboard.layout.base')

@php
	$title = 'Historique de Tirage';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumbs="[['title' => $title]]" />
			<!-- Breadcrumb End -->

			<!-- ====== Table Section Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<x-error-message-alert class="mb-4" />
					
					<!-- ====== Table Four Start -->
					<x-tables.draw-history-table :histories="$histories" />
					<!-- ====== Table Four End -->
				</div>
			</div>
			<!-- ====== Table Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
