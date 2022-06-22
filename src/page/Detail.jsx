import React from 'react'
import FetchData from '../utils/FetchData'
import Layout from '../component/Layout'
import { useParams } from 'react-router-dom'
import Wrapper from '../component/Wrapper'
import { TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { Button,Skeleton,Alert,Snackbar } from '@mui/material'

const Detail = () => {
    const params = useParams()
    const [taskContent, setTaskContent] = useState()
    const [taskDescription, setTaskDescription] = useState()
    const [loading, setLoading] = useState(true)
    const [snackbar,setSnackbar] = useState(false)
    const fetchGetData = async () => {
        FetchData(
            `https://api.todoist.com/rest/v1/tasks/${params.detail_id}`,
            'get'
        ).then((res) => {
            setTaskContent(res.content)
            setTaskDescription(res.description)
        })
        .catch((err) => alert(err))
        .finally(()=> setLoading(false))
    }
    
    const fetchUpdateData = async () => {
        const data = {content:taskContent,description:taskDescription}
        FetchData(
            `https://api.todoist.com/rest/v1/tasks/${params.detail_id}`,
            'post',
            data
        ).then(()=> setSnackbar(true))
        .catch((err) => alert(err))
        .finally(() => setLoading(false))
    }

    const updateData = () => {
        setLoading(true)
        fetchUpdateData()
    }

    const closeSnackbar = () => {
        setSnackbar(false)
    }

    useEffect(() => {
       fetchGetData() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!loading) {    
        return (
        <Layout>
            <Wrapper title="Detail Task">
                <div className='flex flex-col gap-4' >    
                    <TextField label="Task Content" value={taskContent} className='w-full' onChange={(e)=>setTaskContent(e.target.value)}></TextField>
                    <TextField label="Task Description" value={taskDescription} minRows={15} onChange={(e)=>setTaskDescription(e.target.value)} multiline></TextField>
                    <div className='flex justify-end'>
                        <Button variant='contained' color='success' onClick={()=>updateData()}>Update</Button>
                    </div>    
                </div>
                <Snackbar
                    anchorOrigin={{vertical:'top',horizontal:'center'}}
                    open={snackbar}
                    onClose={closeSnackbar}
                    autoHideDuration={2000}
                    >
                    <Alert variant='filled' onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                        Success To Update Task
                    </Alert>
                </Snackbar>    
            </Wrapper>
        </Layout>
      )
    } else {
        return (
            <Layout>
                <div className=' flex flex-col justify-start gap-0'>
                    <Skeleton animation="wave" height={80}/>
                    <Skeleton animation="wave" height={80}/>
                    <Skeleton animation="wave" height={80} />
                </div>
            </Layout>
        )
    }
}
export default Detail