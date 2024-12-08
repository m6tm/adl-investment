@extends('auth.layout')

@section('content')
	<a href="{{ route('home') }}"
		class="flex items-center justify-center fixed top-4 left-4 rounded-full bg-primary p-3 text-white hover:bg-opacity-90">
		<span data-lucide="home" class="h-5 w-5"></span>
	</a>
	<div class="min-h-screen w-full flex flex-col justify-center items-center">
		<div class="rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
			<div class="flex flex-wrap items-center">
				<div class="w-full border-stroke dark:border-strokedark xl:border-l-2 py-5">
					<div class="w-full p-4 sm:p-12.5 xl:p-17.5">
						<span class="mb-1.5 block font-medium">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;" class="dark:text-white">{{ __('login.start_for_free') }}</font>
							</font>
						</span>
						<h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
							{{ __('login.login_to_adl') }}
						</h2>

						<!-- Session Status -->
						<x-auth-session-status class="mb-4" :status="session('status')" />
						<x-error-message-alert class="mb-4" />

						<form method="POST" action="{{ route('login') }}">
							@csrf
							<div class="mb-4">
								<label for="email" class="mb-2.5 block font-medium text-black dark:text-white">
									{{ __('login.email') }}
								</label>
								<div class="relative">
									<input id="email" type="email" name="email" required autofocus
										placeholder="{{ __('login.enter_your_email') }}"
										class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">

									<span class="absolute right-4 top-4">
										<span data-lucide="mail" class="text-slate-400 dark:text-slate-300"></span>
									</span>
								</div>
								<x-input-error :messages="$errors->get('email')" class="mt-2" />
							</div>

							<div class="mb-6">
								<label for="password" class="mb-2.5 block font-medium text-black dark:text-white">
									{{ __('login.password') }}
								</label>
								<div class="relative">
									<input id="password" type="password" name="password" required autocomplete="current-password"
										placeholder="{{ __('login.password_requirements') }}"
										class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">

									<span class="absolute right-4 top-4">
										<span data-lucide="key" class="text-slate-400 dark:text-slate-300"></span>
									</span>
								</div>
								<x-input-error :messages="$errors->get('password')" class="mt-2" />
							</div>

							<div class="mb-5">
								<input type="submit" value="{{ __('login.login') }}" style="color:white"
									class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-black transition hover:bg-opacity-90">
							</div>

							<div class="mt-6 text-center">
								<p class="font-medium">
									<font style="vertical-align: inherit;">
										<font style="vertical-align: inherit;" class="dark:text-white">
											{{ __('login.no_account') }}
										</font>
									</font>
									<a href="{{ route('register') }}" class="text-sky-600">
										{{ __('login.sign_up') }}
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection
