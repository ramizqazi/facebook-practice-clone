import moment from 'moment';

export const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

export const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const calculateTimeDiff = (start, end) => {
  let str = '';
  const m1 = moment(start);
  const m2 = moment(end);
  const duration = moment.duration(m2.diff(m1));
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (hours > 0) {
    str += `${hours} ${hours > 1 ? 'hours' : 'hour'} `;
  }
  if (minutes > 0) {
    str += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} `;
  }
  if (seconds > 0) {
    str += `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`;
  }

  return str;
};
