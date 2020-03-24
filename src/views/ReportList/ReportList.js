import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import API from '../../services'

import { PostsToolbar as ReportsToolbar, PostsTable as ReportsTable } from './components';
import Modal from './components/modal'
import Information from './components/normalInformation'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ReportList = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("")
  const [selectedReport, setSelectedReport] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [maxSize, setMax] = useState(0)
  const [reports, setReports] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [info, setInfo] = useState({})

  const selectionProp = [selectedReport, setSelectedReport]
  const pageProp = [page, setPage]
  const maxProp = [maxSize, setMax]
  const rowsProp = [rowsPerPage, setRowsPerPage]

  useEffect(() => {

    fetchData()

  },[rowsPerPage, page, search])

  const fetchData = async() => {

    let query = search ? `title=$reg=${search}.*` : undefined
    
    let res = await API.getReport(page + 1, rowsPerPage, query)

    let data = res.data
    console.log(data);
    
    const allTypes = ["feedback", "bug", "user", "post"]
    const allThai = [
      "ให้ข้อเสนอแนะเกี่ยวกับผลิตภัณฑ์",
      "รายงานบัก",
      "รายงานผู้ใช้",
      "รายงานเกี่ยวกับประกาศ"
    ]

    setMax(data.total)
    let reports = data.items.map((report) => {

      let index = allTypes.indexOf(report.type)
      let type = allThai[index]

      return {
        id: report._id,
        title: report.message,
        type: type,
        name: report.user ? (report.user.name || report.user.email) : "Removed",
        post: report.post,
        message: report.message
        
      }

    })

    setReports(reports)

  }

  const onSearch = ({target:{value}}) => {

    setSearch(value)

  }

  const onDelete = async() => {

    await Promise.all(selectedReport.map((reportId) => API.getReport(reportId)))
    await fetchData()

  }

  const openModal = (info) => {
    
    setInfo(info)
    console.log(info);
    
    setOpen(true)

  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <ReportsToolbar
        onSearch={onSearch}
        onDelete={onDelete}

      />
      <div className={classes.content}>
        <ReportsTable
          users={reports}
          selectionUser={selectionProp}
          pageProp={pageProp}
          maxProp={maxProp}
          rowsProp={rowsProp}
          action={openModal}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} >
        <Information info={info} />
      </Modal>

    </div>
  );
};

export default ReportList;
