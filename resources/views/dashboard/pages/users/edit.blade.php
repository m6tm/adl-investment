@php
	$title = __('users.update.edit_user');
	$breadcrumbs = [
	    ['title' => __('users.update.user_list'), 'route' => route('dashboard.user.list')],
	    ['title' => $title],
	];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
			<x-error-message-alert class="mb-4" />
			<form action="{{ route('dashboard.user.edit.post', $user->id) }}" method="POST" enctype="multipart/form-data">
				@csrf
				<section>
					<h2 class="text-black dark:text-white uppercase text-title-md mb-4">{{ __('users.create.user_information') }}</h2>
					<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="Nom">{{ __('users.create.last_name') }}</label>
							<div class="relative">
								<span class="absolute left-4.5 top-3.5">
									<i data-lucide="user" class="size-5"></i>
								</span>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="text" disabled readonly name="nom" id="Nom" placeholder="Devid Jhon"
									value="{{ $user->name }}" required>
							</div>
						</div>

						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="Prenom">{{ __('users.create.first_name') }}</label>
							<div class="relative">
								<span class="absolute left-4.5 top-3.5">
									<i data-lucide="user" class="size-5"></i>
								</span>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="text" disabled readonly name="prenom" id="Prenom" placeholder="Rene Mode"
									value="{{ $user->first_name }}" required>
							</div>
						</div>
					</div>
					<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="email">{{ __('users.create.email') }}</label>
							<div class="relative">
								<span class="absolute left-4.5 top-3.5">
									<i data-lucide="mail" class="size-5"></i>
								</span>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="email" disabled readonly name="email" id="email" placeholder="exemple@email.com"
									value="{{ $user->email }}" required>
							</div>
						</div>

						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="telephone">{{ __('users.create.phone_number') }}</label>
							<div class="relative">
								<span class="absolute left-4.5 top-3.5">
									<i data-lucide="phone" class="size-5"></i>
								</span>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="tel" disabled readonly name="telephone" id="telephone" placeholder="+XXX XXXX XXXX"
									value="{{ $user->phones[0]->telephone }}" required>
							</div>
						</div>
					</div>
					<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="username">{{ __('users.create.username') }}</label>
							<div class="relative">
								<span class="absolute left-4.5 top-4">
									<i data-lucide="hash" class="size-5"></i>
								</span>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="text" disabled readonly name="username" id="username" placeholder="charly99"
									value="{{ $user->pseudo }}">
							</div>
						</div>

						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="username">{{ __('users.create.birth_date') }}</label>
							<div class="relative">
								<input
									class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-gray px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-slate-100 dark:bg-meta-4 dark:focus:border-primary"
									placeholder="mm/dd/yyyy" disabled readonly name="birth_date" data-class="flatpickr-right"
									value="{{ $user->birth_date }}" />

								<div class="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
									<i data-lucide="calendar-days" class="size-5"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="ville">{{ __('users.create.city') }}</label>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="text" disabled readonly name="ville" id="ville" placeholder="Montreal"
								value="{{ $user->address->city }}">
						</div>

						<div class="w-full sm:w-1/2">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="pays">{{ __('users.create.country') }}</label>
							<input
								class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
								type="text" list="countries" name="pays" id="pays" placeholder="Canada"
								value="{{ $user->pays->name }}" readonly disabled>
							<datalist id="countries">
								@foreach ($countries as $country)
									<option value="{{ $country->name }}">{{ $country->code }}</option>
								@endforeach
							</datalist>
						</div>
					</div>
					<div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
						<div class="w-full sm:w-1/2 flex space-x-3">
							<label class="mb-3 block text-sm font-medium text-black dark:text-white"
								for="reset">{{ __('users.update.reset_password') }}</label>
							<input type="checkbox" id="reset" name="reset" class="checkbox" />
						</div>
					</div>

					<div class="flex justify-end gap-4.5">
						<button
							class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
							type="reset">
							{{ __('users.create.cancel') }}
						</button>
						<button class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
							type="submit">
							{{ __('users.create.save') }}
						</button>
					</div>
				</section>
			</form>
		</div>
	</div>
</x-dashboard.layout>
