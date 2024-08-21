<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static GAGNANT()
 * @method static static PERDANT()
 * @method static static NON_DEFINI()
 */
final class TICKET_GAGNANT extends Enum
{
    const GAGNANT = 'gagnant';
    const PERDANT = 'perdant';
    const NON_DEFINI = 'non défini';
}
