import useApplicationStatus from '../../hooks/useApplicationStatus'
import DisplayAlertMessage from '../DisplayAlertMessage'

const StatusMessage = () => {
  const { message } = useApplicationStatus()

  if (!message) return null

  return <DisplayAlertMessage message={message} />
}

export default StatusMessage
