<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static BONUS()
 * @method static static NORMAL()
 */
final class TICKET_TYPE extends Enum
{
    const BONUS = 'bonus';
    const NORMAL = 'normal';
}
