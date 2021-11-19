export const COLOR_KEYS = [
  {
    color: "green",
    text: "On Site",
  },
  {
    color: "orange",
    text: "Planned Cone Time within 15 minutes",
  },
  {
    color: "red",
    text: "No Cone Time (Planned Time Exceeded",
  },
];

const create = (data) => {
  const {
    permitNumber,
    location,
    trafficManagement,
    workStatus,
    plannedStartTime,
    actualStartTime,
    plannedEndTime,
    actualEndTime,
  } = data;

  return {
    permitNumber,
    location,
    trafficManagement,
    workStatus,
    plannedStartTime,
    actualStartTime,
    plannedEndTime,
    actualEndTime,
  };
};

const rawData = [1, 2, 3, 4, 5];
export const ROWS = rawData.map((data) => {
  const organizedObj = {
    permitNumber: "PBAR34776555",
    location: "1234 smith street",
    trafficManagement: "Barricade",
    workStatus: "TBA",
    plannedStartTime: "TBA",
    actualStartTime: "TBA",
    plannedEndTime: "TBA",
    actualEndTime: "TBA",
  };
  const dataObj = create(organizedObj);

  return dataObj;
});

// export const COLUMNS = [
//   {
//     title: "RSBS Ref",
//     columnKey: "rsbsRef",
//   },
//   {
//     title: "SWR Ref",
//     columnKey: "swrRef",
//   },
//   {
//     title: "Road",
//     columnKey: "road",
//   },
//   {
//     title: "Direction",
//     columnKey: "direction",
//   },
//   {
//     title: "Location",
//     columnKey: "location",
//   },
//   {
//     title: "Traffic Management",
//     columnKey: "trafficManagement",
//   },
//   {
//     title: "Update Due",
//     columnKey: "updateDue",
//   },
//   {
//     title: "Execution Stage",
//     columnKey: "executionStage",
//   },
//   {
//     title: "Booking End Time",
//     columnKey: "bookingEndTime",
//   },
//   {
//     title: "24Hr Contact",
//     columnKey: "hrContact",
//   },
//   {
//     title: "Contact No.",
//     columnKey: "contactNo",
//   },
//   {
//     title: "Booking Status",
//     columnKey: "bookingStatus",
//   },
// ];

export const COLUMNS = [
  {
    title: "Permit #",
    columnKey: "permit_number",
  },
  {
    title: "Location",
    columnKey: "location",
  },
  {
    title: "Traffic Management",
    columnKey: "traffic_management",
  },
  {
    title: "Status",
    columnKey: "status",
  },
  {
    title: "Planned Start Time",
    columnKey: "planned_start_time",
  },
  {
    title: "Actual Start Time",
    columnKey: "actual_start_time",
  },
  {
    title: "Planned End Time",
    columnKey: "planned_end_time",
  },
  {
    title: "Actual End Time",
    columnKey: "actual_end_time",
  },
];
