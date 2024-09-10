export const formatPickupTime = (timeString: string | null) => {
    const safeTimeString = timeString || "00:00:00Z";
    const date = new Date(safeTimeString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};