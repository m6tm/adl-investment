<div class="border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark rounded-[10px] p-5">
	<h4>{{ __('settings.pays_autorise.title') }}</h4>
	<form action="{{ route('dashboard.settings.add-country') }}" method="POST">
		@csrf
		@if (auth()->user()->can('toggle.countries'))
			<div class="flex gap-3 mt-2">
				<input type="text" name="dial_code"
					class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
					placeholder="{{ __('settings.pays_autorise.placeholder') }}" list="countries-list" required>
				<datalist id="countries-list">
					@foreach ($data_countries as $country)
						<option value="{{ $country['dial_code'] }}">({{ $country['dial_code'] }}) {{ $country['name'] }}</option>
					@endforeach
				</datalist>
				<button class="px-4 py-2 mb-5 inline-block rounded-md bg-primary text-white" type="submit">
					Ajouter
				</button>
			</div>
			<div class="flex flex-col gap-3 mb-2">
				<div class="">
					<label for="devise">{{ __('ticket.devise') }}</label>
					<input type="text" name="devise" id="devise"
						class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						placeholder="$" list="devises" required>
					<datalist id="devises">
						@foreach ($devises as $devise)
							<option value="{{ $devise['code'] }}">{{ $devise['name'] }}</option>
						@endforeach
					</datalist>
				</div>
				<div class="">
					<label for="ticket-1">{{ __('ticket.label') }} $1</label>
					<input type="number" name="ticket_1" id="ticket-1"
						class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						placeholder="{{ __('ticket.label_price') }}" required>
				</div>
				<div class="">
					<label for="ticket-2">{{ __('ticket.label') }} $2</label>
					<input type="number" name="ticket_2" id="ticket-2"
						class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						placeholder="{{ __('ticket.label_price') }}" required>
				</div>
				<div class="">
					<label for="ticket-5">{{ __('ticket.label') }} $5</label>
					<input type="number" name="ticket_5" id="ticket-5"
						class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						placeholder="{{ __('ticket.label_price') }}" required>
				</div>
				<div class="">
					<label for="ticket-10">{{ __('ticket.label') }} $10</label>
					<input type="number" name="ticket_10" id="ticket-10"
						class="w-full h-10 rounded border border-stroke py-2 pl-4.5 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-slate-100 dark:bg-meta-4 dark:text-white dark:focus:border-primary"
						placeholder="{{ __('ticket.label_price') }}" required>
				</div>
			</div>
		@endif
	</form>
</div>
