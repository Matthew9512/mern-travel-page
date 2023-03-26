export const dateFormat = function (date) {
   const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

   const daysPassed = calcDaysPassed(new Date(), new Date(date));

   if (daysPassed === 0) return 'Today';
   if (daysPassed === 1) return 'Yesterday';
   if (daysPassed <= 7) return `${daysPassed} days ago`;
   if (daysLeft >= 30) return `${parseInt(daysLeft / 30)} months ago`;
};
