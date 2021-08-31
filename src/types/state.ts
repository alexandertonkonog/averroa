import { SexType, DoctorEntityType, ServiceEntityType, ScheduleDoctorType } from './entities';

export interface BreadType {
    name: string,
    link: string
}

export type StateType = {
    sex: SexType,
    script: 1 | 2 | null,
    bread: BreadType[],
    date: null | string,
    dateTime: null | string,
    service: null | ServiceEntityType,
    services: null | ServiceEntityType[],
    formData: any,
    resultState: any,
    code: null | string,
    schedule: any,
    doctor: null | DoctorEntityType,
    doctors: null | DoctorEntityType[],
    activeBlock: any,
    error: boolean | null,
    isDataLoaded: boolean
}

export type ReducerAction = {
    type: string,
    payload?: any
}

export type StateData = {
    services: ServiceEntityType[],
    doctors: DoctorEntityType[],
    schedule: ScheduleDoctorType[]
}

export type FormValues = {
    name: string | undefined,
    surname: string | undefined,
    code: string | undefined,
    number: string | undefined,
    confirm: boolean | undefined 
}