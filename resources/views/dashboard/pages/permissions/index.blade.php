@php
	$title = 'List Permissions';
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
	<div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
		<x-error-message-alert class="mx-5" />
		<x-tables.permission-table :permissions="$permissions" />
	</div>
</x-dashboard.layout>
