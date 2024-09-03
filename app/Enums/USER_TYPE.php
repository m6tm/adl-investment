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
    const ADMIN = 'enum.USER_TYPE.ADMIN';
    const SUPER_ADMIN = 'enum.USER_TYPE.SUPER_ADMIN';
    const PLAYER = 'enum.USER_TYPE.PLAYER';
}
