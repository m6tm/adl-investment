<div class="data-table-common data-table max-w-full overflow-x-auto">
	<table class="table w-full table-auto" id="GainsTable">
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
						<p class="text-[16px]">Avatar</p>
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
						<p class="text-[16px]">Pseudo</p>
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
						<p class="text-[16px]">Montant</p>
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
				
			</tr>
		</thead>
		<tbody>
			@php
				$key = 1;
			@endphp
			@foreach ($gains as $gain)
				<tr class="h-[20px] odd:bg-white bg-slate-100 duration-300 hover:bg-slate-100 odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800">
					<td class="py-1 w-8" style="vertical-align: middle">#{{ $key }}</td>
                    <td class="flex justify-center space-x-3">
                        <span class="">
                            <i data-lucide="circle-user" class="size-10"></i>
                        </span>
					</td>
					<td style="vertical-align: middle">{{ $gain->user->pseudo }}</td>
					<td class="capitalize" style="vertical-align: middle">{{ $gain->montant }}</td>
				</tr>
				@php
					$key += 1;
				@endphp
			@endforeach
		</tbody>
	</table>
</div>
