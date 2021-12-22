export class ServiceFormatter {
    constructor(state) {
        this.root = '00000000-0000-0000-0000-000000000000';
    }

    static getInstance(state = {}) {
        if (ServiceFormatter.instance) {
            return ServiceFormatter.instance;
        } else {
            ServiceFormatter.instance = new ServiceFormatter(state);
            return ServiceFormatter.instance;
        }
    }

    getBread(location, state) {
        const dict = {
            open: 'Выбор сценария',
            specialists: 'Выбор специалиста',
            services: 'Выбор группы',
            date: 'Выбор времени',
            personal: 'Личные данные'
        };
        const pathname = location.pathname;
        const elems = pathname.split('/').slice(1);
        const resultElems = [];
        elems.forEach(item => {
            if (item in dict) {
                resultElems.push(item);
            } else {
                if (state.services) {
                    const services = this.getServiceChain(item, state);
                    if (services) resultElems.push(...services);
                }
            }
        })

        return resultElems.map(item => {
            const elem = {link: this.getFullLinkByName(item, location.pathname)};
            
            if (item in dict) {
                elem.name = dict[item];
            } else if (typeof item === 'object') {
                elem.name = item.name;
            } else {
                elem.name = 'Не найден'
            }
            return elem;
        })
    }

    getServiceChain(id, state) {
        const service = state.services.find(item => item.id === id);
        if (service) {
            if (service.parent === this.root) {
                return [{name: service.name, link: id}];
            } else {
                const services = this.getServiceChain(service.parent, state);
                if (services) {
                    return [...services, {name: service.name, link: id}]
                } else {
                    return [{name: service.name, link: id}];
                }
            }
        }
        return null;
    }

    getFullLinkByName(link, pathname) {

        const locLink = typeof link === 'object' ? link.link : link;
        const index = pathname.indexOf(locLink);
        if (index === -1) {
            const arr = pathname.split('/');
            arr[arr.length - 1] = locLink;
            return arr.join('/');
        }
        return pathname.slice(0, index + locLink.length)
    }

    getServicesByName(text, state) {
        if (text && text.length > 2) {
            const lowerText = text.toLowerCase();
            const services = state.services.filter(item => {
                const name = item.name.toLowerCase();
                return name.includes(lowerText);
            });
            return services.slice(0, 10);
        } 
    }

    getSearchLink(id, state) {
        const service = state.services.find(item => item.id === id);
        if (service) {
            if (service.parent === this.root) {
                return '/open/services';
            } else {
                const parent = state.services.find(item => item.id === service.parent);
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

    getAllServices(services, id = '00000000-0000-0000-0000-000000000000') {
        const root = services.filter(item => item.parent === id).map(item => item.id);
        if (root.length === 1) {
            const filteredServices = services.filter(item => !root.includes(item.id));
            return this.getAllServices(filteredServices, root[0]);
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
            this.serviceLevels[0] = [];
            state.doctor.services.forEach(item => {
                const service = state.services.find(elem => elem.id === item);
                if (service) {
                    this.serviceLevels[0].push(service);
                }
            })
        }
        if (changed && this.serviceLevels[0].length) {
            this.getParents(state);
        }
        let response = this.serviceLevels.flat();
        response = Array.from(new Set(response));
        return response;
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
                    this.serviceLevels[next].push(parent);
                }
            })
            this.getParents(state);
        } 
    }

    serviceSort(a, b) {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (a.isDirectory && b.isDirectory) return 0;
        if (!a.isDirectory && b.isDirectory) return 1;
        const nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    }

    getStageServices(params, state) {
        let services = this.filterServices(state);
        if (params && params.id) {
            services = services.filter(item => item.parent === params.id).sort(this.serviceSort);
        } else {
            services = services.filter(item => item.parent === this.root).sort(this.serviceSort);
        }
        if (state.activeBlock) {
            services = services.sort((a, b) => a.id === state.activeBlock ? -1 : 0);
        }
        return services;
    }
}

export class DateFormatter {
    /**
     * 
     * @param {Date} date 
     * @returns {Number} minutes
     */
    static getMinutes(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return hours * 60 + minutes;
    }
    /**
     * 
     * @param {Date} date 
     * @returns {String} date in format "day.month"
     */
    static getStandardDate(date) {
        const days = DateFormatter.setZero(date.getDate());
        const month = DateFormatter.setZero(date.getMonth() + 1);
        return days + '.' + month; 
    }

    static getStandardTime(date) {
        const hours = DateFormatter.setZero(date.getHours());
        const minutes = DateFormatter.setZero(date.getMinutes());
        return hours + ':' + minutes; 
    }

    static setZero (n) {
        return n < 10 ? '0' + n : n;
    }
    /**
     * 
     * @param {Date} date 
     * @param {Object} doctor  
     * @returns {String} date in format "day.month"
     */
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

    static getISODate(str) {
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

export const reachGoal = (goal) => {
    // const ym = ym || window.ym
    // const yaCounter16687801 = yaCounter16687801 || window.yaCounter16687801;
    // if (yaCounter16687801) {
    //     try {
    //         // ym(16687801, 'reachGoal', goal);
    //         yaCounter16687801.reachGoal(goal);
    //     } catch (e) {
    //         console.error('Невозможно зафиксировать цель под идентификатором ' + goal + '. Ошибка соединения')
    //     }
    // } else {
    //     console.warn('Невозможно зафиксировать цель под идентификатором ' + goal + '. Скрипт метрики не успел загрузиться');
    // }
}

export const liftToError = (errors) => {
    let scrollElem = null;

    const entries = Object.entries(errors);
    const win = document.querySelector('.bit_widget');
    const winScroll = win.scrollTop;
    console.log(entries)
    if (entries.length === 4 || (entries.length === 3 && !entries.find(item => item[0] === 'confirm'))) {
        scrollElem = document.querySelector('.bit_widget .bit_form');
    } else {
        const firstErrorInput = entries.find(item => item[1]);
        const inputContainers = document.querySelectorAll(`.bit_widget .bit_input-container`);
        inputContainers.forEach(item => {
            const input = item.querySelector(`.bit_input[name=${firstErrorInput[0]}]`);
            if (input) {
                scrollElem = item;
            }
        })
    }
    if (scrollElem && winScroll > scrollElem.offsetTop) {
        win.scrollTo(0, scrollElem.offsetTop - 30)
    }
}
