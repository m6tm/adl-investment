<form action="{{ route('dashboard.admin.account-verification.check.post', $user->id) }}" enctype="multipart/form-data" method="POST"
	id="verification-account-form" autocomplete="off" novalidate="novalidate" class="grid lg:grid-cols-3 gap-5">
	@csrf
	{{-- Choisir une photo de profile Début --}}
	<div class="lg:flex lg:flex-col lg:space-y-5 grid grid-cols-2 gap-4" id="verification-account-tabs">
		<x-account-verification-stepper document="Informations utilisateur" :status="$DOCUMENT_STATUS::PENDING" />
		@foreach ($user->documents as $document)
            <x-account-verification-stepper document="{!! __($document->document_autorise->type) !!}" :status="$document->statuts" />
		@endforeach
	</div>
	{{-- Choisir une photo de profile Fin --}}
	<div class="lg:col-span-2" id="account-verification-steps" data-current-step="1">
		{{-- Informations utilisateur --}}
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
							type="text" name="nom" id="Nom" value="{{ $user->name }}" placeholder="Devid Jhon"
							required>
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
							type="text" name="prenom" id="Prenom" value="{{ $user->first_name }}" placeholder="Rene Mode"
							required>
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
							type="email" name="email" id="email" value="{{ $user->email }}" placeholder="exemple@email.com"
							required>
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
							type="tel" name="telephone" id="telephone" value="{{ $user->phones->first()?->telephone }}"
							placeholder="+XXX XXXX XXXX" required>
					</div>
				</div>
			</div>
			<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
				<div class="w-full sm:w-1/2">
					<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="street">Rue / Quartier</label>
					<div class="relative">
						<input
							class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
							type="text" name="street" id="street" value="{{ $user->address?->street }}"
							placeholder="charly99" required>
					</div>
				</div>

				<div class="w-full sm:w-1/2">
					<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">Date de
						naissance</label>
					<div class="relative">
						<input name="username"
							class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-gray px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-slate-400 dark:bg-meta-4 dark:focus:border-primary"
							placeholder="Aug 13, 2024" type="text"
							value="{{ $user->birth_date ? \Carbon\Carbon::parse($user->birth_date)->format('M d, Y') : '' }}"
							id="birth_day" data-class="flatpickr-right" required />

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
						type="text" name="ville" id="ville" placeholder="Montreal"
						value="{{ $user->address?->city }}" required>
				</div>

				<div class="w-full sm:w-1/2">
					<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="pays">Pays</label>
					<input
						class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-400 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						type="text" name="pays" value="{{ $user->pays->name }}"
						data-code="{{ $user->pays->code }}" id="pays" readonly disabled>
				</div>
			</div>
		</div>
		@foreach ($user->documents as $key => $document)
			@php
				$current_document_autorise = $document->document_autorise;
				$files = json_decode($document->path, true);
			@endphp
			@switch($current_document_autorise->type)
				@case($DOCUMENT_TYPE::SELFIE)
					<div class="duration-300 ease-in-out verification-account-hidden" data-step="{{ $key + 2 }}">
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
								<div class="">
									<div class="flex items-center mb-4">
										<input id="selfie" type="checkbox" name="selfie" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="selfie" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									<img src="{{ asset($files[0]) }}" alt="selfie" class="mb-5.5 w-full">
								</div>
								{{-- Selfie photo Fin --}}
							</div>
						</div>
					</div>
				@break

				@case($DOCUMENT_TYPE::CNI)
					<div class="duration-300 ease-in-out verification-account-hidden" data-step="{{ $key + 2 }}">
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
								<div class="">
									<div class="flex items-center mb-4">
										<input id="cni-recto" type="checkbox" name="cni[recto]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="cni-recto" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									<img src="{{ asset($files[0]) }}" alt="CNI Recto" class="mb-5.5 w-full">
								</div>
								{{-- Document Fin --}}
								<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
								{{-- Document Début --}}
								<div class="">
									<div class="flex items-center mb-4">
										<input id="cni-verso" type="checkbox" name="cni[verso]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="cni-verso" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									<img src="{{ asset($files[1]) }}" alt="CNI Recto" class="mb-5.5 w-full">
								</div>
								{{-- Document Fin --}}
							</div>
						</div>
					</div>
				@break

				@case($DOCUMENT_TYPE::PASSPORT)
					<div class="duration-300 ease-in-out verification-account-hidden" data-step="{{ $key + 2 }}">
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
								<div class="">
									<div class="flex items-center mb-4">
										<input id="passport-recto" type="checkbox" name="passport[recto]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="passport-recto" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									@if (str_ends_with($files[0], '.pdf'))
										<iframe src="{{ asset($files[0]) }}" class="mb-5.5 w-full h-[450px]"></iframe>
									@else
										<img src="{{ asset($files[0]) }}" alt="passport recto" class="mb-5.5 w-full">
									@endif
								</div>
								{{-- Document Fin --}}
								<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
								{{-- Document Début --}}
								<div class="">
									<div class="flex items-center mb-4">
										<input id="passport-verso" type="checkbox" name="passport[verso]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="passport-verso" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									@if (str_ends_with($files[1], '.pdf'))
										<iframe src="{{ asset($files[1]) }}" class="mb-5.5 w-full h-[450px]"></iframe>
									@else
										<img src="{{ asset($files[1]) }}" alt="passport recto" class="mb-5.5 w-full">
									@endif
								</div>
								{{-- Document Fin --}}
							</div>
						</div>
					</div>
				@break

				@case($DOCUMENT_TYPE::PERMIS_CONDUIRE)
					<div class="duration-300 ease-in-out verification-account-hidden" data-step="{{ $key + 2 }}">
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
								<div class="">
									<div class="flex items-center mb-4">
										<input id="permis-recto" type="checkbox" name="permis[recto]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="permis-recto" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									@if (str_ends_with($files[0], '.pdf'))
										<iframe src="{{ asset($files[0]) }}" class="mb-5.5 w-full h-[450px]"></iframe>
									@else
										<img src="{{ asset($files[0]) }}" alt="permis recto" class="mb-5.5 w-full">
									@endif
								</div>
								{{-- Document Fin --}}
								<h2 class="text-black dark:text-white uppercase mb-4">Verso</h2>
								{{-- Document Début --}}
								<div class="">
									<div class="flex items-center mb-4">
										<input id="permis-verso" type="checkbox" name="permis[verso]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
										<label for="permis-verso" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
									</div>
									@if (str_ends_with($files[1], '.pdf'))
										<iframe src="{{ asset($files[1]) }}" class="mb-5.5 w-full h-[450px]"></iframe>
									@else
										<img src="{{ asset($files[1]) }}" alt="permis verso" class="mb-5.5 w-full">
									@endif
								</div>
								{{-- Document Fin --}}
							</div>
						</div>
					</div>
				@break

				@case($DOCUMENT_TYPE::PREUVE_RESIDENCE)
					<div class="duration-300 ease-in-out verification-account-hidden" data-step="{{ $key + 2 }}">
						<h2 class="text-black dark:text-white uppercase text-title-md mb-4">Preuve de résidence</h2>
						<div class="mb-5.5 grid lg:grid-cols-2 grid-cols-1 gap-5.5">
							<div>
								<ul class="list-disc">
									<li class="text-green-500">Le document doit être récent (moins de 3 mois)</li>
									<li class="text-green-500">L'adresse complète doit être clairement visible</li>
									<li class="text-green-500">Le nom et prénom doivent correspondre à ceux de votre compte</li>
									<li class="text-green-500">Le document doit être émis par une autorité reconnue</li>
									<li class="text-green-500">L'image doit être claire, nette et parfaitement lisible</li>
									<li class="text-green-500">Le document doit être photographié ou scanné dans son intégralité et soumis au format
										image</li>
									<li class="text-green-500">Aucune information ne doit être masquée, floutée ou modifiée</li>
									<li class="text-green-500">La photo doit être prise sur un fond uni et bien éclairé</li>
									<li class="text-green-500">Évitez les reflets ou les ombres sur le document</li>
									<li class="text-green-500">Le document doit occuper la majeure partie de l'image</li>
								</ul>
							</div>
							<div>
								{{-- Document Début --}}
								@foreach ($files as $file)
									<div class="">
										<div class="flex items-center mb-4">
											<input id="residence" type="checkbox" name="residence[]" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
											<label for="residence" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Document valide</label>
										</div>
										@if (str_ends_with($file, '.pdf'))
											<iframe src="{{ asset($file) }}" class="mb-5.5 w-full h-[450px]"></iframe>
										@else
											<img src="{{ asset($file) }}" alt="residence" class="mb-5.5 w-full">
										@endif
									</div>
								@endforeach
								{{-- Document Fin --}}
							</div>
						</div>
					</div>
				@break

				@default
			@endswitch
		@endforeach

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
			<button class="rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" id="finish"
				type="submit">
				Soumettre
			</button>
		</div>
		<ul id="error-validation-list" class="list-disc mt-5 text-rose-500"></ul>
	</div>
</form>