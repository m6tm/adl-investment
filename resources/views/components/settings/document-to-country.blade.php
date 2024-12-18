<div
	class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5 md:col-span-2">
	<h4>{{ __('settings.pays_to_document.title') }}</h4>
	@php
		$key = 1;
	@endphp
	@foreach ($countries as $country)
		@if (auth()->user()->can('assign.document.to.country'))
			<dialog id="document_to_country_modal_{{ $key }}" class="modal">
				<div class="modal-box w-11/12 max-w-2xl">
					<div class="modal-action flex-col">
						<h3 class="mb-3 text-base">{{ __('settings.pays_to_document.assign') }}: <strong>{{ $country->name }}</strong></h3>
						<form action="{{ route('dashboard.settings.document-assigment') }}" method="POST">
							@csrf
							<input type="hidden" name="country_id" value="{{ $country->id }}">
							<div class="grid grid-cols-2 gap-4">
								@foreach ($document_autorises as $document_autorise)
									<span>
										{{ __($document_autorise->libelle) }}
									</span>
									<div class="flex items-end">
										<input
											id="default-checkbox"
											type="checkbox"
											name="documents[]"
											value="{{ $document_autorise->id }}"
											{{ $country->documents_autorises->contains('document_autorise_id', $document_autorise->id) ? 'checked' : '' }}
											class="w-4 h-4 text-blue-600 bg-slate-100 border-gray-300 cursor-pointer rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-700 dark:border-gray-600">
									</div>
								@endforeach
							</div>
							<div>
								<button
									type="submit"
									class="inline-flex items-center justify-center rounded-md bg-primary mt-5 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
									{{ __('roles.role-to-user.apply_changes') }}
								</button>
							</div>
						</form>
						<form method="dialog" class="w-full">
							<div class="w-full flex justify-end mt-5">
								<button class="btn btn-error btn-sm text-white">{{ __('permissions.permissions_list.close') }}</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		@endif
		@php
			$key += 1;
		@endphp
	@endforeach
	<form action="" method="post" class="">
		@csrf
		<table class="table w-full table-auto" id="documentToCountryTable">
			<thead>
				<tr>
					<th>
						<div class="flex items-center gap-1.5">
							<p class="text-[16px]">ID</p>
							<div class="inline-flex flex-col space-y-[2px]">
								<span class="inline-block">
									<svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M5 0L0 5H10L5 0Z" fill="" />
									</svg>
								</span>
								<span class="inline-block">
									<svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
									</svg>
								</span>
							</div>
						</div>
					</th>
					<th>
						<div class="flex items-center gap-1.5">
							<p class="text-[16px]">{{ __('settings.pays_to_document.country') }}</p>
							<div class="inline-flex flex-col space-y-[2px]">
								<span class="inline-block">
									<svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M5 0L0 5H10L5 0Z" fill="" />
									</svg>
								</span>
								<span class="inline-block">
									<svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
									</svg>
								</span>
							</div>
						</div>
					</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				@php
					$key = 1;
				@endphp
				@foreach ($countries as $country)
					<tr id="document_to_country_{{ $key - 1 }}"
						class="h-[20px] odd:bg-white bg-slate-100 duration-300 hover:bg-slate-100 odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800">
						<td class="bg-transparent border-l-0 py-1 w-8">#{{ $key }}</td>
						<td class="bg-transparent">{{ $country->name }}</td>
						<td class="bg-transparent flex space-x-4">
							@if (auth()->user()->can('assign.document.to.country'))
								<button
									class="text-primary tooltip tooltip-left"
									onclick="document.getElementById('document_to_country_modal_{{ $key }}').showModal()"
									data-tip="{{ __('settings.pays_to_document.assign') }}"
									type="button">
									<span class="size-5" data-lucide="user-round-pen"></span>
								</button>
							@endif
                            @if (auth()->user()->can('toggle.countries'))
                                <a href="{{ route('dashboard.settings.remove-country', ['country_id' => $country->id]) }}"
                                    class="rounded-full bg-danger text-white size-6 flex justify-center items-center" type="submit">
                                    <span data-lucide="x" class="size-4"></span>
                                </a>
                            @endif
                        </td>
					</tr>
					@php
						$key += 1;
					@endphp
				@endforeach
			</tbody>
		</table>
	</form>
</div>
