const today = new Date();

const Cell = ({day, month, year, outdated}) => {
  const isCurrentDay = today.getMonth() === month && today.getFullYear() === year && day === today.getDate();

  const style = {
    backgroundColor: isCurrentDay ? 'red' : 'white',
    color: isCurrentDay ? 'white' : outdated ? 'lightgray' : 'black',
    borderRadius: 20,
    width: 24,
    height: 24,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <div style={style}>
      {day}
    </div>
  )
}

export default Cell;