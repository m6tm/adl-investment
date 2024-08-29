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
						<button class="btn btn-error btn-sm text-white">Fermer</button>
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
						<button class="btn btn-error btn-sm text-white">Fermer</button>
					</div>
				</form>
			</div>
		</div>
	</dialog>
	<dialog id="edit_permission_modal_{{ $key }}" class="modal">
		<div class="modal-box w-11/12 max-w-5xl">
			<div class="modal-action flex-col">
				<x-forms.edit-permission :permission="$permission" />
				<form method="dialog" class="w-full">
					<div class="w-full flex justify-end mt-5">
						<button
							type="button"
							onclick="document.getElementById('edit_permission_modal_{{ $key }}').close()"
							class="inline-flex items-center justify-center rounded-md bg-danger mt-4 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
							Annuler
						</button>
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
						<p class="text-[16px]">Permission code</p>
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
						<p class="text-[16px]">Description</p>
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
						<p class="text-[16px]">Actions</p>
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
							data-tip="Associer à un utilisateur">
							<span class="size-5" data-lucide="user-round-pen"></span>
						</button>
						<button class="text-primary tooltip"
                            onclick="document.getElementById('permission_to_role_modal_{{ $key }}').showModal()"
                            data-tip="Associer à un rôle">
							<span class="size-5" data-lucide="key-square"></span>
						</button>
						<button class="text-primary tooltip tooltip-left"
                            onclick="document.getElementById('edit_permission_modal_{{ $key }}').showModal()"
                            data-tip="Modifier la permission">
							<span class="size-5" data-lucide="pencil"></span>
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
