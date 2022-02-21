import styled from "styled-components";
import colors from "../../essentials/colors";
import IconButton from "@mui/material/IconButton";

const ActionButton = styled(IconButton)`
  && {
    background: #ffffff;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10%;
    text-align: center;
    padding: 0.4rem;
    margin: auto;
    color: ${colors.accent};
    margin-block-start: 2%;
    margin-inline: 0.5rem;
  }
`;

export default ActionButton;
