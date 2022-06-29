export function Dropdown(props) {
  const { btn, btnClass, children, dropdownRef, toggleDropdown } = props;

  return (
    <div className="main-wrapper">
      <button onClick={toggleDropdown} className={btnClass}>
        {btn}
      </button>
      <div ref={dropdownRef} className="dropmenu-wrapper">
        {children}
      </div>
    </div>
  );
}
