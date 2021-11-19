import PageWrapper from "../../components/PageWrapper";
import WelcomeBar from "../../components/WelcomeBar";
import Refactor from "./Refactor";
import useSWR from "swr";
import { ENDPOINTS } from "../../api/endpoints";
import { Box } from "@material-ui/core";

const PermitDetails = (props) => {
  // const { data: permitObject } = useSWR(ENDPOINTS.PERMITS);

  // const permits = permitObject?.permits;
  const { id } = props;
  console.log("ID", id);
  // const classes = useStyles();
  // const thisPermit = permits?.filter(
  //   (permit) => permit.permit_number === id
  // )[0];

  const { data: thisPermit, error } = useSWR(`${ENDPOINTS.PERMITS}/${id}`);

  // call a new endpoint to get the single permit object with also added workzone status to display... also need to create that endpoint
  return (
    <PageWrapper>
      <WelcomeBar navigateLink="/existing-bookings" linkText="Back" />
      {thisPermit && <Refactor id={id} permit={thisPermit} />}
      {error && (
        <Box component="h1" style={{ color: "red" }}>
          {error.response.data.message}
        </Box>
      )}
    </PageWrapper>
  );
};

export default PermitDetails;
