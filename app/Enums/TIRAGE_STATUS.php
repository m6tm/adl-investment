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
    const ENCOURS = 'enum.TIRAGE_STATUS.ENCOURS';
    const TERMINE = 'enum.TIRAGE_STATUS.TERMINE';
    const ATTENTE = 'enum.TIRAGE_STATUS.ATTENTE';
}
