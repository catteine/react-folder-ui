import { useState } from "react";
import styled from "styled-components";

const AddItemForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  align-items: center;
`;
const FormTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
`;
const RadioForm = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const RadioList = styled.li`
  display: flex;
  gap: 4px;
  padding: 5px;
`;
const ColorIcon = styled.i`
  display: block;
  width: 15px;
  height: 15px;
  overflow: hidden;
  background-color: ${(props) => props.bgColor};
`;
const InputForm = styled.div`
  input {
    width: 100%;
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #333;
  }
`;
const AddButton = styled.button`
  font-size: 14px;
  background-color: #ccc;
  padding: 0.5em 1em;
`;

export default function AddItem({ itemslist, add, iconColors }) {
  // item
  class Single {
    constructor(color, name) {
      this.color = color;
      this.name = name;
    }
  }

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const setText = function (e) {
    setName(e.target.value);
  };
  const setBgColor = function (e) {
    setColor(e.target.value);
  };
  const makeItem = function () {
    if (name !== "") {
      const newSingle = new Single(color, name);
      add(newSingle);
      setName("");
    }
  };
  return (
    itemslist.length < 9 && (
      <AddItemForm>
        <FormTitle>색상</FormTitle>
        <RadioForm>
          {iconColors.map((el, index) => (
            <RadioList key={"select-color" + index}>
              <input
                type="radio"
                id={`colorIcon_${index}`}
                name="colorIcons"
                value={el}
                defaultChecked={index === 0}
                onChange={setBgColor}
              />
              <label htmlFor={`colorIcon_${index}`}>
                <ColorIcon bgColor={el} />
              </label>
            </RadioList>
          ))}
        </RadioForm>
        <FormTitle as="label" htmlFor="itemName">
          이름
        </FormTitle>
        <InputForm>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={name}
            onChange={setText}
          />
        </InputForm>
        <AddButton type="button" onClick={makeItem}>
          아이템 추가
        </AddButton>
      </AddItemForm>
    )
  );
}
