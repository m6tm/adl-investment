<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static VERIFIED()
 * @method static static REFUSED()
 * @method static static PENDING()
 */
final class DOCUMENT_STATUS extends Enum
{
    const VERIFIED = 'enum.DOCUMENT_STATUS.VERIFIED';
    const REFUSED = 'enum.DOCUMENT_STATUS.REFUSED';
    const PENDING = 'enum.DOCUMENT_STATUS.PENDING';
}
