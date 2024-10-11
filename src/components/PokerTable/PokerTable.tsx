import "./table.scss";

// eslint-disable-next-line react/prop-types
export const PokerTable = ({ children } : { children : React.ReactNode }) => {
  return <div className="table">{children}</div>;
};
