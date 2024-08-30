@php
	$title = 'Liste des utilisateurs';
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
    <div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mb-4" />
			@if (auth()->user()->can('create.user'))
				<a href="{{ route('dashboard.user.create') }}" class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white">
					Créer un utilisateur
				</a>
			@endif
			<!-- ====== Table Four Start -->
			<x-tables.users-table :users="$users" />
			<!-- ====== Table Four End -->
        </div>
    </div>
</x-dashboard.layout>
