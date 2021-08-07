import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CAlert, CModal, CModalHeader, CModalBody, CModalFooter, CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CSelect, CRow, CTextarea, CInputRadio, CLabel, CLink } from '@coreui/react'
import { CIcon } from '@coreui/icons-react';

const SurveyEdit = ({match}) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const surveyId = match.params.id

  const history = useHistory()
  const cstate = useLocation().state
  var data,timer = null
  
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState([]);
  const [t_ch, setTempCh] = useState(null)
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation()
  const [baseUrl, setBaseUrl] = useState("");

  const mount = () => {
    console.log('mounted')
    fetch("http://localhost:8080/api/survey/"+surveyId).then(res=>res.json()).then(
        (result)=>{
          console.log(result)
          setTitle(result.title)
          setDescription(result.description)
          setQuestion(result.question)
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

  const AddedChoice = (props) => {
    console.log(props.data)
    data = props.data
    return <CInput
        type="text"
        id={data.idnya+getRandomId()}
        name={data.parent}
        placeholder="Tambahkan Pilihan Jawaban"
        minLength="3"
        onChange={setTempChValue}
        />
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
  const AddedQuestion = (props) => {
    console.log(props.data)
    data = props.data
    return <CCard>
            <CCardHeader>
                <CRow>
                    <CCol sm="10">
                        { data.q_value == null || data.is_q_editing == true ? <h5>Pertanyaan {props.index+1}</h5> : 
                        <div>
                            <h6 className="text-primary">{data.qt_valueName}</h6>
                            <h5> {data.q_value}</h5>
                        </div>}
                    </CCol>
                    <CCol sm="2" style={{"textAlign":"right"}}>
                        <h4>
                            <CIcon 
                                className="text-danger" name="cil-trash" size="lg"
                                style={{cursor: "pointer"}}
                                onClick={ ()=>{handleDeleteQuestion(props.index)}}
                            />
                            { data.is_q_editing==false ?
                            <CIcon 
                                style={{marginLeft:"15px",cursor: "pointer"}} name="cil-pencil" size="lg"
                                onClick={ ()=>{handleEditQuestion(props.index, false)}}
                            /> : 
                            <CIcon 
                                style={{marginLeft:"15px",cursor: "pointer"}} name="cil-save" size="lg"
                                onClick={ ()=>{handleEditQuestion(props.index, true)}}
                            /> }
                        </h4>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                
                { data.q_value == null || data.is_q_editing==true ? 
                <CRow>
                    <CCol sm="8">
                        <CTextarea
                        type="text"
                        multiline
                        rows={4}
                        rowsMax={10}
                        id={data.idnya}
                        name={data.namenya}
                        placeholder={data.placeholdernya}
                        defaultValue={data.q_value}
                        minLength="3"
                        onChange={handleSetQuestion}
                        />
                    </CCol>
                    <CCol sm="4">
                        <CSelect 
                        id={data.idnya+"_qt"}
                        name={data.namenya+"_qt"}
                        onChange={handleQuestionType}
                        defaultValue="ES"
                        >
                        <option value="SC">Single Choice</option>
                        <option value="MC">Multiple Choices</option>
                        <option value="ES">Essay</option>
                        </CSelect>
                    </CCol>
                </CRow>
                 : null }
                { data.qt_value == "SC" || data.qt_value == "MC" ? <CRow>
                        <CCol sm="12">
                            <CLabel>Pilihan Jawaban</CLabel>
                            { data.ch_value.length > 0 ? <ul>
                                { data.ch_value.map(k => <li key={k.idnya+getRandomId()}>{k.value}</li>) }
                            </ul>
                            : null}
                        </CCol>
                        <CCol sm="8">
                            { t_ch != null ?<AddedChoice data={t_ch} ></AddedChoice> : null }
                        </CCol>
                        <CCol sm="4">
                            <CButton
                                color="primary"
                                onClick={()=>{handleAddNewChoice(data.idnya+"_qt")}}
                            >+</CButton>
                        </CCol>
                    </CRow>:null 
                }
                
            { props.index != 0? 
            <CRow>
                <CCol sm="12">
                    <div style={{'margin-top':'20px'}}></div>
                    <CSelect 
                    id={data.idnya+"_lq"}
                    name={data.namenya+"_lq"}
                    >
                    <option defaultValue value="null">Pertanyaan Terkait</option>
                    { question.map(k => {
                        return k.idnya != data.idnya ?
                        <option value={k.idnya} key={k.idnya}>{k.q_value}</option> : null
                        }
                    ) }
                    </CSelect>
                </CCol>
            </CRow> : null}
            </CCardBody>
            { props.index == props.len -1 && data.q_value != null? 
                <CCardFooter>
                    <CRow>
                        <CCol sm="4">
                        <CButton
                            color="success"
                            onClick={()=>{addNewQuestion()}}
                        >Tambah</CButton>
                        </CCol>
                        <CCol sm="4" className="offset-sm-4">
                        <CButton
                            color="primary"
                            onClick={()=>{submitForm()}}
                        >Simpan</CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>
                : null
            }
        </CCard>
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
    console.log(question)
    console.log(title)
    console.log(description)
    var endpoint = 'http://localhost:8080/api/create/'
    // if(uid) endpoint =`http://178.128.109.94:8080/user/${uid}`
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({description: description, title: title, question:question, surveyId:surveyId})
      }
      ).then(res=>res.json()).then(
      (result)=>{
        console.log(result)
        if(result.status == "OK") history.push("/surveys") 
      }
    )
  }
  const getRandomId = function(){
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.round(+new Date()/1000);
  }
  const getQuestionRandomId = function(){
      let randomId = getRandomId()
      return {
          idnya:randomId,
          namenya:randomId,
          placeholdernya:"asdadadadsa"
      }
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
  const handleDeleteQuestion=function(indexnya){
    question.splice(indexnya,1)
    setQuestion(question);
    forceUpdate()
  }
  const handleEditQuestion=function(indexnya, is_editing){
    question[indexnya].is_q_editing = !is_editing
    if(!question[indexnya].qt_valueName) {
        question[indexnya].qt_valueName = "Essayy"
        question[indexnya].qt_value = "ES"
    }
    setQuestion(question);
    forceUpdate()
  }
  var timerQuestion = null
  const debouncedSetQuestion = function(e){
    question.forEach(q => {
        if(q.idnya == e.target.id){
            q["q_value"] = e.target.value
            q["is_q_editing"] = false
        }
    });
    setQuestion(question);
    console.log(question)
  }
  const handleSetQuestion=function(e) {
    clearTimeout(timerQuestion)
    timerQuestion = setTimeout(()=>{
        debouncedSetQuestion(e)
    }, 500)
  }
  const debouncedSetChoice = function(e){
    let ch = t_ch
    ch.value = e.target.value
    setTempCh(ch)
  }
  const handleSetChoice=function(e) {
    clearTimeout(timer);
    timer = setTimeout(()=>{
        debouncedSetChoice(e);
    }, 500);
  }
  const setTempChValue=function(e){
    handleSetChoice(e)
  }
  const handleAddNewChoice=function(){
    question.forEach(q => {
        if(q.idnya == t_ch.parent){
            q.ch_value.push(t_ch)
        }
    });
    setQuestion(question);
    console.log(question)
    setTempCh({
        idnya : getRandomId(),
        value : "",
        parent: t_ch.parent
    })
    forceUpdate()
  }
  const handleQuestionType=function(e) {
    question.forEach(q => {
        if(q.idnya+"_qt" == e.target.id){
            q["qt_value"] = e.target.value
            switch(e.target.value){
                case "SC":
                    q['qt_valueName'] = "Single Choice"
                    break
                case "MC":
                    q['qt_valueName'] = "M:ultiple Choices"
                    break
                case "ES":
                    q['qt_valueName'] = "Essayy"
                    break
            }
            q["ch_value"] = []
            setTempCh({
                idnya : getRandomId(),
                value : "",
                parent: q.idnya
            })
        }
    });
    setQuestion(question);
    console.log(question)
    forceUpdate()
  }
  const addNewQuestion=function() {
    let questions = question
    data = getQuestionRandomId()
    questions.push(data)
    setQuestion(questions);
    console.log(question)
    forceUpdate()
    return null
  }


  return (
    <CRow>
        <CCol sm="3"></CCol>
        <CCol sm="6">
            <ErrorModal key={getRandomId}></ErrorModal>
            <CCard>
                <CCardHeader>
                    <CAlert color="primary" style={{"textAlign":"center"}}>
                        <h5>Link Survey <br></br>
                        <CLink href={baseUrl + "/response/"+surveyId} target="_blank">{baseUrl + "/response/"+surveyId}</CLink>
                        </h5>
                    </CAlert>
                    <h4>Ubah Survey</h4>
                </CCardHeader>
                <CCardBody>
                <CFormGroup>
                    <CLabel>Judul Survey</CLabel>
                    <CInput
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Judul Survey"
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
                </CCardBody>
            </CCard>
        </CCol>
        <CCol sm="3"></CCol>
        <CCol sm="3"></CCol>
        <CCol sm="6">
            { question.map((k,i) => <AddedQuestion data={k} index={i} len={question.length} key={k.idnya}></AddedQuestion>) }
        </CCol>
    </CRow>
  )
}

export default SurveyEdit
