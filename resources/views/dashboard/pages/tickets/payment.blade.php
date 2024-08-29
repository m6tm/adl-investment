@extends('dashboard.layout.base')

@php
	$title = 'Paiement de Tickets';
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
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
                <div class="w-full px-8 py-4">
                    <div class="relative flex items-center justify-between w-full">
                        <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
                        <div class="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-black transition-all duration-500">
                        </div>
                        <div
                        class="relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-primary rounded-full place-items-center">
                        1
                        </div>
                        <div
                        class="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-whiter rounded-full place-items-center">
                        2
                        </div>
                        <div
                        class="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-whiter rounded-full place-items-center">
                        3
                        </div>
                    </div>

                    <div class="flex justify-around mt-20">
                        <a
                            href="#"
                            class="inline-flex items-center justify-center rounded-md border border-black px-10 py-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            OM
                        </a>
                        <a
                            href="#"
                            class="inline-flex items-center justify-center rounded-md border border-black px-10 py-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            MoMo
                        </a>
                    </div>

                    <div class="flex justify-between mt-20">
                        <a href="{{ route('dashboard.tickets.create') }}" class="px-4 py-2 inline-block rounded-md bg-primary text-white">
                            Modifier
                        </a>
                        <a href="{{ route('dashboard.tickets.pay') }}" class="px-4 py-2 ml-5 inline-block rounded-md bg-primary text-white">
                            Next
                        </a>
                    </div>
                </div>

                </div>
			</div>
			<!-- Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
