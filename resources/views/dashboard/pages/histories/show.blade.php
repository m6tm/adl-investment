@extends('dashboard.layout.base')

@php
	$title = 'Détails de Tirage';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumb="[['title' => 'Historique de Tirage', 'route' => route('dashboard.histories')], ['title' => $title]]" />
			<!-- Breadcrumb End -->

			<!-- ====== Profil Creation Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<x-error-message-alert class="mb-4" />
					<div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
						<form action="#" class="lg:col-span-2 col-span-1">
							<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Nom">Date de tirage</label>
									<div class="relative">
										<span class="absolute left-4.5 top-3.5">
											<i data-lucide="calendar-fold" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="text" name="nom" id="Nom" placeholder="2024-09-15" value="2024-09-15" required disabled>
									</div>
								</div>

								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="amount">Heure de tirage</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="clock" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="integer" name="amount" id="amount" placeholder="09:45:28" value="09:45:28" required disabled>
									</div>
								</div>
							</div>
							<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Type</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="badge-dollar-sign" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pseudo" name="username" id="username" placeholder="Bonus" value="Bonus" disabled>
									</div>
								</div>

								<div class="w-full sm:w-1/2">
									<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Statut</label>
									<div class="relative">
										<span class="absolute left-4.5 top-4">
											<i data-lucide="percent" class="size-5"></i>
										</span>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pseudo" name="username" id="username" placeholder="Terminé" value="Terminé" disabled>
									</div>
								</div>
							</div>
						</form>
					</div>

					<div class="mt-10">
						<h2 class="text-black dark:text-white text-title-md mb-4">Vidéo du tirage</h2>
						<video width="750" height="240" controls>
							<source src="{{ asset('assets/img/Nobody -「AMV」- Anime MV.mp4') }}" type="video/mp4">
							Your browser does not support the video tag.
						</video>
					</div>

					<div class="mt-10">
						<h2 class="text-black dark:text-white text-title-md mb-4">Liste des gagnants</h2>
						<x-tables.gains-table :gains="$gains" />	
					</div>
				</div>
			</div>
			<!-- ====== Profil Creation End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
