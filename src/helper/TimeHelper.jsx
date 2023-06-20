import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-tw';


export default function DayTime (a){
    dayjs.extend(relativeTime);
    dayjs.locale('zh-tw')
    const anHourAgo = (a) => dayjs(a).subtract(0, 'minute');
    const timeFromNow = (a) => anHourAgo(a).fromNow()
    
    //查看現在時間
    // const now = dayjs();
    // const format = now.format('HH:mm')
    return  timeFromNow(a)
 }
    
  