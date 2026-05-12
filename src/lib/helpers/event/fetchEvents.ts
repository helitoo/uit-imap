import type { Event } from "@/lib/types/event";
import { parseTabTable } from "@/lib/helpers/event/parseTabTable";

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch("/api/uit/lichphong");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch event: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const events: Event[] = [];

  // Each building tab has id like "tab_A", "tab_B", "tab_C", …
  doc.querySelectorAll<HTMLElement>('[id^="tab_"]').forEach((tab) => {
    const tabId = tab.getAttribute("id") ?? "";
    const buildingId = tabId.replace("tab_", "");
    const table = tab.querySelector("table");
    if (table) events.push(...parseTabTable(table, buildingId));
  });

  return events;
}
