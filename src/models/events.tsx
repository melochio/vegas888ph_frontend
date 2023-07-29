interface Model_Event {
    id: any,
    eventName: string | any,
    eventDetails: string | any,
    plasadaPercent: string | any,
    status: string | any,
    openDate: Date | any,
    closeDate: Date | any,
    numberOfFights: number | any,

}

type EventModel_Hidden = {

    id: any,
    eventName: string | any,
    eventDetails: string | any,
    plasadaPercent: string | any,
    status: string | any,
    openDate: Date | any,
    closeDate: Date | any,
    numberOfFights: number | any,
    

}
function getCurrentDate(): string {
    const currentDate: Date = new Date();
    const day: string = String(currentDate.getDate()).padStart(2, '0');
    const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year: number = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
}


const initialEvent: Model_Event = {
    id: '',
    eventName: '',
    eventDetails: '',
    plasadaPercent: '',
    status: '',
    numberOfFights: '', 
    openDate: getCurrentDate(),
    closeDate: getCurrentDate(),
}
export default Model_Event

export type {
    EventModel_Hidden
}

export {
    initialEvent
}