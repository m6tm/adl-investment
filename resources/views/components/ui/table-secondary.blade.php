<div class="max-w-full overflow-x-auto">
	<div class="min-w-[1170px]">
		<!-- table header start -->
		<div class="grid grid-cols-12 rounded-t-[10px] bg-primary px-5 py-4 lg:px-7.5 2xl:px-11">
			@foreach  ($headers as $header)
				<div class="col-span-3">
					<h5 class="font-medium text-white">{{ $header }}</h5>
				</div>
			@endforeach
		</div>
		<!-- table header end -->

		<!-- table body start -->
		<div class="bg-white dark:bg-boxdark">
			<!-- table row item -->
			@foreach ($rows as $row)
				<div class="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11">
					<div class="col-span-3">
						<p class="text-[#637381] dark:text-bodydark">Musharof Chowdhury</p>
					</div>

					<div class="col-span-3">
						<p class="text-[#637381] dark:text-bodydark">
							Multidisciplinary Web Entrepreneur
						</p>
					</div>

					<div class="col-span-3">
						<p class="text-[#637381] dark:text-bodydark">
							musharof@example.com
						</p>
					</div>

					<div class="col-span-2">
						<p class="text-[#637381] dark:text-bodydark">Owner</p>
					</div>

					<div class="col-span-1">
						<button class="float-right text-primary">Edit</button>
					</div>
				</div>
			@endforeach
		</div>
		<!-- table body end -->
	</div>
</div>
