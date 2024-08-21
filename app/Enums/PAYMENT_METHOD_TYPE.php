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
    const CARD = 'Payment Card';
    const MOMO = 'MTN MoMo';
    const OM = 'Orange Money';
}
