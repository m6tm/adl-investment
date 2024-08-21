<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ACTIF()
 * @method static static EXPIRE()
 * @method static static UTILISE()
 */
final class TICKET_STATUS extends Enum
{
    const ACTIF = 'actif';
    const EXPIRE = 'expiré';
    const UTILISE = 'utilisé';
}
