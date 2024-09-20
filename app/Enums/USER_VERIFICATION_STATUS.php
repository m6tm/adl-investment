<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static VERIFIED()
 * @method static static PENDING()
 * @method static static UNVERIFIED()
 */
final class USER_VERIFICATION_STATUS extends Enum
{
    const VERIFIED = 'enum.USER_VERIFICATION_STATUS.VERIFIED';
    const PENDING = 'enum.USER_VERIFICATION_STATUS.PENDING';
    const UNVERIFIED = 'enum.USER_VERIFICATION_STATUS.UNVERIFIED';
}
