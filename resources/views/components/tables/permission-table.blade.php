@php
	$key = 1;
@endphp
@foreach ($permissions as $permission)
	<dialog id="permission_to_user_modal_{{ $key }}" class="modal">
		<div class="modal-box w-11/12 max-w-5xl">
			<div class="modal-action flex-col">
				<x-tables.permission-to-user-table :permission="$permission" />
				<form method="dialog" class="w-full">
					<div class="w-full flex justify-end mt-5">
						<button class="btn btn-error btn-sm text-white">{{ __('permissions.permissions_list.close') }}</button>
					</div>
				</form>
			</div>
		</div>
	</dialog>
	<dialog id="permission_to_role_modal_{{ $key }}" class="modal">
		<div class="modal-box w-11/12 max-w-5xl">
			<div class="modal-action flex-col">
				<x-tables.permission-to-role-table :permission="$permission" />
				<form method="dialog" class="w-full">
					<div class="w-full flex justify-end mt-5">
						<button class="btn btn-error btn-sm text-white">{{ __('permissions.permissions_list.close') }}</button>
					</div>
				</form>
			</div>
		</div>
	</dialog>
    @php
        $key += 1;
    @endphp
@endforeach
<div class="data-table-common data-table max-w-full overflow-x-auto">
	<table class="table w-full table-auto" id="permissionTable">
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
						<p class="text-[16px]">{{ __('permissions.permissions_list.permission_code') }}</p>
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
						<p class="text-[16px]">{{ __('permissions.permissions_list.description') }}</p>
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
						<p class="text-[16px]">{{ __('permissions.permissions_list.actions') }}</p>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			@php
				$key = 1;
			@endphp
			@foreach ($permissions as $permission)
				<tr class="h-[20px] odd:bg-white bg-slate-100 duration-300 hover:bg-slate-100 odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800">
					<td class="py-1 w-8">#{{ $key }}</td>
					<td>{{ $permission->name }}</td>
					<td>{{ $permission->description }}</td>
					<td class="flex justify-around space-x-3 w-35">
						<button class="text-primary tooltip"
							onclick="document.getElementById('permission_to_user_modal_{{ $key }}').showModal()"
							data-tip="{{ __('permissions.permissions_list.associate_user') }}">
							<span class="size-5" data-lucide="user-round-pen"></span>
						</button>
						<button class="text-primary tooltip"
                            onclick="document.getElementById('permission_to_role_modal_{{ $key }}').showModal()"
                            data-tip="{{ __('permissions.permissions_list.associate_role') }}">
							<span class="size-5" data-lucide="key-square"></span>
						</button>
					</td>
				</tr>
				@php
					$key += 1;
				@endphp
			@endforeach
		</tbody>
	</table>
</div>
