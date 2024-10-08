<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
    <h4>{{ __('settings.pays_autorise.title') }}</h4>
    <form action="{{ route('dashboard.settings.add-country') }}" method="POST">
        @csrf
        @if (auth()->user()->can('toggle.countries'))
            <div class="flex gap-3 mt-2">
                <input
                    type="text"
                    name="dial_code"
                    class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    placeholder="{{ __('settings.pays_autorise.placeholder') }}"
                    list="countries-list">
                <datalist id="countries-list">
                    @foreach ($data_countries as $country)
                        <option 
                            value="{{ $country['dial_code'] }}">({{ $country['dial_code'] }}) {{ $country['name'] }}</option>
                    @endforeach
                </datalist>
                <button class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white" type="submit">
                    Ajouter
                </button>
            </div>
        @endif
    </form>
    <ul class="flex flex-col gap-1 max-h-[630px] overflow-y-auto">
        @foreach ($countries->reverse() as $country)
            <li class="hover:bg-slate-100 duration-300 ease-linear p-2 rounded-md flex justify-between items-center{{ !auth()->user()->can('toggle.countries') ? ' cursor-pointer' : '' }}">
                <span>({{ $country->dial_code }}) {{ $country->name }}</span>
                @if (auth()->user()->can('toggle.countries'))
                    <a href="{{ route('dashboard.settings.remove-country', ['country_id' => $country->id]) }}" class="rounded-full bg-danger text-white size-6 flex justify-center items-center" type="submit">
                        <span data-lucide="x" class="size-4"></span>
                    </a>
                @endif
            </li>
        @endforeach
    </ul>
</div>