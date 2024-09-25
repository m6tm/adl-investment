<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static PERSONAL()
 * @method static static GROUP()
 */
final class DISCUSSION_TYPE extends Enum
{
    const PERSONAL = 'personal';
    const GROUP = 'group';
}
