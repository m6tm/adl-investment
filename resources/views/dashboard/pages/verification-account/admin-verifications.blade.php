@php
	$title = __('verification-account.title-admin');
    $breadcrumbs = [
        ['title' => $title],
    ];
@endphp

<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
</x-dashboard.layout>