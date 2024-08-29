@extends('dashboard.layout.base')

@php
	$title = 'Create Permission';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumbs="[['title' => 'Permissions', 'route' => route('dashboard.permissions')], ['title' => $title]]" />
			<!-- Breadcrumb End -->

			<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
				<!-- ====== Data Table One Start -->
				<div class="rounded-sm border p-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<h3 class="text-title-md font-medium">Formulaire de création de permissions</h3>
					<x-error-message-alert />

					<form id="create-permissions-form" class="mt-4" action="{{ route('dashboard.permissions.create.store') }}"
						method="POST">
						@csrf
						<div data-repeater-list="permissions" class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div data-repeater-item>
								<div class="grid grid-cols-1 gap-4">
									<div class="grid grid-cols-1 gap-0">
										<label for="">Code de la permission (exemple: user.create.permission)</label>
										<input type="text"
											class="rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
											name="code" pattern="^[a-z]+(\.[a-z]+)*$" required placeholder="Permission code" />
									</div>
									<div class="grid grid-cols-1 gap-0">
										<label for="">Description</label>
										<textarea
										 class="rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
										 name="description" required minlength="5" placeholder="Permission description" rows="4"></textarea>
									</div>
									<button data-repeater-delete type="button"
										class="inline-flex items-center justify-center rounded-md bg-danger px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
										<span data-lucide="x"></span>
										Retirer
									</button>
								</div>
							</div>
						</div>
						<div class="flex gap-4">
							<button data-repeater-create type="button"
								class="inline-flex items-center justify-center rounded-md bg-neutral-400 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-4">
								<span data-lucide="plus"></span>
								Ajouter une permission
							</button>
							<button type="submit"
								class="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-4">
								Enregistrer
							</button>
						</div>
					</form>
				</div>
				<!-- ====== Data Table One End -->
			</div>
		</div>
	</main>
@endsection
