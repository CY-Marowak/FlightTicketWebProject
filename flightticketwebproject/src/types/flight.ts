export interface FlightPrice {
    time: string
    price: number
}

//以下三個類似的type 之後統整
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

export interface TrackedFlight {
    id: number
    airline: string
    flight_number: string
    depart_time: string
    arrival_time: string
    price: number
    from: string
    to: string
}

export interface FlightResult {
    from: string
    to: string
    airline: string
    flight_number: string
    depart_time: string
    arrival_time: string
    price: number
}
