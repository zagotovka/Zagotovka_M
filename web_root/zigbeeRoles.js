/*
 * Общие константы и хелперы для фильтрации Zigbee-слотов, которые можно
 * предлагать пользователю как цель "Device connection" (реальный актуатор).
 *
 * СИНХРОНИЗИРОВАНО с ZBEE_ROLE_* из Core/Inc/zagotovka.h и с логикой
 * StartOutputTask() (main.c): диспетчер явно отказывается слать ON/OFF
 * слотам с ролью SWITCH ("not actuator"), а SENSOR/TRIGGER физически
 * не могут быть целью такой команды.
 *
 * ВАЖНО: если номера ZBEE_ROLE_* поменяются в прошивке — поправьте их
 * и здесь, значения должны совпадать 1-в-1.
 */

export const ZBEE_ROLE_UNKNOWN = 0;
export const ZBEE_ROLE_ACTUATOR = 1;
export const ZBEE_ROLE_SENSOR = 2;
export const ZBEE_ROLE_TRIGGER = 3;
export const ZBEE_ROLE_MFR = 4;
export const ZBEE_ROLE_SWITCH = 5;

/* Роли, которые НЕЛЬЗЯ предлагать как цель "Device connection". */
const NON_ACTUATOR_ZBEE_ROLES = new Set([
  ZBEE_ROLE_SENSOR,
  ZBEE_ROLE_TRIGGER,
  ZBEE_ROLE_SWITCH
]);

/* topin физических/логических типов, которые всегда можно включать. */
const ACTUATOR_TOPINS = new Set([2, 3]);
const ZBEE_TOPIN = 11;

/**
 * true — если элемент из /api/select/get (или /api/security/get) можно
 * показывать пользователю как цель "Device connection".
 * @param {{topin?: number, role?: number}} pin
 */
export function isActuatorPinOption(pin) {
  if (!pin) return false;

  if (ACTUATOR_TOPINS.has(pin.topin)) return true;

  if (pin.topin === ZBEE_TOPIN) {
    // Пока backend ещё не присылает role (старый билд прошивки) — не прячем
    // пункт целиком, чтобы не ослепить пользователя молча.
    if (pin.role === undefined || pin.role === null) return true;
    return !NON_ACTUATOR_ZBEE_ROLES.has(pin.role);
  }

  return false;
}

/**
 * Фильтрует массив пинов, оставляя только валидные цели для
 * "Device connection": физические Relay/Switch + Zigbee-актуаторы.
 * @param {Array<object>} list
 * @returns {Array<object>}
 */
export function filterActuatorPinOptions(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(isActuatorPinOption);
}
