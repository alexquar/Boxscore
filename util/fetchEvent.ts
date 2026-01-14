import { SportsEvent } from "@/types/eventTypes";
export const fetchEvent = async (eventId: string): Promise<SportsEvent | null> => {
    console.log("Fetching event with ID:", eventId);
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/lookupevent.php?id=${eventId}`);
    const data = await response.json();
    console.log("Fetched event data:", data);
    return data.events ? data.events[0] : null;
}