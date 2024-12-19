<li class="relative" x-data="{ dropdownOpen: false, notifying: true }" @click.outside="dropdownOpen = false">
    <div class="dropdown dropdown-end me-4">
        <div tabindex="0" role="button" class="p-3">
            <span data-lucide="languages"></span>
        </div>
        <ul tabindex="0" class="dropdown-content menu bg-white dark:bg-boxdark rounded-box z-[1] w-52 p-2 shadow">
            <li>
                <a href="{{ route('set.locale', 'fr') }}"><span class="fi fi-fr"></span> Français</a>
                <a href="{{ route('set.locale', 'en') }}"><span class="fi fi-us"></span> English</a>
            </li>
        </ul>
    </div>
</li>
