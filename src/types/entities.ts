interface EntityType {
    id: string,
    name: string,
}

export type SexType = null | 'male' | 'female';

export interface DoctorEntityType extends EntityType {
    services: string[],
    img: string
}

export interface ServiceEntityType extends EntityType {
    parent: string,
    cost: string,
    duration: string,
    isDirectory: boolean,
    sex: SexType
}

export interface ServiceEntityType {
    date: string,
    time_start: string,
    time_end: string
}

export interface ScheduleDoctorType {
    doctor_id: string,
    doctor_name: string,
    clinic_id: string,
    time: ServiceEntityType[]
}