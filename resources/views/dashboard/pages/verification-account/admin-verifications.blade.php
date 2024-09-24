@php
	$title = __('verification-account.title-admin');
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
    <div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mb-4" />
            <h3 class="text-title-lg">Liste des comptes à vérifier</h3>
            <x-tables.verification-account-requests-table />
        </div>
    </div>
</x-dashboard.layout>