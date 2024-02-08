import {Alert} from "react-bootstrap";

const AlertFun = ({msg}) => {
  return (
    <>
         <div className="alertContainer">
          <Alert variant="danger">{msg}</Alert>
        </div>
    </>
  )
}

export default AlertFun