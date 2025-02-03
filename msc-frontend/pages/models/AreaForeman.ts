export interface AreaForeman {
    identity_card: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    shift_group: 1 | 2 | 3 | 4;
    shift_manager: string;
    current_shift: "Día" | "Noche";
    is_active: boolean;
}
