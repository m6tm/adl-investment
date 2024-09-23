@php
	$title = __('messages.title');
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
		<x-error-message-alert class="mb-4" />
		<div class="grid lg:grid-cols-3 gap-5 min-h-[500px]" id="chat-message">
		</div>
	</div>
</x-dashboard.layout>
