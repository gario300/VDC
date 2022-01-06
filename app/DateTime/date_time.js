import moment from "moment";

export default class DateTime 
{
    constructor() { 
        this.months = ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];
    }

    newDateNowObj = (customDate) => {
        let now = this.newDate( Date.now() );
        if (typeof customDate !== "undefined") {
            now = customDate;
        }
        return {
            now: now,
            text: now.getFullYear() + "-" + this.getTwoDecimals(now.getMonth()+1) + "-" + this.getTwoDecimals( now.getDate() )
        };
    }

    getNowUnix() {
        return moment().unix();
    }

    getNowStamp() {
        return moment().utc().format();
    }

    getNow() {
        return moment().valueOf();
    }

    getDateFromHours(hourMin) {
        const now = moment()
        return moment(`${now.format("YYYY-MM-DD")} ${hourMin}`).utcOffset(60).toDate()
    }

    getDateCustomISO(d) {
        const now = moment(d)
        return `${now.format("YYYY-MM-DD")}T00:00:00.000Z`
    }

    now() {
        return moment().toDate()
    }

    newDate = (fromDate) => {
        // console.log(typeof fromDate);
        if (typeof fromDate === "number") {
            const date = moment( fromDate * 1000 );
            return date.toDate();
        } else {
            const date = moment( fromDate ).utcOffset(60);
            /*
            const now = date.toDate();
            const offsetMilli = date.getTimezoneOffset()*60*1000;
            now.setTime( now.getTime() + offsetMilli );
            */

            return date.toDate();
        }
    }

    dateFormatted = (mDate) => {
        const year = mDate.getFullYear();
        let month = mDate.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = mDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return day + " / " + month + " / " + year
    }

    getHours = () => {
        let now = this.newDate( Date.now() );
        return now.getHours();
    }

    dateFormattedTime = (mDate) => {
        const year = mDate.getFullYear();
        let month = mDate.getMonth();
        let day = mDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let hours = mDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = mDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let seconds = mDate.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return day + " " + this.months[month] + " " + year
    }

    dateFormattedTimeHours = (mDate) => {
        const year = mDate.getFullYear();
        let month = mDate.getMonth();
        let day = mDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let hours = mDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = mDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let seconds = mDate.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return day + " " + this.months[month] + " " + year + " - " + hours + ":" + minutes
    }

    getOnlyTime = (mDate) => {
        let hours = mDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = mDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let seconds = mDate.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return hours + ":" + minutes
    }

    getOnlyTimeVal = (mDate) => {
        let hours = mDate.getHours();
        let minutes = mDate.getMinutes();
        return hours + ":" + minutes
    }

    dateFormattedFormal = (mDate) => {
        const year = mDate.getFullYear();
        let month = mDate.getMonth() + 1;
        let day = mDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return year + "-" + month + "-" + day
    }

    dateFormattedMin = (mDate) => {
        let month = mDate.getMonth();
        let day = mDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return day + " " + this.months[month];
    }

    getTwoDecimals = (val) => {
        if (val <= 9) {
            return  "0" + val;
        }

        return val;
    }

    dateString = (date) => {
         const day = this.getTwoDecimals(date.getDate());
         const month = date.getMonth();
         const year = date.getFullYear();

         return `${day} ${this.months[month]} ${year}`;
    }

    isInFuture = (dateString) => {
        const today = moment();
        //const otherDate = this.newDate(dateString);
        const otherDate = moment( dateString );
        return otherDate.diff(today) >= 0;
    }

    getDifference = (todayDate, endDate) => {
        const today = moment(todayDate);
        const end = moment( endDate );
        const diff = end.diff(today);
        return diff;
    }

    getFutureMonth = (diff) => {
        const today = moment();
        return today.add(diff, 'M').utc().format()
    }

    parseHours = (hours) => {
        const hString = hours.toString();
        if (Number(hString) <= 9) {
            return "0" + hString;
        }

        return hString;
    }

    toIsoFormat = (date) => {
        return date.toISOString();
    }

    parseDate = (date) => {
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
    } 

};
