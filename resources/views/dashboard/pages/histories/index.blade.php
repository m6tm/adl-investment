@php
	$title = 'Historique de Tirage';
	$breadcrumb = [['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumb">
	<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mb-4" />

			<!-- ====== Table Four Start -->
			<x-tables.draw-history-table :histories="$histories" />
			<!-- ====== Table Four End -->
		</div>
	</div>
</x-dashboard.layout>
