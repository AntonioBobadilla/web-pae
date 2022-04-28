import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
  } from "react-big-calendar";
  import moment from "moment";
  import "react-big-calendar/lib/css/react-big-calendar.css";
  
  moment.locale("en-GB");
  //momentLocalizer(moment);
  const localizer = momentLocalizer(moment);
  
  const events = [
    {
      id: 0,
      title: "Board meeting",
      start: new Date(2018, 0, 29, 9, 0, 0),
      end: new Date(2018, 0, 29, 13, 0, 0),
      resourceId: 1
    },
    {
      id: 1,
      title: "Team lead meeting",
      start: new Date(2018, 0, 29, 13, 30, 0),
      end: new Date(2018, 0, 29, 16, 30, 0),
      resourceId: 1
    },
    {
      id: 11,
      title: "Birthday Party",
      start: new Date(2018, 0, 30, 7, 0, 0),
      end: new Date(2018, 0, 30, 10, 30, 0),
      resourceId: 1
    }
  ];
  
  const resourceMap = [
    { resourceId: 1, resourceTitle: "Training room" }
  ];
  
  const styles = {
    container: {
      width: "40vw",
      height: "100vh",
      margin: "50px auto"
    }
  };

const MyCalendar = () => {
    return (
        <div style={styles.container}>
            <BigCalendar
                selectable
                localizer={localizer}
                events={events}
                defaultView={Views.DAY}
                views={[Views.DAY, Views.WEEK, Views.MONTH]}
                defaultDate={new Date(2018, 0, 29)}
                resources={resourceMap}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
            />
        </div>
    )
}

export default MyCalendar;