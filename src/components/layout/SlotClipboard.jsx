import { forwardRef } from "react";

import styled from "styled-components";

const Item = styled.div`
  ${(props) => props.theme.layout.itemSingle}
`;

function SlotClipboard({ item, pos, func, dragOption }, clipboardRef) {
  const style = {
    top: pos.top,
    left: pos.left,
  };
  return (
    <div className="clipboard" ref={clipboardRef} style={style}>
      <div className="inner">
        {item && (
          <Item thisColor={item.color}>
            <div
              className="icon"
              onMouseUp={(e) => {
                console.log("mouse up");
                func(e);
              }}
            ></div>
            <div className="name">{item.name}</div>
          </Item>
        )}
      </div>
    </div>
  );
}

const SlotClipboardRef = forwardRef(SlotClipboard);
export default SlotClipboardRef;
