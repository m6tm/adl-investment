<form action="{{ route('dashboard.permissions.create.update', $permission->id) }}" method="POST">
    @csrf
    <div class="grid grid-cols-1 gap-0">
        <label for="">Code de la permission (exemple: user.create.permission)</label>
        <input type="text"
            class="rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
            name="code" pattern="^[a-z]+(\.[a-z]+)*$" required placeholder="Permission code" value="{{ $permission->name }}" />
    </div>
    <div class="grid grid-cols-1 gap-0">
        <label for="">Description</label>
        <textarea
         class="rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
         name="description" required minlength="5" placeholder="Permission description" rows="4">{{ $permission->description }}</textarea>
    </div>
    <button
        type="submit"
        class="inline-flex items-center justify-center rounded-md bg-primary mt-4 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
        Enregistrer
    </button>
</form>