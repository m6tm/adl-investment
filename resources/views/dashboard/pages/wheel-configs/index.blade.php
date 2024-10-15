@extends('dashboard.layout.base')

@php
	$title = 'Pamétrage des Tirages';
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

			<!-- Section Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5 place-content-center">
                    <x-error-message-alert class="mb-4" />
					@if (auth()->user()->can('create.user'))
						<a href="#" class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white">
							Créer un ticket
						</a>
					@endif
					<!-- ====== Table Start -->
					<x-tables.ticket-prices-table :prices="$prices" />
					<!-- ====== Table End -->
                </div>
			</div>
			<!-- Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
