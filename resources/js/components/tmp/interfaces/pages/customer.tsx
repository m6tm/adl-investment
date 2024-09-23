

export interface Customer {
        id: number
        companie_id: number
        first_name: string
        last_name: string
        adress_street: string
        email: string
        adress_place: string
        phone: string
        postal_code: string
        created_at: string
        updated_at: string
}

export interface CustomerResponse {
        code: number
        response: {
                message: string
                customers: Array<Customer>
        }
}