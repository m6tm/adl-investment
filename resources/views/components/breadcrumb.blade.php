<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    @php
        $title = !empty($breadcrumb) ? end($breadcrumb) : ['title' => ''];
    @endphp
    <h2 class="text-title-md2 font-bold text-black dark:text-white">
        {{ $title['title'] }}
    </h2>

    <nav>
        <ol class="flex items-center gap-2">
            <li>
                <a class="font-medium" href="{{ route('dashboard') }}">{{ __('dashboard/backend.dashboard') }} /</a>
                @foreach ($breadcrumb as $bread)
                    @if ($bread != end($breadcrumb))
                        <a class="font-medium" href="{{ $bread['route'] }}">{{ $bread['title'] }} /</a>
                    @endif
                @endforeach
            </li>
            <li class="font-medium text-primary">{{ $title['title'] }}</li>
        </ol>
    </nav>
</div>