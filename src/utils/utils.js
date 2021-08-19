export class ServiceFormatter {
    constructor(state) {
        this.root = '00000000-0000-0000-0000-000000000000';
        this.services = this.getAllServices(state.data.services);
        this.doctors = state.data.doctors;
        this.tree = [];
    }

    static getInstance(state = {}) {
        if (ServiceFormatter.instance) {
            return ServiceFormatter.instance;
        } else {
            ServiceFormatter.instance = new ServiceFormatter(state);
            return ServiceFormatter.instance;
        }
    }

    createTree(services = this.services, root = this.root, container = this.tree) {
        for (let i = 0; i < services.length; i++) {
            const item = services[i];
            if (item.parent === root) {
                container.push(item);
                if (item.isDirectory) {
                    item.children = [];
                    this.createTree(services, item.id, item.children);
                }
            }
        }       
    }

    getTree(options = null) {
        this.tree = [];
        this.filterTree(options);
        return this.tree;
    }

    filterTree(options) {
        let doctor, services = this.services;
        if (options.doctor) {
            doctor = options.doctor;
            services = this.services.filter(item => !item.idDirectory && doctor.services.includes(item.id));
        } 
        if (options.sex) {
            services = this.services.filter(item => item.sex === options.sex);
        }
        if (services.length !== this.services.length) {
            this.filterArray = this.services.filter(item => item.isDirectory);
            this.filterArray.push(...services);
            this.tree = [];
            this.createTree(this.filterArray);
            this.clearEmptyBranches(this.tree);
            this.tree = this.tree.filter(item => item && item.children.length)
        } else {
            this.filterArray = services;
            this.createTree(this.filterArray);
        }        
    }

    clearEmptyBranches(items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.isDirectory) {
                if (!item.children.length) {
                    delete items[i];
                } else {
                    this.clearEmptyBranches(item.children)
                }
                if (items[i]) {
                    items[i].children = items[i].children.filter(elem => elem);
                }
            }
        }
    }

    getAllServices(services, id = this.root) {
        const root = services.find(item => item.parent === id);
        const filteredServices = services.filter(item => item.id !== root.id);
        const rootServices = services.filter(item => item.parent === root.id);
        if (rootServices.length === 1) {
            return this.getAllServices(filteredServices, rootServices[0].id);
        } else {
            this.root = id;
            return services;
        }
    }

    getServicesByName(text) {
        if (text && text.length > 2) {
            const lowerText = text.toLowerCase();
            const services = this.services.filter(item => {
                const name = item.name.toLowerCase();
                return name.includes(lowerText);
            });
            return services.slice(0, 10);
        } 
    }

    getPagesById(elem) {
        this.filterArray = this.services;      
        const parents = this.getParents(elem);
        const elements = [...parents, elem];
        const pages = [this.tree];
        elements.forEach(item => {
            if (item.isDirectory) {
                pages.push(item.children);
            }
        })
        pages[pages.length - 1] = pages[pages.length - 1].sort(item => item.id === elem.id ? -1 : 0);
        return [elements, pages];
    }

    getParents(elem) {
        if (elem.parent === this.root) {
            return [];
        } else {
            const parent = this.services.find(item => item.id === elem.parent);
            return [...this.getParents(parent), parent];
        }
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

    static getTimeElements(date, doctor, formState) {
        const result = [];
        const localDate = new Date(date);
        const doctorForm = formState.doctor;
        const service = formState.service;
        const interval = doctor.time.find(item => {
            const intDate = new Date(item.time_start);
            return intDate.getMonth() === localDate.getMonth() && intDate.getDate() === localDate.getDate();
        });
        const durationDate = new Date(service.duration);
        const duration = DateFormatter.getMinutes(durationDate);
        const start = new Date(interval.time_start);
        const end = new Date(interval.time_end);
        while(start < end) {
            const obj = {
                date: start.getTime(),
                visible: DateFormatter.getStandardTime(start)
            }
            start.setMinutes(start.getMinutes() + duration);
            result.push(obj);
        }
        return result;
    }

    static getISODate(str) {
        const date = new Date(str);
        return date.getFullYear()+'-'
        + DateFormatter.setZero(date.getMonth()+1)+'-'
        + DateFormatter.setZero(date.getDate())+'T'
        + DateFormatter.setZero(date.getHours())+':'
        + DateFormatter.setZero(date.getMinutes())+':'
        + DateFormatter.setZero(date.getSeconds())+'Z'
    }

    static getISODateOnly(date) {
        return date.getFullYear()+'-'
        + DateFormatter.setZero(date.getMonth()+1)+'-'
        + DateFormatter.setZero(date.getDate())+'T00:00:00'
    }
}