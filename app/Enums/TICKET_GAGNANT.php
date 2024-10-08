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
    const GAGNANT = 'enum.TICKET_GAGNANT.GAGNANT';
    const PERDANT = 'enum.TICKET_GAGNANT.PERDANT';
    const NON_DEFINI = 'enum.TICKET_GAGNANT.NON_DEFINI';
}
