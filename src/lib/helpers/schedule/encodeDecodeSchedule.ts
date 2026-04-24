import { Schedule } from "@/lib/types/schedule";

/** ASCII control chars — không xuất hiện trong văn bản thông thường */
const FIELD_SEP = "\x1F"; // Unit Separator (US) — ngăn cách các field
const RECORD_SEP = "\x1E"; // Record Separator (RS) — ngăn cách các schedule

const FIELD_COUNT = 8;

// ─── Helpers ────────────────────────────────────────────────────────────────

function toBase36(n: number): string {
  if (!Number.isInteger(n) || n < 0)
    throw new RangeError(`Expected non-negative integer, got: ${n}`);
  return n.toString(36);
}

function fromBase36(s: string, fieldName: string): number {
  const n = parseInt(s, 36);
  if (isNaN(n))
    throw new SyntaxError(`Invalid base-36 value for "${fieldName}": "${s}"`);
  return n;
}

function validateString(value: string, fieldName: string): void {
  if (value.includes(FIELD_SEP) || value.includes(RECORD_SEP))
    throw new RangeError(
      `Field "${fieldName}" contains reserved separator character`,
    );
}

// ─── Single Schedule ─────────────────────────────────────────────────────────

/**
 * Encode một Schedule thành chuỗi compact.
 *
 * Format: <start_s>␟<end_s>␟<building_id>␟<room_name>␟<capacity>␟<members>␟<title>␟<desc>
 * Số nguyên dùng base-36, timestamp tính theo giây.
 */
export function scheduleToString(schedule: Schedule): string {
  if (!(schedule.start instanceof Date) || isNaN(schedule.start.getTime()))
    throw new TypeError('Field "start" is not a valid Date');
  if (!(schedule.end instanceof Date) || isNaN(schedule.end.getTime()))
    throw new TypeError('Field "end" is not a valid Date');

  validateString(schedule.building_id, "building_id");
  validateString(schedule.room_name, "room_name");
  validateString(schedule.event_title, "event_title");
  validateString(schedule.event_description, "event_description");

  return [
    toBase36(Math.floor(schedule.start.getTime() / 1000)),
    toBase36(Math.floor(schedule.end.getTime() / 1000)),
    schedule.building_id,
    schedule.room_name,
    toBase36(schedule.capacity),
    toBase36(schedule.number_of_members),
    schedule.event_title,
    schedule.event_description,
  ].join(FIELD_SEP);
}

/** Decode chuỗi compact thành Schedule */
export function stringToSchedule(encode: string): Schedule {
  if (typeof encode !== "string" || encode.length === 0)
    throw new TypeError("Input must be a non-empty string");

  const parts = encode.split(FIELD_SEP);
  if (parts.length !== FIELD_COUNT)
    throw new SyntaxError(
      `Expected ${FIELD_COUNT} fields, got ${parts.length}`,
    );

  const [
    startStr,
    endStr,
    building_id,
    room_name,
    capacityStr,
    membersStr,
    event_title,
    event_description,
  ] = parts;

  const startSec = fromBase36(startStr, "start");
  const endSec = fromBase36(endStr, "end");
  const capacity = fromBase36(capacityStr, "capacity");
  const number_of_members = fromBase36(membersStr, "number_of_members");

  const start = new Date(startSec * 1000);
  const end = new Date(endSec * 1000);

  if (end < start)
    throw new RangeError(
      `"end" (${end.toISOString()}) is before "start" (${start.toISOString()})`,
    );

  return {
    start,
    end,
    building_id,
    room_name,
    capacity,
    number_of_members,
    event_title,
    event_description,
  };
}

// ─── Multiple Schedules ───────────────────────────────────────────────────────

/** Encode danh sách Schedule thành một chuỗi duy nhất. */
export function schedulesToString(schedules: Schedule[]): string {
  if (!Array.isArray(schedules)) throw new TypeError("Input must be an array");
  return schedules
    .map((s, i) => {
      try {
        return scheduleToString(s);
      } catch (err) {
        throw new Error(`Schedule at index ${i}: ${(err as Error).message}`);
      }
    })
    .join(RECORD_SEP);
}

/** Decode chuỗi thành danh sách Schedule. */
export function stringToSchedules(encode: string): Schedule[] {
  if (typeof encode !== "string") throw new TypeError("Input must be a string");
  if (encode.length === 0) return [];

  return encode.split(RECORD_SEP).map((chunk, i) => {
    try {
      return stringToSchedule(chunk);
    } catch (err) {
      throw new Error(`Record at index ${i}: ${(err as Error).message}`);
    }
  });
}
