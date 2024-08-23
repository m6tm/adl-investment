@switch($status)
    @case($DOCUMENT_STATUS::PENDING)
        <div data-tab-step class="w-[300px] h-[200px] mx-auto border-slate-200 border-[2px] cursor-pointer rounded-lg flex flex-col justify-center items-center">
            <div class="size-[50px] border-[2px] bg-blue-50 border-slate-300 rounded-full flex justify-center items-center">
                <span data-lucide="refresh-cw" class="text-blue-400"></span>
            </div>
            <small class="mt-2 text-slate-500">En cours de vérification</small>
            <span>{{ $document }}</span>
        </div>
    @break
    
    @case($DOCUMENT_STATUS::VERIFIED)
        <div data-tab-step class="w-[300px] h-[200px] mx-auto border-slate-200 border-[2px] cursor-pointer rounded-lg flex flex-col justify-center items-center">
            <div class="size-[50px] border-[2px] bg-green-50 border-slate-300 rounded-full flex justify-center items-center">
                <span data-lucide="badge-check" class="text-green-400"></span>
            </div>
            <small class="mt-2 text-slate-500">Vérifié avec succès</small>
            <span>{{ $document }}</span>
        </div>
    @break
    
    @case($DOCUMENT_STATUS::REFUSED)
        <div data-tab-step class="w-[300px] h-[200px] mx-auto border-slate-200 border-[2px] cursor-pointer rounded-lg flex flex-col justify-center items-center">
            <div class="size-[50px] border-[2px] bg-rose-50 border-slate-300 rounded-full flex justify-center items-center">
                <span data-lucide="circle-x" class="text-rose-400"></span>
            </div>
            <small class="mt-2 text-slate-500">Document refusé</small>
            <span>{{ $document }}</span>
        </div>
    @break
    
    @default
        <div data-tab-step class="w-[300px] h-[200px] mx-auto border-slate-200 border-[2px] cursor-pointer rounded-lg flex flex-col justify-center items-center">
            <div class="size-[50px] border-[2px] bg-orange-50 border-slate-300 rounded-full flex justify-center items-center">
                <span data-lucide="circle-dashed" class="text-orange-400"></span>
            </div>
            <small class="mt-2 text-slate-500">En attente de soumission</small>
            <span>{{ $document }}</span>
        </div>
        
@endswitch