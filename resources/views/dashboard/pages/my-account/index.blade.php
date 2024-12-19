@php
	$title = __('sidebar.balance');
	$breadcrumbs = [['title' => __('sidebar.balance'), 'route' => route('dashboard.user.list')]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<x-error-message-alert class="mx-5 mb-3" />
	<div class="grid grid-cols-2 gap-3">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Compte Wallet
		</div>
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Compte d'investissement
		</div>
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Historique des retraits
		</div>
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Historique des gains
		</div>
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Historique des achats de ticket
		</div>
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			Historique des tirages
		</div>
	</div>
</x-dashboard.layout>
