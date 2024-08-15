<?php

namespace App\Http\Middleware;

use App\Enums\APP_LANGUAGE;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Spatie\Url\Url;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Cookie;

class LanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Récupérer la langue de l'utilisateur à partir de la requête
        $locale = app()->getLocale();
        if (!in_array($locale, APP_LANGUAGE::getValues())) $locale = APP_LANGUAGE::EN;
        $url_query = Url::fromString(request()->url());
        $port = $url_query->getPort();
        $is_localhost = $url_query->getHost() === 'localhost';
        $language = $url_query->getSegment(1);
        $path_url = $url_query->getPath();
        $path_url = $path_url === '/' ? '' : $path_url;
        $path_start_with_locale = static::startWith($path_url);

        if (!$path_start_with_locale) {
            App::setLocale(APP_LANGUAGE::EN);
            $locale = APP_LANGUAGE::EN;
            $new_url = $url_query->getScheme() . '://' . $url_query->getHost() . ($is_localhost ? ":$port" : '') . "/$locale" . $path_url;
            return redirect()->to($new_url);
        } else {
            App::setLocale($language);
        }

        return $next($request);
    }

    public static function startWith(string $haystack) {
        $existe = array_filter(APP_LANGUAGE::getValues(), fn($lang) => str_starts_with($haystack, "/$lang"));
        return !empty($existe);
    }
}
