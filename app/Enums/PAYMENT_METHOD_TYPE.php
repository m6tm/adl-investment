<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static CARD()
 * @method static static MOMO()
 * @method static static OM()
 */
final class PAYMENT_METHOD_TYPE extends Enum
{
    const CARD = 'enum.PAYMENT_METHOD_TYPE.CARD';
    const MOMO = 'enum.PAYMENT_METHOD_TYPE.MOMO';
    const OM = 'enum.PAYMENT_METHOD_TYPE.OM';
}
