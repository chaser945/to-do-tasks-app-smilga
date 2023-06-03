import { useEffect } from "react"

const Alert = ({ alert, list, callAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      callAlert(false)
    }, 2000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [list])
  const { message, type } = alert
  return <p className={`alert-p ${type}`}>{message}</p>
}
export default Alert
