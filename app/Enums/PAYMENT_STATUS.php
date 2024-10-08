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
    const SUCCESS = 'enum.PAYMENT_STATUS.SUCCESS';
    const FAILED = 'enum.PAYMENT_STATUS.FAILED';
    const PENDING = 'enum.PAYMENT_STATUS.PENDING';
}
