@extends('auth.layout')

@section('content')
	<div class="w-full flex flex-col justify-center items-center">
		<div class="lg:w-1/3 rounded-md my-16 border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div class="w-full border-stroke dark:border-strokedark xl:border-l-2 py-5">
                <div class="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <span class="mb-1.5 block font-medium">
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;">Commencez gratuitement</font>
                        </font>
                    </span>
                    <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;">
                                Créez votre compte
                            </font>
                        </font>
                    </h2>

                    <form class="grid grid-cols-1 gap-3">
                        <div class="mb-4">
                            <label for="nom" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Nom</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="nom" placeholder="Entrer votre Nom de famille"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="prenom" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Prénom</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="prenom" placeholder="Entrer votre Prénom"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="email" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">E-mail</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="email" id="email" placeholder="Entrer votre adresse mail"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="pseudo" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Pseudo</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="pseudo" placeholder="Choisir un nom de joueur"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="pays" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Pays</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="pays" placeholder="Votre pays"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="ville" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Ville</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="ville" placeholder="Votre ville"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="quatier" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Quatier</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="text" id="quatier" placeholder="Votre quatier"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="mot_de_passe" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Mot de passe</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="password" id="mot_de_passe" placeholder="Créer un mot de passe"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="mot_de_passe_confirmation" class="mb-2.5 block font-medium text-black dark:text-white">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">Confirmer le mot de passe</font>
                                </font>
                            </label>
                            <div class="relative">
                                <input type="password" id="mot_de_passe_confirmation" placeholder="Confirmer le mot de passe"
                                    class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                            </div>
                        </div>

                        <div class="mb-5">
                            <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;">
                                    <input type="submit" value="Créer un compte"
                                        class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-black transition hover:bg-opacity-90">
                                </font>
                            </font>
                        </div>

                        <div class="mt-6 text-center">
                            <p class="font-medium">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">
                                        Vous avez déjà un compte ?
                                    </font>
                                </font><a href="{{ route('signin', ['lang' => app()->getLocale()]) }}" class="text-sky-600">
                                    <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">Connectez-vous</font>
                                    </font>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
		</div>
	</div>
@endsection
