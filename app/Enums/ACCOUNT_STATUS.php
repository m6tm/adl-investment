<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ACTIF()
 * @method static static INACTIF()
 */
final class ACCOUNT_STATUS extends Enum
{
    const ACTIF = 'actif';
    const INACTIF = 'inactif';
}
