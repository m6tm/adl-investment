<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static VERIFIED()
 * @method static static UNVERIFIED()
 * @method static static PENDING()
 */
final class DOCUMENT_STATUS extends Enum
{
    const VERIFIED = 'vérifié';
    const REFUSED = 'rejeté';
    const PENDING = 'en cous';
}
