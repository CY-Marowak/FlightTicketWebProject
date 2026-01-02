export interface Flight {
    id: number
    airline: string
    flight_number: string
    depart_time: string
    arrival_time: string
    price: number
    from: string
    to: string
}

export interface FlightPrice {
    time: string
    price: number
}
