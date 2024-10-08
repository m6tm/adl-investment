<link rel="stylesheet" href="{{ asset('assets/css/utils.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/partials/pricing.css') }}">

<section id="pricing" class="pricing section padding-vert">

	<!-- Section Title -->
	<div class="container section-title" data-aos="fade-up">
		<h2>{{ __('home.ticket_price.title') }}</h2>
	</div>

	<div class="w-full container mx-auto overflow-x-auto relative py-8">

		<div class="w-full h-auto">
			<table class="w-full table-ticket">

				<tr>
					<th class="w-1/4 h-52">
						<img src="{{ asset('assets/img/web/usa-1439858_640.jpg') }}" class="img-fluid rounded-4"
							alt="{{ __('home.ticket_price.usa_flag_alt') }}">
					</th>
					<th class="w-1/4 h-52 space-y-3 align-text-center pt-8 relative title-ticket">

						<h3 class="text-3xl text-gray-600 font-normal">{{ __('home.ticket_price.days') }}</h3>
						<p class="text-gray-400 text-center font-normal">{{ __('home.ticket_price.basic') }}</p>
						<div class="p-3 rounded border bg-[#ffffff] mx-auto w-64 transform translate-y-4">
							<p class="text-[70px] font-normal text-black">3 <sup
									class="text-[28px] font-normal">{{ __('home.ticket_price.days') }}</sup></p>
							<span class="uppercase text-black text-sm font-normal"></span>
						</div>

					</th>
					<th class="w-1/4 h-52 space-y-3 align-text-top pt-8 title-ticket-center">

						<h3 class="text-3xl text-white font-normal">{{ __('home.ticket_price.months') }}</h3>
						<p class="text-white text-center font-normal">{{ __('home.ticket_price.recommended') }}</p>
						<div class="p-3 rounded bg-[#ffffff] border border-cyan-400 mx-auto w-64 transform translate-y-4">
							<p class="text-[70px] font-normal text-black">30 <sup
									class="text-[28px] font-normal">{{ __('home.ticket_price.days') }}</sup></p>
							<span class="uppercase text-black text-sm font-normal"></span>
						</div>

					</th>
					<th class="w-1/4 h-52 space-y-3 align-text-top pt-8 title-ticket">

						<h3 class="text-3xl text-gray-600 font-normal">{{ __('home.ticket_price.week') }}</h3>
						<p class="text-gray-400 text-center font-normal">{{ __('home.ticket_price.popular') }}</p>
						<div class="p-3 rounded mx-auto border bg-[#ffffff] w-64 transform translate-y-4">
							<p class="text-[70px] font-normal text-black">7 <sup
									class="text-[28px] font-normal">{{ __('home.ticket_price.days') }}</sup></p>
							<span class="uppercase text-black text-sm font-normal"></span>
						</div>
					</th>
				</tr>

				<tbody>
					<tr>
						<td class=" w-64  bg-[#F5F5F5] p-4 h-16  ">
							<div class="w-full flex space-x-1 items-center">

								<p class="text-[40px] font-normal text-[#f10a0a]"><sup
										class="text-[18px] font-normal text-black">{{ __('home.ticket_price.ticket') }}</sup> $1</p>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ticket-element">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td class="w-64  bg-[#F5F5F5] p-4 h-16">
							<div class="w-full flex space-x-1 items-center">
								<p class="text-[40px] font-normal text-[#f10a0a]"><sup
										class="text-[18px] font-normal text-black">{{ __('home.ticket_price.ticket') }}</sup> $2</p>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ticket-element">
							<div class="flex justify-center text-white mx-auto">
								<ul class="list-none text-center">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td class=" w-64  bg-[#F5F5F5] p-4 h-16  ">
							<div class="w-full flex space-x-1 items-center">

								<p class="text-[40px] font-normal text-[#f10a0a]"><sup
										class="text-[18px] font-normal text-black">{{ __('home.ticket_price.ticket') }}</sup> $5</p>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ticket-element">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td class=" w-64 bg-[#F5F5F5] p-4 h-16">
							<div class="w-full flex space-x-1 items-center">
								<p class="text-[40px] font-normal text-[#f10a0a]"><sup
										class="text-[18px] font-normal text-black">{{ __('home.ticket_price.ticket') }}</sup> $10</p>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ticket-element">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ">
							<div class="flex justify-center text-white">
								<ul class="list-none">
									<li>{{ __('home.ticket_price.available') }}</li>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<th class="w-1/4 h-52"></th>
						<td class=" w-64  p-2 h-16">
							<div class="align-center justify-center text-white">
								<a href="#" class="btn btn-outline-danger block mx-auto">{{ __('home.ticket_price.start_now') }}</a>
							</div>
						</td>
						<td class=" w-64  p-2 h-16 ticket-element">
							<div class="align-center justify-center text-white">
								<a href="#" class="btn btn-outline-danger block mx-auto">{{ __('home.ticket_price.start_now') }}</a>
							</div>
						</td>
						<td class=" w-64  p-2 h-16">
							<div class="align-center justify-center text-white">
								<a href="#" class="btn btn-outline-danger block mx-auto">{{ __('home.ticket_price.start_now') }}</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>
