<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static SUPER_ADMIN()
 * @method static static ADMIN()
 * @method static static PLAYER()
 */
final class USER_ROLE_DESCRIPTION extends Enum
{
    const SUPER_ADMIN = 'Super Administrator';
    const ADMIN = 'Administrator';
    const PLAYER = 'Player';
}