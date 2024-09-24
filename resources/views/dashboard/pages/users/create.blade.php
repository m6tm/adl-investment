@php
	$title = __('users.create.create_user');
	$breadcrumbs = [['title' => __('users.create.user_list'), 'route' => route('dashboard.user.list')], ['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
		<x-error-message-alert class="mx-5" />
		<div class="grid lg:grid-cols-3 grid-cols-1 gap-5">
			{{-- Choisir une photo de profile Début --}}
			<form action="#">
				<div class="mb-4 flex items-center gap-3">
					<div class="h-14 w-14 rounded-full">
						<img src="{{ asset('assets/img/team/team-3.jpg') }}" class="rounded-full" alt="User">
					</div>
					<div>
						<span class="mb-1.5 font-medium text-black dark:text-white">{{ __('users.create.choose_profile_photo') }} <code
								class="text-sm bg-rose-100 dark:bg-transparent dark:text-rose-300">({{ __('users.create.optional') }})</code></span>
						<span class="flex gap-2.5">
							<button class="text-sm font-medium text-rose-400 hover:text-rose-500">
								{{ __('users.create.delete') }}
							</button>
							<button class="text-sm font-medium dark:text-white hover:text-primary">
								{{ __('users.create.update') }}
							</button>
						</span>
					</div>
				</div>

				<div id="FileUpload"
					class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-transparent sm:py-7.5">
					<input type="file" accept="image/*"
						class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none">
					<div class="flex flex-col items-center justify-center space-y-3">
						<span
							class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
							<i data-lucide="upload" class="text-primary size-5"></i>
						</span>
						<p class="text-sm font-medium">
							<span class="text-primary">{{ __('users.create.click_to_upload') }}</span>
							{{ __('users.create.drag_and_drop') }}
						</p>
						<p class="mt-1.5 text-sm font-medium">
							SVG, PNG, JPG or GIF
						</p>
						<p class="text-sm font-medium">
							{{ __('users.create.max_size') }}
						</p>
					</div>
				</div>

				<div class="flex justify-start gap-4.5">
					<button
						class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
						type="submit">
						{{ __('users.create.cancel') }}
					</button>
					<button class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
						type="submit">
						{{ __('users.create.save') }}
					</button>
				</div>
			</form>
			{{-- Choisir une photo de profile Fin --}}
			<form action="#" class="lg:col-span-2 col-span-1">
				<h2 class="text-black dark:text-white uppercase text-title-md mb-4">{{ __('users.create.user_information') }}</h2>
				<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Nom">{{ __('users.create.last_name') }}</label>
						<div class="relative">
							<span class="absolute left-4.5 top-3.5">
								<i data-lucide="user" class="size-5"></i>
							</span>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="text" name="nom" id="Nom" placeholder="Devid Jhon" required>
						</div>
					</div>

					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="Prenom">{{ __('users.create.first_name') }}</label>
						<div class="relative">
							<span class="absolute left-4.5 top-3.5">
								<i data-lucide="user" class="size-5"></i>
							</span>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="text" name="prenom" id="Prenom" placeholder="Rene Mode" required>
						</div>
					</div>
				</div>
				<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="email">{{ __('users.create.email') }}</label>
						<div class="relative">
							<span class="absolute left-4.5 top-3.5">
								<i data-lucide="mail" class="size-5"></i>
							</span>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="email" name="email" id="email" placeholder="exemple@email.com" required>
						</div>
					</div>

					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="telephone">{{ __('users.create.phone_number') }}</label>
						<div class="relative">
							<span class="absolute left-4.5 top-3.5">
								<i data-lucide="phone" class="size-5"></i>
							</span>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="tel" name="telephone" id="telephone" placeholder="+XXX XXXX XXXX" required>
						</div>
					</div>
				</div>
				<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">{{ __('users.create.username') }}</label>
						<div class="relative">
							<span class="absolute left-4.5 top-4">
								<i data-lucide="hash" class="size-5"></i>
							</span>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="pseudo" name="username" id="username" placeholder="charly99">
						</div>
					</div>

					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="username">{{ __('users.create.birth_date') }}</label>
						<div class="relative">
							<input
								class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-gray px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-slate-100 dark:bg-meta-4 dark:focus:border-primary"
								placeholder="mm/dd/yyyy" data-class="flatpickr-right" />

							<div class="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
								<i data-lucide="calendar-days" class="size-5"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="ville">{{ __('users.create.city') }}</label>
						<input
							class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
							type="ville" name="ville" id="ville" placeholder="Montreal">
					</div>

					<div class="w-full sm:w-1/2">
						<label class="mb-3 block text-sm font-medium text-black dark:text-white" for="pays">{{ __('users.create.country') }}</label>
						<input
							class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
							type="pays" name="pays" id="pays" placeholder="Canada">
					</div>
				</div>

				<div class="flex justify-end gap-4.5">
					<button
						class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
						type="submit">
						{{ __('users.create.cancel') }}
					</button>
					<button class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
						type="submit">
						{{ __('users.create.save') }}
					</button>
				</div>
			</form>
		</div>
	</div>
</x-dashboard.layout>
