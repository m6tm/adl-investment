@extends('dashboard.layout.base')

@php
	$title = 'Liste des utilisateurs';
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

			<!-- ====== Table Section Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<a href="{{ route('dashboard.user.create') }}" class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white">
						Créer un utilisateur
					</a>
					<!-- ====== Table Four Start -->
					<x-ui.table-primary :headers="['Name', 'Title', 'Email', 'Role']" :rows="[
						['Musharof Chowdhury', 'Multidisciplinary Web Entrepreneur', 'musharof@example.com', 'Owner'],
						['John Doe', 'Software Developer', 'john.doe@example.com', 'Admin'],
						['Jane Smith', 'UX Designer', 'jane.smith@example.com', 'User'],
						['Mike Johnson', 'Project Manager', 'mike.johnson@example.com', 'Manager'],
						['Emily Brown', 'Data Analyst', 'emily.brown@example.com', 'User']
					]" />
					<!-- ====== Table Four End -->
				</div>
			</div>
			<!-- ====== Table Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
