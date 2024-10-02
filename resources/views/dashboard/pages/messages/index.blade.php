@php
	$title = __('messages.title');
	$breadcrumbs = [['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-190px)] p-5">
		<x-error-message-alert class="mb-4" />
		<div class="size-full xl:flex" id="message-component" data-discussions="{{ json_encode($discussions) }}" data-usr="{{ $user->id }}"></div>
	</div>
</x-dashboard.layout>
