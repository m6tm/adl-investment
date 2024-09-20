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

@if (session('error'))
    <div {{ $attributes->merge(['class' => $className . ' ' . $class]) }} role="alert">
        <strong class="font-bold">Oops!</strong>
        <span class="block sm:inline">{{ session('error') }}</span>
    </div>
@endif

@if (session('success'))
    <div {{ $attributes->merge(['class' => $className . ' ' . $class, 'style' => 'background-color: #d4edda; color: #155724;']) }} role="alert">
        <strong class="font-bold">Succès!</strong>
        <span class="block sm:inline">{{ session('success') }}</span>
    </div>
@endif

@if (session('info'))
    <div {{ $attributes->merge(['class' => $className . ' ' . $class, 'style' => 'background-color: #d1ecf1; color: #0c5460;']) }} role="alert">
        <strong class="font-bold">Information!</strong>
        <span class="block sm:inline">{{ session('info') }}</span>
    </div>
@endif

@if (session('warning'))
    <div {{ $attributes->merge(['class' => $className . ' ' . $class, 'style' => 'background-color: #fff3cd; color: #856404;']) }} role="alert">
        <strong class="font-bold">Attention!</strong>
        <span class="block sm:inline">{{ session('warning') }}</span>
    </div>
@endif
