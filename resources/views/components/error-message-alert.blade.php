@if ($errors->any())
	<div {{ $attributes->merge(['class' => $className . ' ' . $class]) }} role="alert">
		<strong class="font-bold">Oops!</strong>
		<span class="block sm:inline">Veuillez corriger les erreurs suivantes :</span>
		<ul class="list-disc list-inside">
			@foreach ($errors->all() as $error)
				<li>{{ $error }}</li>
			@endforeach
		</ul>
	</div>
@endif