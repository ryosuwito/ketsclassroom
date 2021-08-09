import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CSelect, CRow, CTextarea, CInputRadio, CLabel, CLink } from '@coreui/react'
import { CIcon } from '@coreui/icons-react';

const SurveyEdit = ({match}) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const assignmentGroupId = match.params.id

  const history = useHistory()
  var data,timer = null
  
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("slug");
  const [modal, setModal] = useState(false);
  const [forms, setForms] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation()
  const [baseUrl, setBaseUrl] = useState("");

  const mount = () => {
    console.log('mounted')
    fetch("http://localhost:8080/api/assignment-group/"+assignmentGroupId).then(res=>res.json()).then(
        (result)=>{
          console.log(result)
          let assignmentGroup = result.assignment_group
          let forms_data = result.forms
          setTitle(assignmentGroup.title)
          setDescription(assignmentGroup.description)
          setSlug(assignmentGroup.slug)
          setForms(forms_data)
          let path = location.pathname
          let loc = window.location.href
          setBaseUrl(loc.split(path)[0])
        }
    )
    const unmount = () => {
      console.log('unmounted')
      // ...
    }
    return unmount
  }
  useEffect(mount, [])


  const toggleModal = ()=>{
    setModal(!modal);
  }
  const ErrorModal = (props) =>{
    return <CModal
            show={modal}
            onClose={toggleModal}>
            <CModalBody>
            {modalMessage}
            </CModalBody>
            <CModalFooter>
            <CButton
                color="secondary"
                onClick={toggleModal}
            >Cancel</CButton>
            </CModalFooter>
        </CModal>
  }

  const submitForm = ()=>{
    if(titleError){
        setModalMessage("Judul minimal 3 karakter")
        toggleModal()
        return
    }
    if(descriptionError){
        setModalMessage("Deskripsi minimal 3 karakter")
        toggleModal()
        return
    }
    console.log(title)
    console.log(description)
    var endpoint = 'http://localhost:8080/api/assignment-group/edit/'+slug+"/"
    // if(uid) endpoint =`http://178.128.109.94:8080/user/${uid}`
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({description: description, title: title, assignmentGroupId:assignmentGroupId})
      }
      ).then(res=>res.json()).then(
      (result)=>{
        console.log(result)
        if(result.status == "OK") history.push("/assignments") 
      }
    )
  }
  const handleSetDescription=function(e) {
    if(e.target.value.length<3){
        setDescriptionError(true)
    } else {
        setDescriptionError(false) 
    }
    setDescription(e.target.value);
  }  
  const handleSetTitle=function(e) {
    if(e.target.value.length<3){
        setTitleError(true)
    } else {
        setTitleError(false) 
    }
    setTitle(e.target.value);
  } 
  const getRandomId = function(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.round(+new Date()/1000);
  }

  return (
    <CRow>
        <CCol sm="3"></CCol>
        <CCol sm="6">
            <ErrorModal key={getRandomId}></ErrorModal>
            <CCard>
                <CCardHeader>
                    {/* <CAlert color="primary" style={{"textAlign":"center"}}>
                        <h5>Link Survey <br></br>
                        <CLink href={baseUrl + "/response/"+assignmentGroupId} target="_blank">{baseUrl + "/response/"+assignmentGroupId}</CLink>
                        </h5>
                    </CAlert> */}
                    <h4>Ubah Tugas</h4>
                </CCardHeader>
                <CCardBody>
                <CFormGroup>
                    <CLabel>Judul Tugas</CLabel>
                    <CInput
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Judul Tugas"
                    minLength="3"
                    defaultValue={title}
                    onChange={handleSetTitle}
                    />
                    { titleError ? <CFormText color="danger">Judul minimal 3 karakter</CFormText> : null }
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Deskripsi singkat</CLabel>
                    <CTextarea
                    type="text"
                    multiline
                    rows={4}
                    rowsMax={10}
                    id="description"
                    name="description"
                    placeholder="Deskripsi Singkat"
                    minLength="3"
                    defaultValue={description}
                    onChange={handleSetDescription}
                    />
                    { descriptionError ? <CFormText color="danger">Deskripsi minimal 3 karakter</CFormText> : null }
                </CFormGroup>
                { forms ?
                <CFormGroup>
                    <CRow>
                        <CCol sm="12">
                            <CFormGroup>
                                <CLabel>Soal yang digunakan</CLabel>
                                <CSelect 
                                id={assignmentGroupId}
                                name={"form_id"}
                                // onChange={handlePertanyaanTerkait}
                                >
                                <option defaultValue value="null">Pilih Soal</option>
                                { forms.map(k => {
                                    return <option value={k.id} key={k.slug}>{k.title}</option>
                                    }
                                ) }
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CFormGroup> : null}
                </CCardBody>
                <CCardFooter>
                    <CRow>
                        <CCol sm="4" className="offset-sm-8">
                        <CButton
                            color="primary"
                            onClick={()=>{submitForm()}}
                        >Simpan</CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
        </CCol>
        {/* <CCol sm="3"></CCol>
        <CCol sm="3"></CCol>
        <CCol sm="6">
            { question.map((k,i) => <AddedQuestion data={k} index={i} len={question.length} key={k.idnya}></AddedQuestion>) }
        </CCol> */}
    </CRow>
  )
}

export default SurveyEdit
