<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ENCOURS()
 * @method static static TERMINE()
 * @method static static ATTENTE()
 */
final class TIRAGE_STATUS extends Enum
{
    const ENCOURS = 'encours';
    const TERMINE = 'terminé';
    const ATTENTE = 'attente';
}
