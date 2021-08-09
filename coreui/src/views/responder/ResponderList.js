import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCardFooter,
  CLink
} from '@coreui/react'

// import surveysData from './UsersData'


const getBadge = status => {
  switch (status) {
    case true: return 'danger'
    case false: return 'success'
    default: return 'success'
  }
}
const getOpenStatus = status=>{
    if(status == false) return "Ya"
    else return "Tidak"
}

const SurveyList = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [pagesCount, setPagesCount] = useState(1) 
  const [page, setPage] = useState(currentPage)
  const limit = 5
  const [surveysData, setSurveysData] = useState([]);
  const location = useLocation()
  const [baseUrl, setBaseUrl] = useState("");
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/surveys?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    fetch("http://localhost:8080/api/surveys/"+limit+"/"+(currentPage-1)).then(res=>res.json()).then(
      (result)=>{
        setPagesCount(result.pages)
        console.log(result)
        setSurveysData(result.data)
        let path = location.pathname
        let loc = window.location.href
        setBaseUrl(loc.split(path)[0])
      }
    )
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Siswa
            <Link to="/survey/create">
              <CButton className="float-right" color="primary">Tambah Siswa</CButton>
            </Link>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={surveysData}
            fields={[
              {  key: 'slug', label:'Share Url' },
              {  key: 'title', _classes: 'font-weight-bold' },
              'description',
              'created_at',
              {  key: 'is_closed', label:'Terima Jawaban' }
            ]}
            hover
            striped
            itemsPerPage={limit}
            activePage={page}
            clickableRows
            scopedSlots = {{
                'is_closed':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.is_closed)}>
                        {getOpenStatus(item.is_closed)}
                      </CBadge>
                    </td>
                  ),
                'slug':
                  (item)=>(
                    <td>
                      <CLink>{baseUrl + "/response/"+item.id}</CLink>
                    </td>
                  )
                }}
            onRowClick={(item) => history.push(`/survey/${item.id}`)}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={pagesCount}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SurveyList
