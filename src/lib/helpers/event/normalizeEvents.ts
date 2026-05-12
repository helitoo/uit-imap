import { Event } from "@/lib/types/event";
import { Room } from "@/lib/types/room";
import { compareTwoStrings } from "@/lib/utils";

export function normalizeEvents(events: Event[], rooms: Room[]): Event[] {
  return events.map((event) => {
    let bestMatch = event.room_name;
    let bestScore = 0;

    // Find the room name with highest similarity score
    for (const room of rooms) {
      const score = compareTwoStrings(event.room_name, room.name);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = room.name;
      }
    }

    return {
      ...event,
      room_name: bestMatch,
    };
  });
}
