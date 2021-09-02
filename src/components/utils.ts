export let currentId: number = 1;

export const getNewId = (): number => {
  return currentId++;
}

export const dateNames: string[] = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];

export const months: string[] = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];

export const getDayName = (index: number): string => {
    return dateNames[index];
}

export const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export const getWeekByDate = (day:number): number[] => {
  const dayOfWeek = (new Date(day).getDay()) || 7;
  const monday = day - (dayOfWeek - 1) * DAY_MILLISECONDS;
  const week = [];
  for(let i=0;i<7;i++){
    week.push(monday + (DAY_MILLISECONDS * i))
  }
  return week;
}

export const getFormatDay = (day: number ): string => {
  const date = new Date(day);
  return `${date.getDate()}  ${months[date.getMonth()]}`
}


