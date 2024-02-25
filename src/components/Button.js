const buttonStyles = {
  border: 'none',
  padding: '4px',
  marginRight: '5px',
  height: 24,
  width: 24
}

const Button = ({children, onHandle, styles}) => {
  return (
    <button style={{...buttonStyles, ...styles}} onClick={onHandle}>{children}</button>
  );
}
export default Button;