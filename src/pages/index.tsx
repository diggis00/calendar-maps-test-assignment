import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/timeline/main.css";
import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import { Box, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DashboardLayout } from "src/components/dashboard-layout";
import { CalendarEventDialog } from "src/components/calendar/calendar-event-dialog";
import { CalendarToolbar } from "src/components/calendar/calendar-toolbar";
import { getEvents, updateEvent, getUsers } from "src/slices/calendar";
import { useDispatch, useSelector } from "src/store";
import { CalendarView } from "src/types/calendar";
import { Header } from "src/components/header/header";
import Map from "src/components/map/map";
import { CalendarEventTooltip } from "src/components/calendar/calendar-event-tooltip";
import CalendarUserList from "src/components/calendar/calendar-user-list";

const FullCalendarWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
  "& .fc-license-message": {
    display: "none",
  },
  "& .fc": {
    "--fc-bg-event-opacity": 1,
    "--fc-border-color": theme.palette.divider,
    "--fc-daygrid-event-dot-width": "10px",
    "--fc-event-text-color": theme.palette.primary.contrastText,
    "--fc-list-event-hover-bg-color": theme.palette.background.default,
    "--fc-neutral-bg-color": theme.palette.background.default,
    "--fc-page-bg-color": theme.palette.background.default,
    "--fc-today-bg-color": alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  "& .fc .fc-col-header-cell-cushion": {
    paddingBottom: "10px",
    paddingTop: "10px",
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    textTransform: theme.typography.overline.textTransform,
  },
  "& .fc .fc-day-other .fc-daygrid-day-top": {
    color: theme.palette.text.secondary,
  },
  "& .fc-daygrid-event": {
    borderRadius: theme.shape.borderRadius,
    padding: "0px 4px",
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  },
  "& .fc-daygrid-block-event .fc-event-time": {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
  },
  "& .fc-daygrid-day-frame": {
    padding: "12px",
  },
}));

const Calendar: NextPage = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef<FullCalendar | null>(null);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { events,users } = useSelector((state) => state.calendar);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>(
    smDown ? "timeGridDay" : "dayGridMonth"
  );
  const [dialog, setDialog] = useState<any>({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  useEffect(
    () => {
      dispatch(getEvents());
      dispatch(getUsers());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleResize = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = smDown ? "timeGridDay" : "dayGridMonth";

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarRef, smDown]);

  useEffect(
    () => {
      handleResize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [smDown]
  );

  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView: CalendarView): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleAddClick = (): void => {
    setDialog({
      isOpen: true,
    });
  };

  const handleRangeSelect = (arg: any): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }

    setDialog({
      isOpen: true,
      range: {
        start: arg.start.getTime(),
        end: arg.end.getTime(),
      },
    });
  };

  const handleEventSelect = (arg: any): void => {
    setDialog({
      isOpen: true,
      eventId: arg.event.id,
    });
  };

  const handleEventResize = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventDrop = async ({ event }: any): Promise<void> => {
    try {
      await dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseDialog = (): void => {
    setDialog({
      isOpen: false,
    });
  };

  const selectedEvent =
    dialog.eventId && events.find((event) => event.id === dialog.eventId);

  const [showMapView, setShowMapView] = useState<boolean>(false);
  const [calenderView, setCalendarView] = useState<boolean>(true);

  const mapViewWidth = "60%";

  const toggleMapView = () => setShowMapView((prev) => !prev);

  const onClickMapExpand = () => {
    if (!calenderView) {
      setCalendarView(true);
      setShowMapView(false);
    } else {
      setCalendarView(false);
    }
  };

  function renderInnerContent(innerProps) {
    return (
      <div className="fc-event-main-frame">
        {innerProps.timeText && (
          <div className="fc-event-time">{innerProps.timeText}</div>
        )}
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">
            {innerProps.event.title || <Fragment>&nbsp;</Fragment>}
          </div>
        </div>
      </div>
    );
  }

  const renderEventContent = (arg) => (
    <CalendarEventTooltip itemProps={arg}>
      {renderInnerContent(arg)}
    </CalendarEventTooltip>
  );
  return (
    <>
      <Head>
        <title>Dashboard: Calendar | Material Kit Pro</title>
      </Head>
      <Header mapViewChecked={showMapView} onChangeMapView={toggleMapView} />
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          py: 8,
        }}
      >
        <CalendarUserList users={users}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: calenderView ? 1 : 0,
            width: calenderView ? "auto" : 0,
          }}
        >
          <CalendarToolbar
            date={date}
            onAddClick={handleAddClick}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
            onDateToday={handleDateToday}
            onViewChange={handleViewChange}
            view={view}
            mobile={smDown}
          />
          <FullCalendarWrapper>
            <FullCalendar
              allDayMaintainDuration
              dayMaxEventRows={3}
              droppable
              editable
              eventContent={renderEventContent}
              eventClick={handleEventSelect}
              eventDisplay="block"
              eventDrop={handleEventDrop}
              eventResizableFromStart
              eventResize={handleEventResize}
              events={events}
              headerToolbar={false}
              height={800}
              initialDate={date}
              initialView={view}
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                listPlugin,
                timeGridPlugin,
                timelinePlugin,
              ]}
              ref={calendarRef}
              rerenderDelay={10}
              select={handleRangeSelect}
              selectable
              weekends
            />
          </FullCalendarWrapper>
        </Box>
        <Box
          sx={{
            width: showMapView ? mapViewWidth : "0%",
            flexGrow: showMapView ? 1 : 0,
          }}
        >
          <Map isMapExpand={!calenderView} onClickExpand={onClickMapExpand} />
        </Box>
      </Box>
      <CalendarEventDialog
        event={selectedEvent}
        onAddComplete={handleCloseDialog}
        onClose={handleCloseDialog}
        onDeleteComplete={handleCloseDialog}
        onEditComplete={handleCloseDialog}
        open={dialog.isOpen}
        range={dialog.range}
      />
    </>
  );
};

Calendar.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Calendar;
