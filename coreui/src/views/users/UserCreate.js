import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CLabel, CRow } from '@coreui/react'

const User = () => {
  const history = useHistory()
  const cstate = useLocation().state
  const [namaError, setNamaError] = useState(false);
  var cnama,cusername,cpassword,cid = ""
  var data = null
  if(cstate){
      data = cstate[0]['data']
      if(data){
        cnama=data.nama
        cusername=data.username
        cpassword=""
        cid=data.id
        console.log(cid)
      }
  }
  const [uid, setId] = useState(cid);
  const [nama, setNama] = useState(cnama);
  const [usernameError, setUsernameError] = useState(false);
  const [username, setUsername] = useState(cusername);
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState(cpassword);
  const submitForm = ()=>{
    if(nama.length<3){
        setNamaError(true)
    } else {
        setNamaError(false) 
    }
    if(username.length<3){
        setUsernameError(true)
    } else {
        setUsernameError(false) 
    }
    if(password.length<7){
        setPasswordError(true)
    } else {
        setPasswordError(false) 
    }
    if(passwordError||namaError||usernameError) return

    var endpoint = 'http://178.128.109.94:8080/user/'
    if(uid) endpoint =`http://178.128.109.94:8080/user/${uid}`
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({nama: nama, username: username, password:password})
      }
      ).then(res=>res.json()).then(
      (result)=>{
        console.log(result)
        history.push("/users") 
      }
    )
  }
  const handleSetNama=function(e) {
    if(e.target.value.length<3){
        setNamaError(true)
    } else {
        setNamaError(false) 
    }
    setNama(e.target.value);
  }  
  const handleSetUsername=function(e) {
    if(e.target.value.length<3){
        setUsernameError(true)
    } else {
        setUsernameError(false) 
    }
    setUsername(e.target.value);
  }
  const handleSetPassword=function(e) {
    if(e.target.value.length<3){
        setPasswordError(true)
    } else {
        setPasswordError(false) 
    }
    setPassword(e.target.value);
  }
  return (
    <CRow>
    <CCol sm="6">
    <CCard>
        <CCardHeader>
            Create New User
        </CCardHeader>
        <CCardBody>
        <CForm action="" method="post">
        <CFormGroup>
            <CLabel htmlFor="username">Username</CLabel>
            <CInput
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            minLength="3"
            value={username}
            onChange={handleSetUsername}
            />
            { usernameError ? <CFormText color="danger">Username minimal 3 karakter</CFormText> : null }
        </CFormGroup>
        <CFormGroup>
            <CLabel htmlFor="nama">Nama</CLabel>
            <CInput
            type="text"
            id="nama"
            name="nama"
            placeholder="Nama"
            minLength="3"
            value={nama}
            onChange={handleSetNama}
            />
             { namaError ? <CFormText color="danger">Nama minimal 3 karakter</CFormText> : null }
        </CFormGroup>
        <CFormGroup>
            <CLabel htmlFor="password">Password</CLabel>
            <CInput
            type="password"
            id="password"
            name="password"
            minLength="3"
            value={password}
            onChange={handleSetPassword}
            placeholder="Enter Password.."
            />
            { passwordError ? <CFormText color="danger">Password minimal 7 karakter</CFormText> : null }
        </CFormGroup>
        </CForm>
        </CCardBody>
        <CCardFooter>
            <CButton
                color="primary"
                onClick={()=>{submitForm()}}
            >Submit</CButton>
        </CCardFooter>
    </CCard>
    </CCol>
    </CRow>
  )
}

export default User
