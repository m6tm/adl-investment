@extends('dashboard.layout.base')

@php
	$title = 'Notifications';
@endphp
@section('title')
	{{ $title }}
@endsection

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<x--breadcrumb :breadcrumbs="[['title' => $title]]" />
			<!-- Breadcrumb End -->

			<!-- ====== Profile Creation Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<div class="grid lg:grid-cols-3 gap-5 h-[500px]" id="tabs-container">
                        <div class="p-3  grid grid-cols-1 gap-2 overflow-y-auto h-full">
                            <div data-type="tab" class="h-[110px] hover:bg-slate-500 activate duration-300 p-3 rounded-lg cursor-pointer">
                                <div class="flex justify-between items-center">
									<strong>Titre notification 1</strong>
									<div class="flex space-x-2">
										<span class="size-3 bg-slate-400 rounded-full block"></span>
										<span class="size-3 bg-rose-400 rounded-full block"></span>
									</div>
								</div>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>
                            
                            <div data-type="tab" class="h-[110px] hover:bg-slate-500 duration-300 p-3 rounded-lg cursor-pointer">
                                <div class="flex justify-between items-center">
									<strong>Titre notification 2</strong>
									<div class="flex space-x-2">
										<span class="size-3 bg-slate-400 rounded-full block"></span>
										<span class="size-3 bg-green-400 rounded-full block"></span>
									</div>
								</div>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div data-type="tab" class="h-[110px] hover:bg-slate-500 duration-300 p-3 rounded-lg cursor-pointer">
                                <div class="flex justify-between items-center">
									<strong>Titre notification 3</strong>
									<div class="flex space-x-2">
										<span class="size-3 bg-slate-400 rounded-full block"></span>
										<span class="size-3 bg-rose-400 rounded-full block"></span>
									</div>
								</div>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div data-type="tab" class="h-[110px] hover:bg-slate-500 duration-300 p-3 rounded-lg cursor-pointer">
                                <div class="flex justify-between items-center">
									<strong>Titre notification 4</strong>
									<div class="flex space-x-2">
										<span class="size-3 bg-slate-400 rounded-full block"></span>
										<span class="size-3 bg-rose-400 rounded-full block"></span>
									</div>
								</div>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div data-type="tab" class="h-[110px] hover:bg-slate-500 duration-300 p-3 rounded-lg cursor-pointer">
                                <div class="flex justify-between items-center">
									<strong>Titre notification 5</strong>
									<div class="flex space-x-2">
										<span class="size-3 bg-slate-400 rounded-full block"></span>
										<span class="size-3 bg-yellow-400 rounded-full block"></span>
									</div>
								</div>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>
                        </div>
                        <div class="h-full lg:col-span-2 p-4">
							<div data-type="tab-content" class="">
								<h3 class="text-title-md flex justify-between pe-5"><span>Detailles de la notification</span> <span class="text-sm text-slate-500">Il y a 30min</span></h3>
								<h3 class="text-title-sm my-3 font-bold">Titre notifcation 1</h3>
								<p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
								<button class="mt-3 bg-blue-300 hover:bg-blue-400 duration-300 px-3 py-1 rounded-md text-white me-3">Ouvrir</button>
								<button class="mt-3 hover:text-blue-500 duration-300">Marquer comme non lu</button>
							</div>
							
							<div data-type="tab-content" class="hidden">
								<h3 class="text-title-md flex justify-between pe-5"><span>Detailles de la notification</span> <span class="text-sm text-slate-500">Il y a 30min</span></h3>
								<h3 class="text-title-sm my-3 font-bold">Titre notifcation 2</h3>
								<p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
								<button class="mt-3 bg-blue-300 hover:bg-blue-400 duration-300 px-3 py-1 rounded-md text-white me-3">Ouvrir</button>
								<button class="mt-3 hover:text-blue-500 duration-300">Marquer comme non lu</button>
							</div>
							
							<div data-type="tab-content" class="hidden">
								<h3 class="text-title-md flex justify-between pe-5"><span>Detailles de la notification</span> <span class="text-sm text-slate-500">Il y a 30min</span></h3>
								<h3 class="text-title-sm my-3 font-bold">Titre notifcation 3</h3>
								<p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
								<button class="mt-3 bg-blue-300 hover:bg-blue-400 duration-300 px-3 py-1 rounded-md text-white me-3">Ouvrir</button>
								<button class="mt-3 hover:text-blue-500 duration-300">Marquer comme non lu</button>
							</div>
							
							<div data-type="tab-content" class="hidden">
								<h3 class="text-title-md flex justify-between pe-5"><span>Detailles de la notification</span> <span class="text-sm text-slate-500">Il y a 30min</span></h3>
								<h3 class="text-title-sm my-3 font-bold">Titre notifcation 4</h3>
								<p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
								<button class="mt-3 bg-blue-300 hover:bg-blue-400 duration-300 px-3 py-1 rounded-md text-white me-3">Ouvrir</button>
								<button class="mt-3 hover:text-blue-500 duration-300">Marquer comme non lu</button>
							</div>
							
							<div data-type="tab-content" class="hidden">
								<h3 class="text-title-md flex justify-between pe-5"><span>Detailles de la notification</span> <span class="text-sm text-slate-500">Il y a 30min</span></h3>
								<h3 class="text-title-sm my-3 font-bold">Titre notifcation 5</h3>
								<p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
								<button class="mt-3 bg-blue-300 hover:bg-blue-400 duration-300 px-3 py-1 rounded-md text-white me-3">Ouvrir</button>
								<button class="mt-3 hover:text-blue-500 duration-300">Marquer comme non lu</button>
							</div>
						</div>
                    </div>
				</div>
			</div>
			<!-- ====== Profile Creation End  -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
