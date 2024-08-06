@extends('dashboard.layout.base')

@section('content')
	<!-- ===== Main Content Start ===== -->
	<main>
		<div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
			<!-- Breadcrumb Start -->
			<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-title-md2 font-bold text-black dark:text-white">
					Liste des utilisateurs
				</h2>

				<nav>
					<ol class="flex items-center gap-2">
						<li>
							<a class="font-medium" href="index.html">Dashboard /</a>
						</li>
						<li class="font-medium text-primary">Liste des utilisateurs</li>
					</ol>
				</nav>
			</div>
			<!-- Breadcrumb End -->

			<!-- ====== Table Section Start -->
			<div class="flex flex-col gap-10 mt-10">
				<!-- ====== Table Four Start -->
                <x-ui.table-primary :headers="['Name', 'Title', 'Email', 'Role']" :rows="[['Musharof Chowdhury', 'Multidisciplinary Web Entrepreneur', 'musharof@example.com', 'Owner']]" />
				<!-- ====== Table Four End -->
			</div>
			<!-- ====== Table Section End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
