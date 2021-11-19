import PageWrapper from "../../components/PageWrapper";
import WelcomeBar from "../../components/WelcomeBar";
import WorkLogForm from "./WorkLogForm";

const AddWorkLog = (props) => {
  return (
    <PageWrapper>
      <WelcomeBar />
      <WorkLogForm />
    </PageWrapper>
  );
};

export default AddWorkLog;
