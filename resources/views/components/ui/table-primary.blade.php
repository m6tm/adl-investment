<div class="overflow-hidden">
	<div class="max-w-full overflow-x-auto">
		<div class="min-w-[1170px]">
			<!-- table header start -->
			<div class="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11 rounded-tl-[5px] rounded-tr-[5px]">
				@foreach  ($headers as $header)
					<div class="col-span-3">
						<h5 class="font-medium text-[#637381] dark:text-bodydark">{{ $header }}</h5>
					</div>
				@endforeach
			</div>
			<!-- table header end -->

			<!-- table body start -->
			<div class="bg-white dark:bg-boxdark border-x-[1px] border-b-[1px] border-stone-200 rounded-bl-[5px] rounded-br-[5px]">
				<!-- table row item -->
				@foreach ($rows as $row)
					<div class="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11">
						<div class="col-span-3">
							<p class="text-[#637381] dark:text-bodydark">{{ $row[0] }}</p>
						</div>

						<div class="col-span-3">
							<p class="text-[#637381] dark:text-bodydark">
								{{ $row[1] }}
							</p>
						</div>

						<div class="col-span-3">
							<p class="text-[#637381] dark:text-bodydark">
								{{ $row[2] }}
							</p>
						</div>

						<div class="col-span-2">
							<p class="text-[#637381] dark:text-bodydark">{{ $row[3] }}</p>
						</div>

						<div class="col-span-1">
							<a href="{{ route('user.edit', ['user_id' => 'JHgkjhKJHfkjhgJH']) }}" class="float-right text-primary">Edit</a>
						</div>
					</div>
				@endforeach
			</div>
			<!-- table body end -->
		</div>
	</div>
</div>
