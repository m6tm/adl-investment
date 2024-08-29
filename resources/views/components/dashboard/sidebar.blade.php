<aside
  id="sidebar-aside"
	class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 side-bar-hidden">
	<!-- SIDEBAR HEADER -->
	<div class="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5 relative">
		<a href="{{ route('dashboard') }}">
			<img src="{{ asset('assets/img/Roue_AD-transparent.png') }}" class="w-29" alt="Logo" />
		</a>

		<button
      id="sidebar-toggler"
      class="lg:hidden text-white bg-black size-[40px] flex justify-center items-center rounded-full absolute right-[-3em] duration-300 ease-linear rotate-180">
			<svg class="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
					fill="" />
			</svg>
		</button>
	</div>
	<!-- SIDEBAR HEADER -->

	<div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
		<!-- Sidebar Menu -->
		<nav class="mt-5 px-4 py-4 lg:mt-9 lg:px-6" x-data="{ selected: $persist('Dashboard') }">
			<!-- Menu Group -->
			<div>
				<h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>

				<ul class="mb-6 flex flex-col gap-1.5">
					<!-- Menu Item Utilisateurs -->
					<li>
						<a
							class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
							href="{{ route('dashboard.user.list') }}">
							<i data-lucide="users-round" class="w-5"></i>
							Utilisateurs
						</a>
					</li>
					<!-- Menu Item Utilisateurs -->
					<!-- Menu Item Notifications -->
					<li>
						<a
							class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
							href="{{ route('dashboard.notifications') }}">
							<i data-lucide="messages-square" class="w-5"></i>
							Notifications
						</a>
					</li>
					<!-- Menu Item Notifications -->
					<!-- Menu Item Permissions -->
					<li>
						<a
							class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
							href="{{ route('dashboard.permissions') }}">
							<i data-lucide="handshake" class="w-5"></i>
							Permissions
						</a>
					</li>
					<!-- Menu Item Permissions -->
					<!-- Menu Item Roles -->
					<li>
						<a
							class="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
							href="{{ route('dashboard.roles') }}">
							<i data-lucide="key-square" class="w-5"></i>
							Roles
						</a>
					</li>
					<!-- Menu Item Roles -->
				</ul>
			</div>
		</nav>
		<!-- Sidebar Menu -->
	</div>
</aside>
