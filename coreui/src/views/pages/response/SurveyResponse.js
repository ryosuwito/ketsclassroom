import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CContainer, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CFormGroup, CFormText, CInput, CSelect, CRow, CTextarea, CInputCheckbox, CInputRadio, CLabel } from '@coreui/react'

const SurveyResponse = ({match}) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const surveyId = match.params.id

  const history = useHistory()
  var data,timer = null
  var temp_q = null
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0)
  const mount = () => {
    console.log('mounted')
    fetch("http://localhost:8080/api/survey/"+surveyId).then(res=>res.json()).then(
        (result)=>{
          console.log(result)
          setQuestion(result.question)
          setDescription(result.description)
          setTitle(result.title)
          temp_q = result.question
        }
    ).then((r)=>addNewAnswer(temp_q))
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
  const submitForm = ()=>{
    console.log(question)
    var endpoint = 'http://localhost:8080/api/create/'
    // if(uid) endpoint =`http://178.128.109.94:8080/user/${uid}`
    fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ question:question, surveyId:surveyId})
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
 
 const debouncedSetAnswer = function(e){
    console.log(e)
    let q_id = e.target.id.split("==")[0]
    console.log(q_id)
    answer.forEach((v)=>{
        if(v.q_id == q_id){
            let temp_ans = v.answer
            if(v.q.qt_value == "ES" || v.q.qt_value == "ES"){
                temp_ans = e.target.value
            } else {
                if(temp_ans == null || temp_ans == "") temp_ans = []
                let i = temp_ans.indexOf(e.target.value)
                if (i !== -1) {
                    temp_ans.splice(i, 1);
                } else {
                    temp_ans.push(e.target.value)
                }
            }
            v.answer = temp_ans
        }
    })
    setAnswer(answer)
  }
  const handleSetAnswer=function(e) {
    clearTimeout(timer);
    timer = setTimeout(()=>{
        debouncedSetAnswer(e);
    }, 500);
  }
 const AddedAnswer = (props) => {
    console.log(props.data)
    data = props.data
    return <CCard>
            <CCardHeader>
                <h6 className="text-primary">{data.q.qt_valueName}</h6>
                <h4>{data.q.q_value}</h4>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    { data.q.qt_value == "ES"?
                    <CCol sm="12">
                        <CLabel>Jawaban Anda</CLabel>
                        <CTextarea
                        type="text"
                        multiline='true'
                        rows={4}
                        id={data.q_id + "==" + getRandomId()}
                        name={data.q_id + "==" + getRandomId()}
                        defaultValue={data.answer}
                        minLength="3"
                        onChange={handleSetAnswer}
                        />
                    </CCol>: null }
                    { data.q.qt_value == "SC"?
                    <CCol sm="12" >
                        <CLabel>Jawaban Anda</CLabel>
                        {data.q.ch_value.map((x) =>
                        <CFormGroup  key = {getRandomId()}>
                        {data.answer.includes(x.value) ?
                         <div><input type="checkbox" name={data.q_id + "==" + props.index}
                                id={data.q_id + "==" + props.index}
                                value={x.value}
                                key = {getRandomId()}
                                checked
                                onChange={handleSetAnswer} /><CLabel style={{marginLeft:'20px'}}>{x.value}</CLabel></div>
                        :
                            <div><input type="checkbox" name={data.q_id + "==" + props.index}
                                id={data.q_id + "==" + props.index}
                                value={x.value}
                                key = {getRandomId()}
                                onChange={handleSetAnswer} /><CLabel style={{marginLeft:'20px'}}>{x.value}</CLabel></div>
                        }
                        </CFormGroup>)}
                    </CCol> : null
                    }
                    { data.q.qt_value == "MC"?
                    <CCol sm="12">
                        <CLabel>Jawaban Anda</CLabel>
                        {data.q.ch_value.map((x) =>
                        <CFormGroup  key = {getRandomId()}>
                        {data.answer == x.value ?
                         <div><input type="radio" name={data.q_id + "==" + props.index}
                                id={data.q_id + "==" + props.index}
                                value={x.value}
                                key = {getRandomId()}
                                checked
                                onChange={handleSetAnswer} /><CLabel style={{marginLeft:'20px'}}>{x.value}</CLabel></div>
                        :
                            <div><input type="radio" name={data.q_id + "==" + props.index}
                                id={data.q_id + "==" + props.index}
                                value={x.value}
                                key = {getRandomId()}
                                onChange={handleSetAnswer} /><CLabel style={{marginLeft:'20px'}}>{x.value}</CLabel></div>
                        }
                        </CFormGroup>)}
                    </CCol> : null
                    }
                </CRow>
            </CCardBody>
            { props.index == props.len -1 ? 
                <CCardFooter>
                    { props.index < question.length -1?
                        <CRow>
                            <CCol sm="4">
                            <CButton
                                color="success"
                                onClick={()=>{addNewAnswer()}}
                            >Berikutnya</CButton>
                            </CCol>
                        </CRow>:
                        <CRow>
                        <CCol sm="4" className="offset-sm-8">
                        <CButton
                            color="primary"
                            onClick={()=>{submitForm()}}
                        >Simpan</CButton>
                        </CCol>
                    </CRow>}
                </CCardFooter>
                : null
            }
        </CCard>
  }
  const addNewAnswer=function(q=null) {
    let answers = answer
    if(!q) q = question[currentIndex]
    else q = q[currentIndex]
    data = {
        q : q,
        q_id: q.idnya,
        answer:"",
        index:currentIndex
    }
    answers.push(data)
    setAnswer(answers);
    forceUpdate()
    let i = currentIndex
    setCurrentIndex(i+=1)
    return null
  }
  return (
    <div className="c-app c-default-layout flex-column align-items-center">
      <CContainer style={{"marginTop":"40px"}}>
            { description!= null && title!= null?
            <CRow className="justify-content-center">
                <CCol sm="6">
                    <CCard>
                        <CCardHeader>
                            <h4>{title}</h4>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol sm="12">
                                    <p>{description}</p>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>:null}
            { question != []?
                answer.map((k,i) => {
                return <CRow className="justify-content-center" key={getRandomId()}>
                    <CCol md="6">
                    <AddedAnswer data={k} index={i} len={answer.length} key={getRandomId()}></AddedAnswer>
                    </CCol>
                </CRow>
                })
            : null }
      </CContainer>
    </div>
  )
}

export default SurveyResponse
