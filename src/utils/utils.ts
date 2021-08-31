import { StateType, BreadType } from './../types/state';
import { ServiceEntityType } from './../types/entities';
import { Location } from 'history';

interface DictType {
    [key: string]: string,
    open: string,
    specialists: string,
    services: string,
    date: string,
    personal: string
}

export class ServiceFormatter {

    private root: string;
    private static instance: ServiceFormatter;
    private readonly dict: DictType = {
        open: 'Выбор сценария',
        specialists: 'Выбор специалиста',
        services: 'Выбор группы',
        date: 'Выбор времени',
        personal: 'Личные данные'
    };

    constructor() {
        this.root = '00000000-0000-0000-0000-000000000000';
    }

    static getInstance(): ServiceFormatter {
        if (!ServiceFormatter.instance) {
            ServiceFormatter.instance = new ServiceFormatter();
        } 
        return ServiceFormatter.instance;
    }

    getBread(location: Location, state: StateType) {
        const pathname: string = location.pathname;
        const elems: string[] = pathname.split('/').slice(1);
        const resultElems: (string | BreadType)[] = [];
        elems.forEach(item => {
            if (item in this.dict) {
                resultElems.push(item);
            } else {
                if (state.services) {
                    const services = this.getServiceChain(item, state);
                    if (services) resultElems.push(...services);
                }
            }
        })
        return resultElems.map((item: string | BreadType) => {
            const elem: BreadType = {link: this.getFullLinkByName(item, location.pathname), name: ''};
            if (typeof item === 'object') {
                elem.name = item.name;
            } else if (item in this.dict) {
                elem.name = this.dict[item];
            } else {
                elem.name = 'Не найден'
            }

            return elem;
        })
    }

    getServiceChain(id: string, state: StateType): BreadType[] | null {
        if (!state.services) return null;
        const service: ServiceEntityType | undefined = state.services.find(item => item.id === id);
        if (service) {
            if (service.parent === this.root) {
                return [{name: service.name, link: id}];
            } else {
                const services: BreadType[] | null = this.getServiceChain(service.parent, state);
                const breadItem: BreadType = {name: service.name, link: id};
                if (services) {
                    return [...services, breadItem]
                } else {
                    return [breadItem];
                }
            }
        }
        return null;
    }

    getFullLinkByName(link: string | BreadType, pathname: string): string {

        const locLink: string = typeof link === 'object' ? link.link : link;
        const index = pathname.indexOf(locLink);
        if (index === -1) {
            const arr:string[] = pathname.split('/');
            arr[arr.length - 1] = locLink;
            return arr.join('/');
        }
        return pathname.slice(0, index + locLink.length)
    }

    getServicesByName(text: string, state: StateType): ServiceEntityType[] | null {
        if (text && text.length > 2 && state.services) {
            const lowerText = text.toLowerCase();
            const services: ServiceEntityType[] | null = state.services.filter(item => {
                const name = item.name.toLowerCase();
                return name.includes(lowerText);
            });
            return services.slice(0, 10);
        } 
        return null;
    }

    getSearchLink(id: string, state: StateType) :string | null {
        if (!state.services) return null;
        const service: ServiceEntityType = state.services.find(item => item.id === id);
        if (service) {
            if (service.parent === this.root) {
                return '/open/services';
            } else {
                const parent: ServiceEntityType = state.services.find(item => item.id === service.parent);
                if (parent) {
                    return '/open/services/' + parent.id;
                } else {
                    return '/open/services';
                }
            }
        } else {
            return null;
        }
    }

    getAllServices(services: ServiceEntityType[], id: string = '00000000-0000-0000-0000-000000000000') {
        const root: ServiceEntityType = services.find(item => item.parent === id);
        const filteredServices = services.filter(item => item.id !== root.id);
        const rootServices = services.filter(item => item.parent === root.id);
        if (rootServices.length === 1) {
            return this.getAllServices(filteredServices, rootServices[0].id);
        } else {
            this.root = id;
            return services;
        }
    }

    filterServices(state) {
        let changed = false;
        this.serviceLevels = [state.services];
        if (state.doctor) {
            changed = true;
            this.serviceLevels[0] = state.doctor.services.map(item => state.services.find(elem => elem.id === item)).filter(item => item);
        }
        if (state.sex) {
            changed = true;
            this.serviceLevels[0] = this.serviceLevels[0].filter(item => item.sex === state.sex);
        }
        if (changed && this.serviceLevels[0].length) {
            this.getParents(state);
        }
        return this.serviceLevels.flat();
    }

    getParents(state) {
        const next = this.serviceLevels.length;
        const current = next - 1;
        const isHighLevel = this.serviceLevels[current].every(item => item.parent === this.root);
        if (!isHighLevel) {
            this.serviceLevels[next] = [];
            this.serviceLevels[current].forEach(item => {
                const parent = state.services.find(elem => elem.id === item.parent);
                if (parent) {
                    const cond = !this.serviceLevels[next].some(elem => elem.id === parent.id);
                    if (cond) {
                        this.serviceLevels[next].push(parent);
                    }
                }
            })
            this.getParents(state);
        } 
    }

    getStageServices(params, state) {
        let services = this.filterServices(state);
        if (params && params.id) {
            services = services.filter(item => item.parent === params.id);
        } else {
            services = services.filter(item => item.parent === this.root);
        }
        if (state.activeBlock) {
            services = services.sort((a, b) => a.id === state.activeBlock ? -1 : 0);
        }
        return services;
    }
}

export class DateFormatter {
   
    static getMinutes(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return hours * 60 + minutes;
    }
    
    static getStandardDate(date: Date) :string {
        const days = DateFormatter.setZero(date.getDate());
        const month = DateFormatter.setZero(date.getMonth() + 1);
        return days + '.' + month; 
    }

    static getStandardTime(date: Date) :string {
        const hours = DateFormatter.setZero(date.getHours());
        const minutes = DateFormatter.setZero(date.getMinutes());
        return hours + ':' + minutes; 
    }

    static setZero (n) {
        return n < 10 ? '0' + n : n;
    }
    
    static getMonthsDays(date, doctor) {
        const localDate = new Date(date);
        const days = [];
        localDate.setDate(1);
        const dayOfWeek = localDate.getDay();
        const month = localDate.getMonth();
        const emptyDays = [];
        if (dayOfWeek !== 1) {
            if (dayOfWeek === 0) {
                for(let i = 0; i < 6; i++) {
                    emptyDays.push(null);
                }
            } else {
                for(let i = 1; i < dayOfWeek; i++) {
                    emptyDays.push(null);
                }
            }
        }
        while(localDate.getMonth() === month) {
            let day = {
                date: localDate.getTime(),
            };
            day = DateFormatter.getFreeDays(day, doctor.time);
            days.push(day);
            localDate.setDate(localDate.getDate() + 1);
        }
        return [...emptyDays, ...days];
    }

    static getFreeDays(day, time) {
        const date = new Date(day.date);
        // const iso = DateFormatter.getISODateOnly(date);
        const condition = time.some(item => {
            const now = new Date(item.time_start);
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && date.getDate() === now.getDate()
        });
        if (condition) {
            day.free = true;
        } else {
            day.free = false;
        }
        return day;
    }

    static getTimeElements(date, doctor, state) {
        const result = [];
        const localDate = new Date(date);
        const service = state.service || state.services.find(item => !item.isDirectory);
        
        const intervals = doctor.time.filter(item => {
            const intDate = new Date(item.time_start);
            return intDate.getMonth() === localDate.getMonth() && intDate.getDate() === localDate.getDate();
        });

        const durationDate = new Date(service.duration);
        const duration = DateFormatter.getMinutes(durationDate);

        if (!service.duration || !intervals) return null;

        intervals.forEach(item => {
            const start = new Date(item.time_start);
            const end = new Date(item.time_end);
            while(start < end) {
                const obj = {
                    date: start.getTime(),
                    start: DateFormatter.getStandardTime(start),
                }
                start.setMinutes(start.getMinutes() + duration);
                obj.end = DateFormatter.getStandardTime(start);
                if (start <= end) {
                    result.push(obj);
                }
            }
        })

        return result;
    }

    static getISODate(str: string): string {
        const date = new Date(str);
        return date.getFullYear()+'-'
        + DateFormatter.setZero(date.getMonth()+1)+'-'
        + DateFormatter.setZero(date.getDate())+'T'
        + DateFormatter.setZero(date.getHours())+':'
        + DateFormatter.setZero(date.getMinutes())+':'
        + DateFormatter.setZero(date.getSeconds());
    }

    static getISODateOnly(date) {
        return date.getFullYear()+'-'
        + DateFormatter.setZero(date.getMonth()+1)+'-'
        + DateFormatter.setZero(date.getDate())+'T00:00:00';
    }
}