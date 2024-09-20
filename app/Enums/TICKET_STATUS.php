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
    const ACTIF = 'enum.TICKET_STATUS.ACTIF';
    const EXPIRE = 'enum.TICKET_STATUS.EXPIRE';
    const UTILISE = 'enum.TICKET_STATUS.UTILISE';
}
