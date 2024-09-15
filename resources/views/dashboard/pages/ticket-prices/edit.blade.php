@extends('dashboard.layout.base')

@php
	$title = 'Modifier un Ticket';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumbs="[['title' => 'Liste des tickets', 'route' => route('dashboard.ticket-prices')], ['title' => $title]]" />
			<!-- Breadcrumb End -->

			<!-- ====== Profil Creation Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<x-error-message-alert class="mb-4" />
					<div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
						<form action="#" class="lg:col-span-2 col-span-1">
							<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Informations ticket</h2>
							<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Nom">Nom</label>
									<div class="relative">
										<span class="absolute left-4.5 top-3.5">
											<i data-lucide="ticket" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="text" name="nom" id="Nom" placeholder="Ticket 1" value="Ticket 1" required>
									</div>
								</div>

								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="amount">Prix</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="banknote" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="integer" name="amount" id="amount" placeholder="105" value="105" required>
									</div>
								</div>
							</div>
							<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Devise</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="badge-dollar-sign" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pseudo" name="username" id="username" placeholder="Bonus" value="Bonus">
									</div>
								</div>

								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Promotion</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="percent" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pseudo" name="username" id="username" placeholder="OUI" value="OUI">
									</div>
								</div>
							</div>
							<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="country">Pays</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="flag" class="size-5"></i>
										</span>
										<select id="country" name="country" 
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary">
											<option value="" disabled selected>Select your country</option>
											@foreach ($countries as $country)
												<option value="{{ $country->dial_code }}">({{ $country->dial_code }}) {{ $country->name }}</option>
											@endforeach
										</select>
									</div>
								</div>

								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Pays</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="flag" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pseudo" name="username" id="username" placeholder="Cameroun" value="Cameroun">
									</div>
								</div>
							</div>
							
							<div class="flex justify-end gap-4.5">
								<a href="{{ route('dashboard.ticket-prices') }}"
									class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
									type="">
									Annuler
								</a>
								<a href="{{ route('dashboard.ticket-prices') }}"
									class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
									type="">
									Enregistrer
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
			<!-- ====== Profil Creation End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
