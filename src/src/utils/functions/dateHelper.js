import moment from 'moment';
import 'moment-timezone';

const DateHelper = {
  stringToDateOrNull(dateString) {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    if (!(date instanceof Date) || Number.isNaN(date)) {
      return null;
    }
    return date;
  },
  stringToTimeOrNull(timeString) {
    const regex = /^(([0-1]?[0-9])|([2][0-3])):([0-5][0-9]):([0-5][0-9])?$/;
    if (regex.test(timeString)) {
      const [hours, minutes, seconds] = timeString.split(':');
      const newDate = new Date();
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(seconds);
      return newDate;
    }
    return null;
  },
  format(dateString, format, timezone = null) {
    const m = moment(dateString);
    if (timezone !== null) {
      m.tz(timezone);
    }
    return m.format(format);
  },
  /**
   * javascript Date 객체에서 Spring ZonedDateTime 에서 처리 가능한 String 으로 변환 목적
   * @param srcDate 변환할 Date 객체
   * @returns {string|null} Spring ZonedDateTime 에서 처리 가능한 String
   */
  dateToUTCISO(srcDate = new Date()) {
    const test = moment(srcDate);
    if (test.isValid()) {
      return test
        .utc()
        .format('YYYY-MM-DDTHH:mm:ssZ');
    }
    return null;
  },
  dateToISO(srcDate = new Date()) {
    const test = moment(srcDate);
    if (test.isValid()) {
      return test.format('YYYY-MM-DDTHH:mm:ssZ');
    }
    return null;
  },
  changeToDate(srcDate = new Date()) {
    const test = moment(srcDate);
    if (test.isValid()) {
      return test.format('YYYY-MM-DD');
    }
    return null;
  },
  changeToTime(srcDate = new Date()) {
    const test = moment(srcDate);
    if (test.isValid()) {
      return test.format('HH:mm:ss');
    }
    return null;
  },
  sleep(delay) {
    const start = new Date().getTime();
    let isContinue = true;
    while (isContinue) {
      isContinue = new Date().getTime() < start + delay;
    }
  },
};

export default DateHelper;
