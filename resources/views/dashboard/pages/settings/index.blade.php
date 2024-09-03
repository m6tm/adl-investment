@php
    $title = __('settings.title');
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 md:gap-7 2xl:gap-10">
        <div class="col-span-3">
			<x-error-message-alert class="mx-5 mb-4" />
        </div>
        <x-settings.authorized-countries />
        <x-settings.document-to-country />
    </div>
</x-dashboard.layout>