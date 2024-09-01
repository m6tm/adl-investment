@php
	$title = __('profile.title');
	$breadcrumbs = [['title' => $title]];
@endphp

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"/>
<x-dashboard.layout :title="$title" :breadcrumbs="$breadcrumbs">
	<div class="flex flex-col gap-5 md:gap-7 2xl:gap-10">
		<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] pb-5">
			<x-error-message-alert class="mb-4 mx-4" />
			<div class="relative z-20 h-35 md:h-65">
				<img src="{{ asset('assets/img/cover-01.png') }}" class="rounded-tl-[10px] rounded-tr-[10px] h-full w-full"
					alt="profile cover" class="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
				<div class="absolute bottom-1 right-1 z-10 xsm:bottom-4 gap-3 xsm:right-4 flex items-center">
					<label for="cover"
						class="flex cursor-pointer items-center justify-center h-9 gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4">
						<input type="file" name="cover" id="cover" class="sr-only" />
						<span>
							<svg class="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
									fill="white" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
									fill="white" />
							</svg>
						</span>
						<span>{{ __('profile.edit') }}</span>
					</label>
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
						<label for="profile"
							class="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
							<svg class="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
									fill="" />
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
									fill="" />
							</svg>
							<input type="file" name="profile" id="profile" class="sr-only" />
						</label>
					</div>
				</div>
				<div class="mt-4">
					<h3 class="mb-1.5 text-2xl font-medium text-black dark:text-white">
						Danish Heilium
					</h3>
					<p class="font-medium">{{ __('enum.USER_TYPE.PLAYER') }}</p>
					<div class="flex">
						<div
							class="mx-auto mb-5.5 mt-4.5 grid grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
							<div
								class="flex flex-col items-start justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">15</span>
								<span class="text-sm">{{ __('profile.winned') }}</span>
							</div>
							<div
								class="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">$129K</span>
								<span class="text-sm">{{ __('profile.wallet') }}</span>
							</div>
							<div class="flex flex-col items-center justify-center gap-1 px-4 dark:border-strokedark xsm:flex-row">
								<span class="font-semibold text-black dark:text-white">$2K</span>
								<span class="text-sm">{{ __('profile.investment') }}</span>
							</div>
						</div>
					</div>

					<div class="mt-6.5">
					</div>
				</div>
			</div>
		</div>
	</div>
</x-dashboard.layout>
