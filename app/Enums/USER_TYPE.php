<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ADMIN()
 * @method static static SUPER_ADMIN()
 * @method static static PLAYER()
 */
final class USER_TYPE extends Enum
{
    const ADMIN = 'admin';
    const SUPER_ADMIN = 'super admin';
    const PLAYER = 'player';
}
