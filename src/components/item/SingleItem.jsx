import { useState } from "react";

import styled from "styled-components";

const Item = styled.div`
  ${(props) => props.theme.layout.itemSingle}
`;

export default function SingleItem({ item, idx, func }) {
  /**
   * draggable 체크
   * 기본이 true
   * 움직이기 시작하면 false
   */
  const [isDraggable, setIsDraggable] = useState(true);

  const itemRemove = function () {
    func.remove(item);
  };

  // drag를 위한 설정 (마우스다운 상태)
  const setDown = function () {
    console.log("mouse down");
    setIsDraggable(false);
  };
  const cancelDown = function () {
    console.log("mouse up");
    setIsDraggable(true);
  };
  // drag 시작 (마우스다운 상태에서 움직이기 시작)
  const dragStart = function (event, item) {
    if (!isDraggable) {
      console.log("mouse move");
      setIsDraggable(true);
      func.move(event, item, idx);
    }
  };

  return (
    <Item
      onMouseDown={setDown}
      onMouseUp={cancelDown}
      onMouseMove={(e) => dragStart(e, item)}
      isDummy={item.name === "dummy"}
      thisColor={item.color}
    >
      <div className="icon"></div>
      <div className="name">{item.name}</div>
      {/* 
      <button type="button" onClick={itemRemove}>
        X
      </button> */}
    </Item>
  );
}
