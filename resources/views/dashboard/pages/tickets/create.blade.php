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
			<x--breadcrumb :breadcrumb="[['title' => $title]]" />
			<!-- Breadcrumb End -->

			<!-- Section Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
                    <div class="flex flex-col space-y-4">
                        <div class="flex justify-between items-center">
                            <p class="text-lg text-black dark:text-white">
                                Ticket $1
                            </p>
                            <div class="relative w-2/12">
                                <span class="absolute left-4.5 top-3.5">
                                    <i data-lucide="x" class="size-5"></i>
                                </span>
                                <input
                                    class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="number" name="ticket_number" id="ticket_number" placeholder="5" required>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <p class="text-lg text-black dark:text-white">
                                Ticket $2
                            </p>
                            <div class="relative w-2/12">
                                <span class="absolute left-4.5 top-3.5">
                                    <i data-lucide="x" class="size-5"></i>
                                </span>
                                <input
                                    class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="number" name="ticket_number" id="ticket_number" placeholder="5" required>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <p class="text-lg text-black dark:text-white">
                                Ticket $5
                            </p>
                            <div class="relative w-2/12">
                                <span class="absolute left-4.5 top-3.5">
                                    <i data-lucide="x" class="size-5"></i>
                                </span>
                                <input
                                    class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="number" name="ticket_number" id="ticket_number" placeholder="5" required>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <p class="text-lg text-black dark:text-white">
                                Ticket $10
                            </p>
                            <div class="relative w-2/12">
                                <span class="absolute left-4.5 top-3.5">
                                    <i data-lucide="x" class="size-5"></i>
                                </span>
                                <input
                                    class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="number" name="ticket_number" id="ticket_number" placeholder="5" required>
                            </div>
                        </div>
                    </div>
                        
                    <!-- Table Start -->
                    <div
                        class="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-10"
                    >
                        <div class="flex flex-col">
                            <div
                            class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3"
                            >
                                <div class="p-2.5 xl:p-5">
                                    <h5 class="text-sm font-medium uppercase xsm:text-base">Ticket</h5>
                                </div>
                                <div class="p-2.5 xl:p-5">
                                    <h5 class="text-sm font-medium uppercase xsm:text-base">Quantité</h5>
                                </div>
                                <div class="p-2.5 xl:p-5">
                                    <h5 class="text-sm font-medium uppercase xsm:text-base">Prix</h5>
                                </div>
                            </div>

                            <div
                            class="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3"
                            >
                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">$1</p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">x2</p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-meta-3">$2</p>
                                </div>
                            </div>

                            <div
                            class="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3"
                            >
                                <div class="flex items-center p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">$1</p>
                                </div>

                                <div class="flex items-center p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">x2</p>
                                </div>

                                <div class="flex items-center p-2.5 xl:p-5">
                                    <p class="font-medium text-meta-3">$2</p>
                                </div>  
                            </div>

                            <div
                            class="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-3"
                            >
                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">$1</p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">x2</p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-meta-3">$2</p>
                                </div>
                            </div>

                            <div
                            class="grid grid-cols-3 sm:grid-cols-3"
                            >
                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white">Total</p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-black dark:text-white"></p>
                                </div>

                                <div class="p-2.5 xl:p-5">
                                    <p class="font-medium text-meta-3">$23</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Table End -->

                    <div class="mt-10 flex justify-center sm:justify-start">
                        <a href="{{ route('dashboard.tickets.pay1') }}" class="px-4 py-2 inline-block rounded-md bg-primary text-white">
                            Paiement Mobile
                        </a>
                        <a href="{{ route('dashboard.tickets.pay1') }}" class="px-4 py-2 ml-5 inline-block rounded-md bg-primary text-white">
                            Paiement par Carte
                        </a>
                    </div>
                </div>
			</div>
			<!-- Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
