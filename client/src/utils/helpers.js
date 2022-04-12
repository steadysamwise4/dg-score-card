export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function dateFormat(date) {
  let month = date.split(' ')[0];
  let day = date.split(' ')[1].split('');
  const year = date.split(' ')[2].split('0')[1];

  if (day[1].match(/[a-z]/i)) {
    day = day[0];
  } else {
    day = day[0] + day[1];
  }

  switch (month) {
    case 'Jan':
      month = 1;
      break;
    case 'Feb':
      month = 2;
      break;
    case 'Mar':
      month = 3;
      break;
    case 'Apr':
      month = 4;
      break;
    case 'May':
      month = 5;
      break;
    case 'June':
      month = 6;
      break;
    case 'July':
      month = 7;
      break;
    case 'Aug':
      month = 8;
      break;
    case 'Sep':
      month = 9;
      break;
    case 'Oct':
      month = 10;
      break;
    case 'Nov':
      month = 11;
      break;
    case 'Dec':
      month = 12;
      break;
    default:
      month = date.split(' ')[0];
      break;
  }
  return `${month}/${day}/${year}`;
}

export function shortenDate(date) {
  const dateArr = date.split(' ');
  const newDateArr = [dateArr[0], dateArr[1], dateArr[2]];
  return newDateArr.join(' ');
}
