import { css } from "styled-components";

const itemSingle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3px 0;
  width: 100%;
  height: 100%;
  .icon {
    width: 60%;
    height: 60%;
    background-color: ${(props) => (props.isDummy ? "#eee" : props.thisColor)};
    border-radius: 20%;
    box-shadow: ${(props) =>
      props.isDummy ? "none" : "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"};
  }
  .name {
    max-width: 80%;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${(props) => (props.isDummy ? "display: none" : "")}
  }
  button {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const layout = { itemSingle };
