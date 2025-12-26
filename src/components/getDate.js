import { format,addYears,subDays } from 'date-fns';
export function getDate(str){
  switch(str){
    case "yestarday":
        return subDays(new Date(), 1);
    case "today":
        return new Date();
    default:
  }
}