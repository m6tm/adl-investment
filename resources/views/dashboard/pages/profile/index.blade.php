@php
	$title = __('profile.title');
	$breadcrumbs = [['title' => $title]];
@endphp

<x-dashboard.layout :title="$title" :breadcrumb="$breadcrumbs">
	<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] pb-5">
			<x-error-message-alert class="mb-4 mx-4" />
			<div class="relative z-20 h-35 md:h-65">
				<img src="{{ asset('assets/img/cover-01.png') }}" class="rounded-tl-[10px] rounded-tr-[10px] h-full w-full"
					alt="profile cover" class="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
				<div class="absolute bottom-1 right-1 z-10 xsm:bottom-4 gap-3 xsm:right-4 flex items-center">
					<div class="dropdown dropdown-end me-4">
						<div tabindex="0" role="button" class="p-3">
							<span class="fi fi-{{ app()->getLocale() == 'en' ? 'us' : 'fr' }}"></span>
						</div>
						<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
							<li>
								<a href="{{ route('set.locale', 'fr') }}"><span class="fi fi-fr"></span> Français</a>
								<a href="{{ route('set.locale', 'en') }}"><span class="fi fi-us"></span> English</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
				<div
					class="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
					<div class="relative drop-shadow-2">
						<img src="{{ asset('assets/img/user-06.png') }}" alt="profile" />
					</div>
				</div>
				<div class="mt-4">
					<h3 class="mb-1.5 text-2xl font-medium text-black dark:text-white">
						Danish Heilium
					</h3>
					<p class="font-medium">{{ __('enum.USER_ROLE.PLAYER') }}</p>
					<div class="flex">
						<div
							class="mx-auto mb-5.5 mt-4.5 grid grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
							<div class="flex flex-col items-start justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">15</span>
								<span class="text-sm">{{ __('profile.winned') }}</span>
							</div>
							<div class="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">$129K</span>
								<span class="text-sm">{{ __('profile.wallet') }}</span>
							</div>
							<div class="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">$2K</span>
								<span class="text-sm">{{ __('profile.investment') }}</span>
							</div>
						</div>
					</div>

				</div>
			</div>
			<div class="mt-6.5 px-4 grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="col-span-3">
					<h3 class="text-title-md">Informations personnelles</h3>
				</div>
				<div class="col-span-2">
					<form action="{{ route('dashboard.profile.update') }}" action="#" id="profil-account-form" autocomplete="off"
						novalidate="novalidate">
						@csrf
						<div class="grid grid-cols-2 gap-4">
							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="Nom">{{ __('users.create.last_name') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="user" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="text" name="nom" id="Nom" value="{{ auth()->user()->name }}" placeholder="Devid Jhon"
										required>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="Prenom">{{ __('users.create.first_name') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="user" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="text" name="prenom" id="Prenom" value="{{ auth()->user()->first_name }}" placeholder="Rene Mode"
										required>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="telephone">{{ __('users.create.phone_number') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="phone" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="tel" name="telephone" id="telephone" value="{{ auth()->user()->phones->first()?->telephone }}"
										placeholder="+XXX XXXX XXXX" required>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="email">{{ __('users.create.email') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="mail" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-neutral-200 py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="email" readonly disabled id="email" value="{{ auth()->user()->email }}"
										placeholder="exemple@email.com" required>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="street">{{ __('users.create.town') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-3.5">
										<i data-lucide="mail" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-neutral-200 py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="street" readonly disabled id="street" value="{{ auth()->user()->address?->street }}"
										placeholder="{{ __('users.create.town') }}" required>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="username">{{ __('users.create.username') }}</label>
								<div class="relative">
									<span class="absolute left-4.5 top-4">
										<i data-lucide="hash" class="size-5"></i>
									</span>
									<input
										class="w-full rounded border border-stroke bg-neutral-200 py-3 pl-11.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
										type="pseudo" readonly disabled id="username" value="{{ auth()->user()->pseudo }}"
										placeholder="charly99">
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="username">{{ __('users.create.birth_date') }}</label>
								<div class="relative">
									<input
										class="form-datepicker w-full rounded border-[1.5px] border-stroke bg-neutral-200 px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-slate-100 dark:bg-meta-4 dark:focus:border-primary"
										placeholder="mm/dd/yyyy" readonly disabled id="birth_day"
										value="{{ auth()->user()->birth_date ? \Carbon\Carbon::parse(auth()->user()->birth_date)->format('M d, Y') : '' }}"
										data-class="flatpickr-right" />

									<div class="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
										<i data-lucide="calendar-days" class="size-5"></i>
									</div>
								</div>
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="ville">{{ __('users.create.city') }}</label>
								<input
									class="w-full rounded border border-stroke bg-neutral-200 py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="ville" readonly disabled id="ville" value="{{ auth()->user()->address?->city }}"
									placeholder="Montreal">
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="pays">{{ __('users.create.country') }}</label>
								<input
									class="w-full rounded border border-stroke bg-neutral-200 py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="pays" readonly disabled id="pays" value="{{ auth()->user()->pays->name }}"
									data-code="{{ auth()->user()->pays->code }}" placeholder="Canada">
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="current_password">{{ __('users.create.current_password') }}</label>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="password" name="current_password" autocomplete="off" id="current_password"
									placeholder="{{ __('users.create.current_password') }}">
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="new_password">{{ __('users.create.new_password') }}</label>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="password" name="new_password" id="new_password" placeholder="{{ __('users.create.new_password') }}">
							</div>

							<div class="mb-3">
								<label class="mb-3 block text-sm font-medium text-black dark:text-white"
									for="new_password_confirmation">{{ __('users.create.new_password_confirmation') }}</label>
								<input
									class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
									type="password" name="new_password_confirmation" id="new_password_confirmation"
									placeholder="{{ __('users.create.new_password_confirmation') }}">
							</div>

							<div class="col-span-2 flex gap-3">
								<button class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
									type="submit">
									{{ __('users.create.save') }}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</x-dashboard.layout>
