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
                        class="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-whiter rounded-full place-items-center">
                        1
                        </div>
                        <div
                        class="relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-primary rounded-full place-items-center">
                        2
                        </div>
                        <div
                        class="relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-whiter rounded-full place-items-center">
                        3
                        </div>
                    </div>

                    <!-- STEP 1 -->
                    <!-- <div class="flex justify-around mt-20">
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
                    </div> -->

                    <!-- STEP 2 -->
                    <div class="grid grid-rows-4 place-content-center mt-20">
                        <div class="mb-5.5">
                            <div class="w-96">
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="name">Nom</label>
                                <div class="relative">
                                    <span class="absolute left-4.5 top-3.5">
                                        <i data-lucide="user" class="size-5"></i>
                                    </span>
                                    <input
                                        class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text" name="name" id="name" value="{{ $user->name }}" placeholder="Devid Jhon" required disabled>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5.5">
                            <div class="w-96">
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="first_name">Prénom</label>
                                <div class="relative">
                                    <span class="absolute left-4.5 top-3.5">
                                        <i data-lucide="user" class="size-5"></i>
                                    </span>
                                    <input
                                        class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text" name="first_name" id="first_name" value="{{ $user->first_name }}" placeholder="Rene Mode" required disabled>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5.5">
                            <div class="w-96">
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="phone">Numéro de
                                    téléphone</label>
                                <div class="relative">
                                    <span class="absolute left-4.5 top-3.5">
                                        <i data-lucide="phone" class="size-5"></i>
                                    </span>
                                    <input
                                        class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="tel" name="phone" id="phone" value="{{ $user->address->phone }}" placeholder="+XXX XXXX XXXX" required disabled>
                                </div>
                            </div>
                        </div>
                        <div class="mb-5.5">
                            <div class="w-96">
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="amount">Montant</label>
                                <div class="relative">
                                    <span class="absolute left-4.5 top-4">
                                        <i data-lucide="dollar-sign" class="size-5"></i>
                                    </span>
                                    <input
                                        class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="integer" name="amount" id="amount" placeholder="105" required disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 3 -->
                    <!-- <div class="grid justify-items-center mt-20">
                        <div class="rounded-full ">
                            <img src="{{ asset('assets/img/team/team-3.jpg') }}" class="rounded-full h-48 h-48" alt="User">
                        </div>

                        <div class="text-center mt-5">
                            <p
                                class="mb-4 text-title-sm2 font-medium leading-[30px] text-black dark:text-white md:text-2xl"
                            >
                                Status de la transaction
                            </p>
                            <p class="font-medium">
                                Succès
                            </p>
                        </div>
                    </div> -->

                    <div class="flex justify-between mt-20">
                        <a href="{{ route('dashboard.tickets.pay1') }}" class="px-4 py-2 inline-block rounded-md bg-primary text-white">
                            Modifier
                        </a>
                        <a href="{{ route('dashboard.tickets.pay3') }}" class="px-4 py-2 ml-5 inline-block rounded-md bg-primary text-white">
                            Next
                        </a>
                        <!-- <a href="{{ route('dashboard.tickets') }}" class="px-4 py-2 ml-5 inline-block rounded-md bg-primary text-white">
                            Terminer
                        </a> -->
                    </div>
                </div>

                </div>
			</div>
			<!-- Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
