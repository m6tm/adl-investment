<div class="data-table-common data-table max-w-full overflow-x-auto">
	<table class="table w-full table-auto" id="HistoriesTable">
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
						<p class="text-[16px]">Date de tirage</p>
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
						<p class="text-[16px]">Heure de tirage</p>
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
						<p class="text-[16px]">Statut</p>
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
						<p class="text-[16px]">Type</p>
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
			@foreach ($histories as $history)
				<tr class="h-[20px] odd:bg-white bg-slate-100 duration-300 hover:bg-slate-100 odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800">
					<td class="py-1 w-8">#{{ $key }}</td>
					<td>{{ $history->date_tirage }}</td>
					<td class="capitalize">{{ $history->heure_tirage }}</td>
					<td class="uppercase">{{ $history->statut }}</td>
					<td class="capitalize">{{ $history->type }}</td>
					<td class="flex justify-center space-x-3">
                        <!-- @if (auth()->user()->can('edit.user')) -->
                            <a href="{{ route('dashboard.histories.show') }}" class="float-right text-primary">
                                <span class="">
                                    <i data-lucide="scan-eye" class="size-5"></i>
                                </span>
                            </a>
                        <!-- @endif -->
					</td>
				</tr>
				@php
					$key += 1;
				@endphp
			@endforeach
		</tbody>
	</table>
</div>
