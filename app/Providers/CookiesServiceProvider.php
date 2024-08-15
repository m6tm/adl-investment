<?php

namespace App\Providers;

use Whitecube\LaravelCookieConsent\Consent;
use Whitecube\LaravelCookieConsent\Facades\Cookies;
use Whitecube\LaravelCookieConsent\CookiesServiceProvider as ServiceProvider;

class CookiesServiceProvider extends ServiceProvider
{
    /**
     * Define the cookies users should be aware of.
     */
    protected function registerCookies(): void
    {
        // Register Laravel's base cookies under the "required" cookies section:
        Cookies::essentials()
            ->session()
            ->csrf();
    
        // Register custom cookies under the pre-existing "optional" category:
        Cookies::optional()
            ->name('dark mode')
            ->description('This cookie helps us remember your preferences regarding the interface\'s brightness.')
            ->duration(60  * 24 * 365 - (60 * 24 * 29))
            ->accepted(fn(Consent $consent, $darkmode) => $consent->cookie(value: $darkmode->getDefaultValue()));

        Cookies::optional()
            ->name('language')
            ->description('This cookie helps us remember your preferred language.')
            ->duration(60  * 24 * 365 - (60 * 24 * 29))
            ->accepted(fn(Consent $consent, $language) => $consent->cookie(value: $language->getDefaultValue()));
    }
}