<form action="{{ route('dashboard.permissions.to.user', $permission->id) }}" method="post">
    @csrf
    <table class="table w-full table-auto" id="permissionToUser">
        <thead>
            <tr>
                <th>
                    <div class="flex items-center gap-1.5">
                        <p class="text-[16px]">ID</p>
                        <div class="inline-flex flex-col space-y-[2px]">
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0L0 5H10L5 0Z" fill="" />
                                </svg>
                            </span>
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </th>
                <th>
                    <div class="flex items-center gap-1.5">
                        <p class="text-[16px]">{{ __('permissions.permission_to_user.user_name') }}</p>
                        <div class="inline-flex flex-col space-y-[2px]">
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0L0 5H10L5 0Z" fill="" />
                                </svg>
                            </span>
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </th>
                <th>
                    <div class="flex items-center gap-1.5">
                        <p class="text-[16px]">{{ __('permissions.permission_to_user.email') }}</p>
                        <div class="inline-flex flex-col space-y-[2px]">
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0L0 5H10L5 0Z" fill="" />
                                </svg>
                            </span>
                            <span class="inline-block">
                                <svg class="fill-current" width="10" height="5" viewBox="0 0 10 5" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z" fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </th>
                <th>
                    <div class="flex items-center gap-1.5">
                        <p class="text-[16px]">{{ __('permissions.permission_to_user.actions') }}</p>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            @php
                $key = 1;
            @endphp
            @foreach ($users as $user)
                <tr class="h-[20px] odd:bg-white bg-slate-100 duration-300 hover:bg-slate-100 odd:dark:bg-slate-900 even:bg-slate-50 even:dark:bg-slate-800">
                    <td class="bg-transparent border-l-0 py-1 w-8">#{{ $key }}</td>
                    <td class="bg-transparent">{{ $user->first_name }}</td>
                    <td class="bg-transparent">{{ $user->email }}</td>
                    <td class="bg-transparent border-r-0 text-center space-x-3 w-30">
                        <input id="default-checkbox" type="checkbox" name="users[]" value="{{ $user->id }}" {{ $user->can($permission->name) ? 'checked' : '' }} class="w-4 h-4 text-blue-600 bg-slate-100 border-gray-300 cursor-pointer rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-700 dark:border-gray-600">
                    </td>
                </tr>
                @php
                    $key += 1;
                @endphp
            @endforeach
        </tbody>
    </table>
    <button
        type="submit"
        class="inline-flex items-center justify-center rounded-md bg-primary mt-4 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
        {{ __('permissions.permission_to_user.apply_changes') }}
    </button>
</form>