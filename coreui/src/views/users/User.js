import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link, useHistory } from 'react-router-dom';

const User = ({match}) => {
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const history = useHistory()
  const toggle = ()=>{
    setModal(!modal);
  }
  const deleteUser = ()=>{
    fetch("http://178.128.109.94:8080/user/"+match.params.id, {
        method: "DELETE"
      }
      ).then(res=>res.json()).then(
      (result)=>{
        console.log(result)
        history.push("/users") 
      }
    )
  }

  useEffect(() => {
    fetch("http://178.128.109.94:8080/user/"+match.params.id).then(res=>res.json()).then(
      (result)=>{
        console.log(result)
        setUserData(result)
      }
    )
  }, [])
  const userDetails = userData.username ? Object.entries(userData) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
          <CCardFooter>
            <Link to={{pathname:"/users/create",state:[{data:userData}]}}><CButton color={"primary"}>Ubah</CButton></Link> 
            <CButton onClick={ ()=>{toggle()}} color={"danger"} className="ml-2">Hapus</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>Anda yakin ingin menghapus user ini?</CModalHeader>
        <CModalBody>
          <table className="table table-striped table-hover">
            <tbody>
                {
                  userDetails.map(([key, value], index) => {
                    if(key!=="password"){
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    }
                  })
                }
            </tbody>
          </table> 
        </CModalBody>
        <CModalFooter>
          <CButton onClick={()=>{deleteUser()}} className="mr-2" color="danger">Hapus</CButton>
          <CButton
            color="success"
            onClick={()=>{toggle()}}
          >Batalkan</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default User
