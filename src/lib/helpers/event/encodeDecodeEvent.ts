import type { Event } from "@/lib/types/event";

/** ASCII control chars — không xuất hiện trong văn bản thông thường */
const FIELD_SEP = "\x1F"; // Unit Separator (US) — ngăn cách các field
const RECORD_SEP = "\x1E"; // Record Separator (RS) — ngăn cách các event

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

// ─── Single Event ─────────────────────────────────────────────────────────

/**
 * Encode một Event thành chuỗi compact.
 *
 * Format: <start_s>␟<end_s>␟<building_id>␟<room_name>␟<capacity>␟<members>␟<title>␟<desc>
 * Số nguyên dùng base-36, timestamp tính theo giây.
 */
export function event2String(event: Event): string {
  if (!(event.start instanceof Date) || isNaN(event.start.getTime()))
    throw new TypeError('Field "start" is not a valid Date');
  if (!(event.end instanceof Date) || isNaN(event.end.getTime()))
    throw new TypeError('Field "end" is not a valid Date');

  validateString(event.building_id, "building_id");
  validateString(event.room_name, "room_name");
  validateString(event.event_title, "event_title");
  validateString(event.event_description, "event_description");

  return [
    toBase36(Math.floor(event.start.getTime() / 1000)),
    toBase36(Math.floor(event.end.getTime() / 1000)),
    event.building_id,
    event.room_name,
    toBase36(event.capacity),
    toBase36(event.number_of_members),
    event.event_title,
    event.event_description,
  ].join(FIELD_SEP);
}

/** Decode chuỗi compact thành Event */
export function string2Event(encode: string): Event {
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

/** Encode danh sách Event thành một chuỗi duy nhất. */
export function events2String(events: Event[]): string {
  if (!Array.isArray(events)) throw new TypeError("Input must be an array");
  return events
    .map((s, i) => {
      try {
        return event2String(s);
      } catch (err) {
        throw new Error(`Event at index ${i}: ${(err as Error).message}`);
      }
    })
    .join(RECORD_SEP);
}

/** Decode chuỗi thành danh sách Event. */
export function string2Events(encode: string): Event[] {
  if (typeof encode !== "string") throw new TypeError("Input must be a string");
  if (encode.length === 0) return [];

  return encode.split(RECORD_SEP).map((chunk, i) => {
    try {
      return string2Event(chunk);
    } catch (err) {
      throw new Error(`Record at index ${i}: ${(err as Error).message}`);
    }
  });
}
