export interface FoursquarePlace {
    fsq_place_id: string;
    name: string;
    website: string;
    tel: string;
    distance: number;
    location: {
        address?: string;
        country?: string;
        locality?: string;
        formatted_address?: string;
    };
}