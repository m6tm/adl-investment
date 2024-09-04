@extends('auth.layout')

@section('content')
	<div class="min-h-screen w-full flex flex-col justify-center items-center">
		<div class="rounded-md border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
			<div class="flex flex-wrap items-center">
				<div class="hidden w-full xl:block xl:w-1/2 dark:text-white">
					<div class="px-26 py-17.5 text-center">
						<a class="mb-5.5 inline-block" href="{{ route('home') }}">
							<img class="block" src="https://place-hold.it/86" alt="Logo">
						</a>

						<p class="font-medium 2xl:px-20 mt-3">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;">
									Lorem ipsum douleur si amet, consectetur adipiscing elit suspendisse.
								</font>
							</font>
						</p>
					</div>
				</div>
				<div class="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 py-5">
					<div class="w-full p-4 sm:p-12.5 xl:p-17.5">
						<span class="mb-1.5 block font-medium">
							<font style="vertical-align: inherit;">
								<font style="vertical-align: inherit;" class="dark:text-white">Commencez gratuitement</font>
							</font>
						</span>
						<h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                            <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;">
                                    Connectez-vous à ADL Investment
								</font>
							</font>
						</h2>

						<!-- Session Status -->
						<x-auth-session-status class="mb-4" :status="session('status')" />

						<form method="POST" action="{{ route('login') }}">

							<!-- @if ($errors->any())
								<div class="alert alert-danger mx-4 mt-2 alert-dismissible fade show" role="alert">
									<strong>Whoops!</strong> There were some problems with your input.<br><br>
									<ul>
										@foreach ($errors->all() as $error)
											<li>{{ $error }}</li>
										@endforeach
									</ul>
								</div>
							@endif -->
							
							@csrf

							<div class="mb-4">
								<label for="email" class="mb-2.5 block font-medium text-black dark:text-white">
									<font style="vertical-align: inherit;">
										<font style="vertical-align: inherit;">E-mail</font>
									</font>
								</label>
								<div class="relative">
									<input id="email" type="email" name="email" required autofocus placeholder="Entrer votre Email"
										class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">

									<span class="absolute right-4 top-4">
										<span data-lucide="mail" class="text-slate-400 dark:text-slate-300"></span>
									</span>
								</div>
								<x-input-error :messages="$errors->get('email')" class="mt-2" />
							</div>

							<div class="mb-6">
								<label for="password" class="mb-2.5 block font-medium text-black dark:text-white">
									<font style="vertical-align: inherit;">
										<font style="vertical-align: inherit;">Mot de passe</font>
									</font>
								</label>
								<div class="relative">
									<input id="password" type="password" name="password" required autocomplete="current-password"
										placeholder="8+ caractères, 1 lettre majuscule, minuscule et 1 symbole"
										class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">

									<span class="absolute right-4 top-4">
										<span data-lucide="key" class="text-slate-400 dark:text-slate-300"></span>
									</span>
								</div>
								<x-input-error :messages="$errors->get('password')" class="mt-2" />
							</div>

							<div class="mb-5">
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">
                                        <input type="submit" value="Se connecter" style="color:white"
											class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-black transition hover:bg-opacity-90">
									</font>
								</font>
							</div>

							<div class="mt-6 text-center">
								<p class="font-medium">
									<font style="vertical-align: inherit;">
										<font style="vertical-align: inherit;" class="dark:text-white">
											Vous n'avez pas de compte ?
										</font>
									</font>
                                    <a href="{{ route('register') }}" class="text-sky-600">
										<font style="vertical-align: inherit;">
											<font style="vertical-align: inherit;">Inscrivez-vous</font>
										</font>
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
