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

			<!-- ====== Profile Creation Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<div class="grid grid-cols-3 gap-5 h-[500px]">
                        <div class="p-3 bg-slate-50 grid grid-cols-1 gap-2 overflow-y-auto h-full">
                            <div class="h-[110px] hover:bg-slate-100 duration-300 p-3 rounded-lg cursor-pointer">
                                <strong class="">Titre notification</strong>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>
                            
                            <div class="h-[110px] hover:bg-slate-100 duration-300 p-3 rounded-lg cursor-pointer">
                                <strong class="">Titre notification</strong>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div class="h-[110px] hover:bg-slate-100 duration-300 p-3 rounded-lg cursor-pointer">
                                <strong class="">Titre notification</strong>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div class="h-[110px] hover:bg-slate-100 duration-300 p-3 rounded-lg cursor-pointer">
                                <strong class="">Titre notification</strong>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>

                            <div class="h-[110px] hover:bg-slate-100 duration-300 p-3 rounded-lg cursor-pointer">
                                <strong class="">Titre notification</strong>
                                <p>On a ici une petite description de la notification ici pour savoir ce qui s'est passé dans le système.</p>
                                <small class="text-slate-400 block text-right">Il y a 30min</small>
                            </div>
                        </div>
                        <div class="h-full col-span-2"></div>
                    </div>
				</div>
			</div>
			<!-- ====== Profile Creation End  -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
