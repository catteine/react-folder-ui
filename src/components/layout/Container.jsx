import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Slot from "./Slot";
import SlotClipboardRef from "./SlotClipboard";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  border: 1px solid #aaa;
  margin: 20px auto;
  &.edit-mode {
    border-color: red;
  }
`;

export default function Container({ itemslist, setList }) {
  // list init
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    const blankSlots = (() => {
      let arr = [];
      for (let i = 0; i < 9 - itemslist.length; i++) {
        arr.push("");
      }
      return arr;
    })();
    console.log("make");
    setSlots([...itemslist, ...blankSlots]);
    console.log(slots);
  }, [itemslist]);

  const clipboardRef = useRef();

  // func
  const [editMode, setEditMode] = useState(false);
  const [clipboard, setClipboard] = useState();
  const [positionOn, setPositionOn] = useState(0);
  const [originPosition, setOriginPosition] = useState(0);
  const [positionValue, setPositionValue] = useState({
    top: 0,
    left: 0,
  });
  const func = {
    // remove: function (item) {
    //   const resultArr = itemslist.filter((el) => el !== item);
    //   setList(resultArr);
    //   console.log("remove");
    // },
    // copy: function (item) {
    //   let resultArr = itemslist.filter((el) => el !== item);
    //   setList(resultArr);

    //   console.log("move");
    // },
    change: function (e) {
      /**
       * elementFromPoint로 마우스 포인트와 겹치는 container의 slot을 찾고 싶었는데,
       * 현재 들고 있는 dom이 무조건 걸리게 됨 (커서와 겹쳐 있으므로)
       * 그래서 들고 있는 dom을 잠시 hidden 시키고 다시 보여주고
       * 그 사이에 elementFromPoint로 마우스 포인트와 겹치는 slot을 찾음
       */
      clipboardRef.current.hidden = true;
      const target = document.elementFromPoint(e.pageX, e.pageY);
      clipboardRef.current.hidden = false;
      if (target.closest(".slot")?.dataset.position === positionOn) {
        let resultArr = slots.filter((el) => el.name !== "dummy");
        resultArr.splice(positionOn - 1, 0, clipboard);
        setList(resultArr);
        setClipboard("");
      } else {
        let resultArr = slots.filter((el) => el.name !== "dummy");
        resultArr.splice(originPosition, 0, clipboard);
        setList(resultArr);
        setClipboard("");
      }
    },
    editActive: function () {
      setEditMode(true);
    },
    move: function (event, item, index) {
      const resultArr = slots.filter((el) => el !== item);
      // resultArr.splice(index, 0, { name: "dummy", color: "asd" });
      setSlots(resultArr);
      // setList(resultArr);
      setClipboard(item);
      setPositionOn(index);
      setOriginPosition(index);
      setPositionValue({
        top: event.pageY - 50,
        left: event.pageX - 50,
      });
    },
    moving: function (e) {
      if (clipboard) {
        console.log(slots);
        setPositionValue({
          top: e.pageY - 50,
          left: e.pageX - 50,
        });
        clipboardRef.current.hidden = true;
        const target = document.elementFromPoint(e.pageX, e.pageY);
        clipboardRef.current.hidden = false;
        if (target.closest(".slot:not(.blank)")) {
          setPositionOn(target.closest(".slot")?.dataset.position);
          let resultArr = slots.filter((el) => el.name !== "dummy");
          resultArr.splice(positionOn - 1, 0, { name: "dummy", color: "asd" });
          setSlots(resultArr);
          // setList(resultArr);
        } else {
          setSlots(slots.filter((el) => el.name !== "dummy"));
          // setList(itemslist.filter((el) => el.name !== "dummy"));
        }
      }
    },
  };

  return (
    <>
      <StyledContainer
        className={editMode ? "edit-mode" : ""}
        onMouseLeave={func.removeDummy}
        onMouseMove={func.moving}
      >
        {slots.length > 0 &&
          slots.map((item, index) => (
            <Slot key={"slot_" + index} idx={index} item={item} func={func} />
          ))}

        {clipboard && (
          <SlotClipboardRef
            idx="0"
            item={clipboard}
            pos={positionValue}
            ref={clipboardRef}
            func={func.change}
          />
        )}
      </StyledContainer>
    </>
  );
}
