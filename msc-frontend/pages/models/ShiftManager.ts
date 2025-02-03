export interface ShiftManager {
    identity_card: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    shift_type: 'Día' | 'Noche';
    shift_group: 1 | 2 | 3 | 4;
    is_active: boolean;
}
