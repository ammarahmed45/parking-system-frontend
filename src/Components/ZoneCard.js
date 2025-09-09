import userStyles from "./Gates/user.module.css";
export default function ZoneCard({ zone, tab, selected, onSelect }) {
  const disabled =
    !zone.open || (tab === "visitor" && zone.availableForVisitors <= 0);

  return (
    <div
      className={`${userStyles.zoneCard} ${
        selected ? userStyles.selected : ""
      }`}
      onClick={onSelect}
    >
      <h3>{zone.name}</h3>
      <p>Occupied: {zone.occupied}</p>
      <p>Free: {zone.free}</p>
      <p>Reserved: {zone.reserved}</p>
      {tab === "visitor" && <p>Rate Normal: {zone.rateNormal}</p>}
      {tab === "subscriber" && <p>Rate Special: {zone.rateSpecial}</p>}
      <p>Status: {zone.status}</p>
    </div>
  );
}
