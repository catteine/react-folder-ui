import SingleItem from "../item/SingleItem";

export default function Slot({ item, idx, func }) {
  return (
    <div className={`${"slot"} ${item ? "" : "blank"}`} data-position={idx + 1}>
      {item && <SingleItem item={item} idx={idx} func={func} />}
    </div>
  );
}
