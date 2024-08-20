<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static SUCCESS()
 * @method static static FAILED()
 * @method static static PENDING()
 */
final class PAYMENT_STATUS extends Enum
{
    const SUCCESS = 'réussi';
    const FAILED = 'echoué';
    const PENDING = 'en cours';
}
