@php
	$title = 'Liste des tickets';
	$breadcrumb = [['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumb">
	<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mb-4" />
			@if (auth()->user()->can('create.user'))
				<a href="{{ route('dashboard.ticket-prices.create') }}"
					class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white">
					Créer un ticket
				</a>
			@endif
			<!-- ====== Table Four Start -->
			<x-tables.ticket-prices-table :prices="$prices" />
			<!-- ====== Table Four End -->
		</div>
	</div>
</x-dashboard.layout>
