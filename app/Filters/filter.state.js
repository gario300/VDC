import moment from "moment";
import DateTime from './../DateTime/date_time';

class FilterState {
    constructor() {
        this.dateTime = new DateTime();
        this.init();
    }
    
    init() {
        this.filter = {
            category: [],
            type: [],
            date: '',
            startDate: this.dateTime.newDateNowObj(),
            endDate: this.dateTime.newDateNowObj(),
            selectedDate: false
        };
        this.searchTerm = '',
        this.filterFromMenu = {
            term: '',
            isActive: false,
        }
    }

    setFilter(obj) {
        this.filter = obj;
    }

    resetFilter() {
        this.filter = {
            category: [],
            type: [],
            date: '',
            startDate: this.dateTime.newDateNowObj(),
            endDate: this.dateTime.newDateNowObj(), 
            selectedDate: false
        };
    }

    resetFilterFromMenu() {
        this.filterFromMenu = {
            term: '',
            isActive: false,
        }
    }

    getFilter() {
        return this.filter;
    }

    get searchFilter() {

        const categories = JSON.stringify(this.filter.category);
        const catParam = this.filter.category.length > 0 ? `categories=${categories}` : ''
        let dateParam = "";
        if (this.filter.selectedDate) {
            const startDateVal = new Date(this.filter.startDate.text);
            const endDateVal = new Date(this.filter.endDate.text);
            //const now = new Date(date);
            const startDateIso = (startDateVal).toISOString();
            const endDateIso = (endDateVal).toISOString();
            dateParam = `&startDate=${startDateIso}&endDate=${endDateIso}`;
            //dateParam = typeof date !== 'string' ? `&dateStart=${localISOTime}` : '';
        }
        const types = JSON.stringify(this.filter.type.map(element => this.parseType(element)))
        const typeParam = this.filter.type.length > 0 ? `&types=${types}` : '';
        return `?${catParam}${dateParam}${typeParam}`;
    }

    parseType(type) {
        switch (type) {
            case 'video': return 1
            case 'audio': return 2
            case 'article': return 3
        }
    }

    setFilterDate = (startD, endD) => {

        const dateStart = this.dateTime.newDate( startD );
        const dateEnd = this.dateTime.newDate( endD );

        const startDate = this.dateTime.newDateNowObj(dateStart);
        const endDate = this.dateTime.newDateNowObj(dateEnd);

        const startString = this.dateTime.dateString(startDate.now);
        const endString = this.dateTime.dateString(endDate.now);

        return {
            startDate: startDate,
            endDate: endDate,
            dateValue: `${startString} - ${endString}`,
            selectedDate: true
        };
    }

    get dateObj () {
        return this.dateTime.newDateNowObj();
    }

    getFilterFromMenu() {
        return this.filterFromMenu;
    }

    getSearchTerm() {
        return this.searchTerm;
    }

    setSearchTerm(value) {
        this.searchTerm = value;
    }

    setFilterFromMenu(obj) {
        this.filterFromMenu = obj;
    }
}

const filterState = new FilterState();
export default filterState;