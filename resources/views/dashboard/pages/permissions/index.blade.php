@extends('dashboard.layout.base')

@php
	$title = 'Permissions';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-title-md2 font-bold text-black dark:text-white">
					{{ $title }}
				</h2>

				<nav>
					<ol class="flex items-center gap-2">
						<li>
							<a class="font-medium" href="index.html">Dashboard /</a>
						</li>
						<li class="font-medium text-primary">{{ $title }}</li>
					</ol>
				</nav>
			</div>
			<!-- Breadcrumb End -->

			<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
				<!-- ====== Data Table One Start -->
				<div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div class="data-table-common data-table max-w-full overflow-x-auto">
						<table class="table w-full table-auto" id="permissionTable">
							<thead>
								<tr>
									<th>
										<div class="flex items-center gap-1.5">
											<p>ID</p>
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
											<p>Permission name</p>
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
											<p>Description</p>
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
									<th data-type="date" data-format="YYYY/DD/MM">
										<div class="flex items-center gap-1.5">
											<p>Created at</p>
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
											<p>Actions</p>
										</div>
									</th>
								</tr>
							</thead>
							<tbody>
								<tr class="h-[20px]">
									<td class="py-1">#1</td>
									<td>Andrio Maksim</td>
									<td>maksim45@gmail.com</td>
									<td>25 Nov, 1989</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
								<tr class="h-[20px]">
									<td class="py-1">#2</td>
									<td>Brielle Kuphal</td>
									<td>Brielle45@gmail.com</td>
									<td>25 Nov, 1977</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
								<tr class="h-[20px]">
									<td class="py-1">#3</td>
									<td>Barney Murray</td>
									<td>Barney@gmail.com</td>
									<td>25 Nov, 1966</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
								<tr class="h-[20px]">
									<td class="py-1">#4</td>
									<td>Ressie Ruecker</td>
									<td>Ressie@gmail.com</td>
									<td>25 Nov, 1955</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
								<tr class="h-[20px]">
									<td class="py-1">#5</td>
									<td>Teresa Mertz</td>
									<td>Teresa@gmail.com</td>
									<td>25 Nov, 1979</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
								<tr class="h-[20px]">
									<td class="py-1">#6</td>
									<td>Chelsey Hackett</td>
									<td>Chelsey@gmail.com</td>
									<td>25 Nov, 1969</td>
									<td class="text-center space-x-3">
										<button class="text-primary" title="Associer à un utilisateur">
											<span class="size-5" data-lucide="user-round-pen"></span>
										</button>
										<button class="text-primary" title="Associer à un rôle">
											<span class="size-5" data-lucide="key-square"></span>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!-- ====== Data Table One End -->
			</div>
		</div>
	</main>
@endsection
