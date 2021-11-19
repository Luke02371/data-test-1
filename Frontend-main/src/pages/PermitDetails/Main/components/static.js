export const applicantLineGroupConfig = {
  lineGroupHeadText: "Applicant Name",
  lineGroupHeadValueKey: "applicantName",
  groupLineItemConfigs: [
    {
      lineTitle: "Company",
      lineItemValueKey: "applicantCompany",
    },
    {
      lineTitle: "Address",
      lineItemValueKey: "applicantAddress",
    },
  ],
};

export const primeContractorLineGroupConfig = {
  lineGroupHeadText: "Prime Contractor",
  lineGroupHeadValueKey: "primeContractor",
  groupLineItemConfigs: [
    {
      lineTitle: "Company",
      lineItemValueKey: "primeContractorCompany",
    },
    {
      lineTitle: "Address",
      lineItemValueKey: "primeContractorAddress",
    },
  ],
};

export const barricadeContractorLineGroupConfig = {
  lineGroupHeadText: "Barricade Contractor",
  lineGroupHeadValueKey: "barricadeContractor",
  groupLineItemConfigs: [
    {
      lineTitle: "Company",
      lineItemValueKey: "barricadeContractorCompany",
    },
    {
      lineTitle: "Address",
      lineItemValueKey: "barricadeContractorAddress",
    },
  ],
};

export const sectionOneLineItems = [
  // {
  //   lineTitle: "Project Name",
  //   lineItemValueKey: "projectName",
  // },
  {
    lineTitle: "Permit Status",
    lineItemValueKey: "status",
  },
  {
    lineTitle: "Location",
    lineItemValueKey: "description",
  },
  {
    lineTitle: "Issued Date",
    lineItemValueKey: "issued_date",
  },
  {
    lineTitle: "Permit Type",
    lineItemValueKey: "permitType",
  },
  {
    lineTitle: "Contact Name",
    lineItemValueKey: "contact_name",
  },
  {
    lineTitle: "Barricade Contractor",
    lineItemValueKey: "owner",
  },

  // {
  //   lineTitle: "District",
  //   lineItemValueKey: "district",
  // },
];

export const sectionTwoLineItems = [
  {
    lineTitle: "Responsible Party",
    lineItemValueKey: "responsibleParty",
  },
  {
    lineTitle: "Within 300' of Traffic Signal",
    lineItemValueKey: "trafficSignal",
  },
];

export const sectionThreeLineItems = [
  {
    lineTitle: "Workzone Status",
    lineItemValueKey: "work_zone_status",
  },
  {
    lineTitle: "",
    lineItemValueKey: "",
  },
  {
    lineTitle: "Expiration Date",
    lineItemValueKey: "expiration_date",
  },
  {
    lineTitle: "Parcel ID",
    lineItemValueKey: "spatial_id",
  },
  {
    lineTitle: "Contact Number",
    lineItemValueKey: "contact_number",
  },
];
