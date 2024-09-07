@role($USER_ROLE::PLAYER)
	<li class="relative flex items-center space-x-2">
        @if ($account_unverified)
            <span class="lg:block hidden">{{ __('header.verify_account') }}</span>
            <a
                class="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-orange-100 dark:bg-orange-100 hover:text-primary dark:border-strokedark dark:text-white"
                href="{{ route('dashboard.account-verification') }}" title="{{ __('header.verify_account') }}">
                <span class="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                    <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>

                <span data-lucide="shield-alert" class="text-slate-500 scale-[.90]"></span>
            </a>
        @endif
        @if ($account_pending_verification && $account_failled_verification)
            <span class="lg:block hidden">{{ __('header.verify_refused') }}</span>
            <a
                class="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-orange-100 dark:bg-orange-100 hover:text-primary dark:border-strokedark dark:text-white"
                href="{{ route('dashboard.account-verification') }}" title="{{ __('header.verify_refused') }}">
                <span class="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
                    <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>

                <span data-lucide="shield-alert" class="text-slate-500 scale-[.90]"></span>
            </a>
        @endif
        @if ($account_pending_verification && !$account_failled_verification)
            <span class="lg:block hidden">{{ __('header.verify_pending') }}</span>
            <a
                class="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-orange-100 dark:bg-orange-100 hover:text-primary dark:border-strokedark dark:text-white"
                href="javascript: void(0)" title="{{ __('header.verify_pending') }}">
                <span data-lucide="shield-alert" class="text-slate-500 scale-[.90]"></span>
            </a>
        @endif
        @if ($account_ready_verified)
            <span class="lg:block hidden">{{ __('header.verify_success') }}</span>
            <a
                class="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-green-100 dark:bg-green-100 hover:text-primary dark:border-strokedark dark:text-white"
                href="javascript: void(0)" title="{{ __('header.verify_pending') }}">
                <span data-lucide="shield-alert" class="text-green-500 scale-[.90]"></span>
            </a>
        @endif
	</li>
@endrole
