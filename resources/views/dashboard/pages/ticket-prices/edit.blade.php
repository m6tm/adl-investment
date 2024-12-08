@php
	$title = 'Modifier un Ticket';
	$breadcrumbs = [['title' => 'Liste des tickets', 'route' => route('dashboard.ticket-prices')], ['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

		<!-- ====== Profil Creation Start -->
		<div class="flex flex-col gap-10 mt-10">
			<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
				<x-error-message-alert class="mb-4" />
				<div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
					<form action="{{ route('dashboard.ticket-prices.update', $ticket->id) }}" method="POST"
						class="lg:col-span-2 col-span-1">
						@csrf
						<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Informations ticket</h2>

						<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
							<div class="w-full sm:w-1/2">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="libelle">Libelle</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="ticket" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="text" readonly disabled id="libelle" placeholder="Ticket 1" value="{{ $ticket->libelle }}"
										required>
								</div>
							</div>
							<div class="w-full sm:w-1/2">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="prix">Prix</label>
								<div class="relative">
									<span class="absolute left-4.5 top-4">
										<i data-lucide="banknote" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="number" name="prix" id="prix" placeholder="105" value="{{ $ticket->prix }}" required>
								</div>
							</div>
						</div>

						<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
							<div class="w-full sm:w-1/2">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="devise">Devise</label>
								<div class="relative">
									<span class="absolute left-4.5 top-4">
										<i data-lucide="badge-dollar-sign" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="text" name="devise" id="devise" placeholder="USD" list="devises" value="{{ $ticket->devise }}">
									<datalist id="devises">
										@foreach ($devises as $devise)
											<option value="{{ $devise['code'] }}">{{ $devise['name'] }}</option>
										@endforeach
									</datalist>
								</div>
							</div>

							<div class="w-full sm:w-1/2">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="is_promotion">En
									Promotion?</label>
								<div class="relative">
									<span class="absolute left-4.5 top-4">
										<i data-lucide="percent" class="size-5"></i>
									</span>
									<select id="is_promotion" name="is_promotion"
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary">
										<option value="1" {{ $ticket->is_promotion ? 'selected' : '' }}>OUI</option>
										<option value="0" {{ !$ticket->is_promotion ? 'selected' : '' }}>NON</option>
									</select>
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
									<select id="country" name="country_id"
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary">
										@foreach ($countries as $country)
											<option value="{{ $country->id }}" {{ $ticket->country_id == $country->id ? 'selected' : '' }}>
												({{ $country->dial_code }})
												{{ $country->name }}
											</option>
										@endforeach
									</select>
								</div>
							</div>
						</div>

						<div class="flex justify-end gap-4.5">
							<a href="{{ route('dashboard.ticket-prices') }}"
								class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
								Annuler
							</a>
							<button class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
								type="submit">
								Enregistrer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<!-- ====== Profil Creation End -->
	</div>
</x-dashboard.layout>
