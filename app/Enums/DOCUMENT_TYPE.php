<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static CNI()
 * @method static static PASSPORT()
 * @method static static PERMIS_CONDUIRE()
 * @method static static PREUVE_RESIDENCE()
 */
final class DOCUMENT_TYPE extends Enum
{
    const CNI = 'enum.DOCUMENT_TYPE.CNI';
    const PASSPORT = 'enum.DOCUMENT_TYPE.PASSPORT';
    const PERMIS_CONDUIRE = 'enum.DOCUMENT_TYPE.PERMIS_CONDUIRE';
    const PREUVE_RESIDENCE = 'enum.DOCUMENT_TYPE.PREUVE_RESIDENCE';
}
