<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static SUPER_ADMIN()
 * @method static static ADMIN()
 * @method static static PLAYER()
 */
final class USER_ROLE extends Enum
{
    const SUPER_ADMIN = 'dashboard/backend.roles.super-admin';
    const ADMIN = 'dashboard/backend.roles.admin';
    const PLAYER = 'dashboard/backend.roles.player';
}
