@php
	$title = __('roles.title');
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
    <div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mx-5 mb-4" />
			<x-tables.role-table :roles="$roles" />
        </div>
    </div>
</x-dashboard.layout>
