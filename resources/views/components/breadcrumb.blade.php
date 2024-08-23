<div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    @php
        $title = !empty($breadcrumbs) ? end($breadcrumbs) : '';
    @endphp
    <h2 class="text-title-md2 font-bold text-black dark:text-white">
        {{ $title['title'] }}
    </h2>

    <nav>
        <ol class="flex items-center gap-2">
            <li>
                <a class="font-medium" href="{{ route('dashboard') }}">Dashboard /</a>
                @foreach ($breadcrumbs as $breadcrumb)
                    @if ($breadcrumb != end($breadcrumbs))
                        <a class="font-medium" href="{{ $breadcrumb['route'] }}">{{ $breadcrumb['title'] }} /</a>
                    @endif
                @endforeach
            </li>
            <li class="font-medium text-primary">{{ $title['title'] }}</li>
        </ol>
    </nav>
</div>