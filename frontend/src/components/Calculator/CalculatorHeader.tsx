import { Header, Button, Icon, Message } from "semantic-ui-react";

const CalculatorHeader = (): JSX.Element => {
  const unsavedChanges = false;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Header
        style={{ display: "inline-block", margin: 0, marginRight: "1rem" }}
      >
        hi there
      </Header>
      <Button icon labelPosition="left">
        <Icon name="pencil" />
        Rename
      </Button>
      <Button icon labelPosition="left">
        <Icon name="share" />
        Share
      </Button>
      <Message
        warning={unsavedChanges}
        success={!unsavedChanges}
        style={{ display: "inline-block", margin: 0, marginLeft: "auto" }}
      >
        <Message.Header>
          {unsavedChanges
            ? "Warning: You have unsaved changes!"
            : "All changes are saved."}
        </Message.Header>
      </Message>
    </div>
  );
};

export default CalculatorHeader;
