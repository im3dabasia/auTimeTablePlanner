let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export function createEventId() {
    return String(eventGuid++)
}
const day2Num = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6

  }

export const INITIAL_EVENTS = (coursesBucket) => {

    coursesBucket.map((course) => {
        return {
            id: createEventId(),

            timeZone: 'UTC',
            start: todayStr + 'T12:00:00',
            title: course.courseName,
            // start: '2022-08-01',
            end: '2022-12-01',
            daysOfWeek: [day2Num[course.courseWeeklyFirstLec], day2Num[course.courseWeeklySecondLec]],
            Duration: '01:30:00'
        }
    })
}

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: todayStr
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00'
//   }
// ]
