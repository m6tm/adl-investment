@extends('auth.layout')

@section('content')
    <a href="{{ route('home') }}" class="flex items-center justify-center fixed top-4 left-4 rounded-full bg-primary p-3 text-white hover:bg-opacity-90">
        <span data-lucide="home" class="h-5 w-5"></span>
    </a>
	<div class="w-full flex flex-col justify-center items-center">
		<div class="lg:w-1/3 rounded-md my-16 border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div class="w-full border-stroke dark:border-strokedark xl:border-l-2 py-5">
                <div class="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <span class="mb-1.5 block font-medium dark:text-white">
                        {{ __('registration.start_free') }}
                    </span>
                    <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        {{ __('registration.create_account') }}
                    </h2>

                    <form method="POST" action="{{ route('register') }}" class="grid grid-cols-1 gap-3">
                        @csrf
                                        
                        <div class="mb-4">
                            <label for="name" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.name') }}
                            </label>
                            <div class="relative">
                                <input id="name" type="text" name="name" required autofocus autocomplete="name"
                                    placeholder="{{ __('registration.enter_name') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                            <x-input-error :messages="$errors->get('name')" class="mt-2" />
                        </div>

                        <div class="mb-4">
                            <label for="first_name" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.first_name') }}
                            </label>
                            <div class="relative">
                                <input id="first_name" type="text" name="first_name" required autocomplete="first_name"
                                    placeholder="{{ __('registration.enter_first_name') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="birth_date" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.birth_date') }}
                            </label>
                            <div class="relative">
                                <input id="birth_date" type="date" name="birth_date" required
                                    placeholder="{{ __('registration.enter_birth_date') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent dark:text-gray py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="email" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.email') }}
                            </label>
                            <div class="relative">
                                <input id="email" type="email" name="email" required 
                                    placeholder="{{ __('registration.enter_email') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                            <x-input-error :messages="$errors->get('email')" class="mt-2" />
                        </div>

                        <div class="mb-4">
                            <label for="phone" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.phone') }}
                            </label>
                            <div class="relative">
                                <input id="phone" type="tel" name="phone" required
                                    placeholder="{{ __('registration.enter_phone') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="pseudo" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.pseudo') }}
                            </label>
                            <div class="relative">
                                <input id="pseudo" type="text" name="pseudo" required
                                    placeholder="{{ __('registration.choose_player_name') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="country" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.country') }}
                            </label>
                            <div class="relative">
                                <select id="country" name="country" 
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="" disabled selected>{{ __('registration.select_country') }}</option>
                                    @foreach ($countries as $country)
                                        <option value="{{ $country->dial_code }}">({{ $country->dial_code }}) {{ $country->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="city" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.city') }}
                            </label>
                            <div class="relative">
                                <input id="city" type="text" name="city" placeholder="{{ __('registration.enter_city') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="neighborhood" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.neighborhood') }}
                            </label>
                            <div class="relative">
                                <input id="neighborhood" type="text" name="neighborhood" placeholder="{{ __('registration.enter_neighborhood') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="password" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.password') }}
                            </label>
                            <div class="relative">
                                <input id="password" type="password" name="password" required autocomplete="new-password" 
                                    placeholder="{{ __('registration.create_password') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                            <x-input-error :messages="$errors->get('password')" class="mt-2" />
                        </div>

                        <div class="mb-4">
                            <label for="password_confirmation" class="mb-2.5 block font-medium text-black dark:text-white">
                                {{ __('registration.confirm_password') }}
                            </label>
                            <div class="relative">
                                <input id="password_confirmation" type="password" name="password_confirmation" required autocomplete="new-password" 
                                    placeholder="{{ __('registration.confirm_password') }}"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
                        </div>

                        <div class="mb-5">
                            <input type="submit" value="{{ __('registration.create_account_button') }}" style="color:white"
                                class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-black transition hover:bg-opacity-90">
                        </div>

                        <div class="mt-6 text-center">
                            <p class="font-medium">
                                {{ __('registration.already_have_account') }}
                                <a href="{{ route('login') }}" class="text-sky-600">
                                    {{ __('registration.login') }}
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
		</div>
	</div>
@endsection