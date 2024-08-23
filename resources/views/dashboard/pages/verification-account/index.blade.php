@extends('dashboard.layout.base')

@php
	$title = 'Vérification de compte';
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

			<!-- ====== Account verification Start -->
			<div class="flex flex-col gap-10 mt-10">
				<div class="bg-white dark:bg-meta-4 dark:bg-none px-5 pt-6 pb-8 shadow-default dark:shadow-none rounded-[10px] p-5">
					<form action="#" id="verification-account-form" autocomplete="off" novalidate="novalidate" class="grid grid-cols-3 gap-5">
						{{-- Choisir une photo de profile Début --}}
						<div class="flex flex-col space-y-5" id="verification-account-tabs">
							<x-account-verification-stepper document="Informations utilisateur" />
							<x-account-verification-stepper document="Selfie photo" />
							<x-account-verification-stepper document="Carte national d'identité" />
							<x-account-verification-stepper document="Preuve de résidence" />
							<x-account-verification-stepper document="Passport" />
							<x-account-verification-stepper document="Permis de conduire" />
						</div>
						{{-- Choisir une photo de profile Fin --}}
						<div class="col-span-2" id="account-verification-steps" data-current-step="1">
							<div class="duration-300 ease-in-out" data-step="1">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Informations utilisateur</h2>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Nom">Nom</label>
										<div class="relative">
											<span class="absolute left-4.5 top-3.5">
												<i data-lucide="user" class="size-5"></i>
											</span>
											<input
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="text" name="nom" id="nom" placeholder="Devid Jhon" value="Maboa" required>
										</div>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Prenom">Prénom</label>
										<div class="relative">
											<span class="absolute left-4.5 top-3.5">
												<i data-lucide="user" class="size-5"></i>
											</span>
											<input
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="text" name="prenom" id="Prenom" placeholder="Rene Mode" required>
										</div>
									</div>
								</div>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="email">Adresse Mail</label>
										<div class="relative">
											<span class="absolute left-4.5 top-3.5">
												<i data-lucide="mail" class="size-5"></i>
											</span>
											<input
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="email" name="email" id="email" placeholder="exemple@email.com" required>
										</div>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="telephone">Numéro de
											téléphone</label>
										<div class="relative">
											<span class="absolute left-4.5 top-3.5">
												<i data-lucide="phone" class="size-5"></i>
											</span>
											<input
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="tel" name="telephone" id="telephone" placeholder="+XXX XXXX XXXX" required>
										</div>
									</div>
								</div>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="street">Rue / Quartier</label>
										<div class="relative">
											<input
												class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="street" name="street" id="street" placeholder="charly99" required>
										</div>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Date de
											naissance</label>
										<div class="relative">
											<input name="username"
												class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-gray px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
												placeholder="mm/dd/yyyy" data-class="flatpickr-right" required/>

											<div class="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
												<svg width="18" height="18" viewBox="0 0 18 18" fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
														fill="#64748B" />
												</svg>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="ville">Ville</label>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="ville" name="ville" id="ville" placeholder="Montreal" required>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="pays">Pays</label>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="pays" name="pays" id="pays" placeholder="Canada" required>
									</div>
								</div>
							</div>
							<div class="duration-300 ease-in-out verification-account-hidden" data-step="2">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Selfie photo</h2>
								<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
									<div>
										<ul class="list-disc">
											<li class="text-green-500">L'image doit être claire et parfaitement lisible</li>
											<li class="text-green-500">Si vous portez des lunettes, veuillez les retirer</li>
											<li class="text-green-500">Placer vous droit face à la caméra</li>
											<li class="text-green-500">Placer votre visage droit</li>
										</ul>
									</div>
									<div>
										{{-- Selfie photo Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" accept="image/*" required>
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Selfie photo Fin --}}
									</div>
								</div>
							</div>
							<div class="duration-300 ease-in-out verification-account-hidden" data-step="3">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Carte national d'identité</h2>
								<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
									<div>
										<ul class="list-disc">
											<li class="text-green-500">L'image doit être claire et parfaitement lisible</li>
											<li class="text-green-500">La carte d'identité doit être en cours de validité</li>
											<li class="text-green-500">Tous les coins de la carte doivent être visibles</li>
											<li class="text-green-500">Aucune information ne doit être masquée ou floutée</li>
											<li class="text-green-500">La photo doit être prise sur un fond uni et bien éclairé</li>
											<li class="text-green-500">Évitez les reflets ou les ombres sur la carte</li>
											<li class="text-green-500">La carte doit occuper la majeure partie de l'image</li>
										</ul>
									</div>
									<div>
										<h2 class="text-black dark:text-white uppercase mb-4">Recto</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*"
												required
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" required>
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
										<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*"
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" required>
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
									</div>
								</div>
							</div>
							<div class="duration-300 ease-in-out verification-account-hidden" data-step="4">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Preuve de résidence</h2>
								<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
									<div>
										<ul class="list-disc">
											<li class="text-green-500">Le document doit être récent (moins de 3 mois)</li>
											<li class="text-green-500">L'adresse complète doit être clairement visible</li>
											<li class="text-green-500">Le nom et prénom doivent correspondre à ceux de votre compte</li>
											<li class="text-green-500">Le document doit être émis par une autorité reconnue</li>
											<li class="text-green-500">L'image doit être claire, nette et parfaitement lisible</li>
											<li class="text-green-500">Le document doit être photographié ou scanné dans son intégralité et soumis au format image</li>
											<li class="text-green-500">Aucune information ne doit être masquée, floutée ou modifiée</li>
											<li class="text-green-500">La photo doit être prise sur un fond uni et bien éclairé</li>
											<li class="text-green-500">Évitez les reflets ou les ombres sur le document</li>
											<li class="text-green-500">Le document doit occuper la majeure partie de l'image</li>
										</ul>
									</div>
									<div>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*" required multiple max="2"
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
									</div>
								</div>
							</div>
							<div class="duration-300 ease-in-out verification-account-hidden" data-step="5">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Passport</h2>
								<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
									<div>
										<ul class="list-disc">
											<li class="text-green-500">Le passeport doit être en cours de validité</li>
											<li class="text-green-500">La photo du passeport doit être récente (moins de 3mois)</li>
											<li class="text-green-500">Les informations personnelles doivent être clairement lisibles</li>
											<li class="text-green-500">Le numéro de passeport doit être visible et non altéré</li>
											<li class="text-green-500">La signature du titulaire doit être présente</li>
											<li class="text-green-500">Le passeport ne doit pas présenter de signes de falsification</li>
											<li class="text-green-500">Les tampons et visas doivent être clairement visibles</li>
											<li class="text-green-500">Le passeport doit être émis par une autorité reconnue</li>
										</ul>
									</div>
									<div>
										<h2 class="text-black dark:text-white uppercase mb-4">Recto</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*" required
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
										<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*" required
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
									</div>
								</div>
							</div>
							<div class="duration-300 ease-in-out verification-account-hidden" data-step="6">
								<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Permis de conduire</h2>
								<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
									<div>
										<ul class="list-disc">
											<li class="text-green-500">Le permis de conduire doit être en cours de validité</li>
											<li class="text-green-500">La photo sur le permis doit être récente et ressemblante</li>
											<li class="text-green-500">Les informations personnelles doivent être clairement lisibles</li>
											<li class="text-green-500">Le numéro du permis doit être visible et non altéré</li>
											<li class="text-green-500">La signature du titulaire doit être présente</li>
											<li class="text-green-500">Le permis ne doit pas présenter de signes de falsification</li>
											<li class="text-green-500">La catégorie de véhicules autorisée doit être clairement indiquée</li>
											<li class="text-green-500">Le permis doit être émis par une autorité compétente reconnue</li>
											<li class="text-green-500">Les dates de délivrance et d'expiration doivent être lisibles</li>
										</ul>
									</div>
									<div>
										<h2 class="text-black dark:text-white uppercase mb-4">Recto</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*" required
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
										<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
										{{-- Document Début --}}
										<div id="FileUpload"
											class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
											<input type="file" accept="image/*" required
												class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
											<div class="flex flex-col items-center justify-center space-y-3">
												<span
													class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
													<i data-lucide="upload" class="text-primary size-5"></i>
												</span>
												<p class="text-sm font-medium">
													<span class="text-primary">Cliquer pour téléverser</span>
													ou faites un glisser - deposer
												</p>
												<p class="mt-1.5 text-sm font-medium">
													SVG, PNG, JPG or GIF
												</p>
												<p class="text-sm font-medium">
													(max, 800 X 800px)
												</p>
											</div>
										</div>
										{{-- Document Fin --}}
									</div>
								</div>
							</div>

							<div class="flex justify-between gap-4.5">
								<button
									class="rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white hidden"
									type="button" id="prev">
									Précédent
								</button>
								<button class="rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="button"
									id="next">
									Suivant
								</button>
								<button class="rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="button"
									id="finish"
									type="submit">
									Soumettre
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!-- ====== Account verification End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
