function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string, 
  separator: string = ''
) {
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0')
  ].join(separator);
}

function getDateLocaleFormat(dateString: Date | string) {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
}

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear;
  const startDate = new Date(`${year}-${month}`);
  const firstDOW = startDate.getDay();
  const lastDateString = String(
    new Date(
      initialDate.getFullYear(), 
      initialDate.getMonth() + 1, 
      0
    ).getDate()
  );

  const lastDate = Number(lastDateString);

  return {month, year, startDate, firstDOW, lastDate};
}

export {getDateWithSeparator, getDateLocaleFormat, getMonthYearDetails};