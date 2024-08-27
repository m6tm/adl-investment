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
					<form action="#" id="verification-account-form" autocomplete="off" novalidate="novalidate" class="grid lg:grid-cols-3 gap-5">
						{{-- Choisir une photo de profile Début --}}
						<div class="lg:flex lg:flex-col lg:space-y-5 grid grid-cols-2 gap-4" id="verification-account-tabs">
							<x-account-verification-stepper document="Informations utilisateur" />
							<x-account-verification-stepper document="Selfie photo" />
							<x-account-verification-stepper document="Carte national d'identité" />
							<x-account-verification-stepper document="Preuve de résidence" />
							<x-account-verification-stepper document="Passport" />
							<x-account-verification-stepper document="Permis de conduire" />
						</div>
						{{-- Choisir une photo de profile Fin --}}
						<div class="lg:col-span-2" id="account-verification-steps" data-current-step="1">
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
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="text" name="nom" id="Nom" value="{{ auth()->user()->name }}" placeholder="Devid Jhon" required>
										</div>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Prenom">Prénom</label>
										<div class="relative">
											<span class="absolute left-4.5 top-3.5">
												<i data-lucide="user" class="size-5"></i>
											</span>
											<input
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="text" name="prenom" id="Prenom" value="{{ auth()->user()->first_name }}" placeholder="Rene Mode" required>
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
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="email" name="email" id="email" value="{{ auth()->user()->email }}" placeholder="exemple@email.com" required>
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
												class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="tel" name="telephone" id="telephone" value="{{ auth()->user()->phone->first()?->telephone }}" placeholder="+XXX XXXX XXXX" required>
										</div>
									</div>
								</div>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="street">Rue / Quartier</label>
										<div class="relative">
											<input
												class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
												type="text" name="street" id="street" value="{{ auth()->user()->address->street }}" placeholder="charly99" required>
										</div>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Date de
											naissance</label>
										<div class="relative">
											<input name="birth_date"
												class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-gray px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-slate-400 dark:bg-meta-4 dark:focus:border-primary"
												placeholder="Aug 13, 2024" type="text" value="{{ auth()->user()->birth_date ? \Carbon\Carbon::parse(auth()->user()->birth_date)->format('M d, Y') : '' }}" id="birth_day" data-class="flatpickr-right" required/>

											<div class="pointer-events-none absolute inset-0 left-auto right-5 top-3">
												<span data-lucide="calendar-days"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="ville">Ville</label>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="text" name="ville" id="ville" placeholder="Montreal" value="{{ auth()->user()->address->city }}" required>
									</div>

									<div class="w-full sm:w-1/2">
										<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="pays">Pays</label>
										<input
											class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="text" name="pays" value="{{ auth()->user()->pays->name }}" data-code="{{ auth()->user()->pays->code }}" id="pays" readonly disabled>
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
								<button class="rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
									id="finish"
									type="submit">
									Soumettre
								</button>
							</div>
							<ul id="error-validation-list" class="list-disc mt-5 text-rose-500"></ul>
						</div>
					</form>
				</div>
			</div>
			<!-- ====== Account verification End -->
		</div>
	</main>
	<!-- ===== Main Content End ===== -->
@endsection
