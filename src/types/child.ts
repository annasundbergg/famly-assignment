export type Child = {
    childId: string;
    name: {
        fullName: string;
    }
    checkedIn: boolean;
    pickupTime: string | null;
    image: {
        small: string
    };
}