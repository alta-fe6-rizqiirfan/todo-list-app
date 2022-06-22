import React from 'react'
import FetchData from '../utils/FetchData'
import { useEffect,useState } from 'react'
import Layout from '../component/Layout'
import Button from '@mui/material/Button';
import { TextField,Alert,Snackbar,Skeleton,Box } from '@mui/material'
import { BsCheckLg } from 'react-icons/bs'
import { FaTimes,FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../component/Wrapper';

const Homepage = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState({})
    const [newContent,setNewContent] = useState('')
    const [newDescription,setNewDescription] = useState('')
    const [display,setDisplay] = useState({})
    const [loading, setLoading] = useState(true)
    const [snackbar, setSnackbar] = useState(false)
    const [contentCheck, setContentCheck] = useState(false)
    const [descriptionCheck, setDescriptionCheck] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')
    
    
    
    const fetchDataTask = async () => {
        FetchData(
        'https://api.todoist.com/rest/v1/tasks?project_id=2293674381',
        'get'
        ).then((res) => {
            setTask(res)
        }).catch((err) => console.log(err))
        .finally(() =>
            setLoading(false)
        )
    }
    
    const fetchCreateTask = async () => {
        const data = {content:newContent,description:newDescription}
        FetchData(
        'https://api.todoist.com/rest/v1/tasks?project_id=2293674381',
        'post',
        data
        ).then(()=> setSnackbar(true))
        .catch((err) => console.log(err))
        .finally(() => {
            fetchDataTask()
            setAlertColor('success')
            setAlertMessage('Success to create task')
            setNewContent('')
            setNewDescription('')
        })
    }
    
    const fetchToCompleteTask = async (taskId,content) => {
        FetchData(
        `https://api.todoist.com/rest/v1/tasks/${taskId}/close`,
        'post',
        ).then(()=> setSnackbar(true))
        .catch((err) => console.log(err))
        .finally(() => {
            fetchDataTask()
            setAlertColor('success')
            setAlertMessage(`Success to complete task ${content}`)
        })
    }

    const fetchDeleteTask = async (taskId,content) => {
        FetchData(
        `https://api.todoist.com/rest/v1/tasks/${taskId}`,
        'delete',
        ).then(()=> setSnackbar(true))
        .catch((err) => console.log(err))
        .finally(() => {
            fetchDataTask()
            setAlertColor('error')
            setAlertMessage(`Success to delete task ${content}`)
        })
    }

    useEffect(() => {
        setDisplay(task)
    },[task])

    useEffect(() => {
        fetchDataTask()
    },[])

    const createTask = () => {
        if (newContent && newDescription) {
            setLoading(true)
            fetchCreateTask()
        } else {
            if (!newContent) {
                setContentCheck(true)
            }
            if (!newDescription) {
                setDescriptionCheck(true)
            }
        }
    }

    const deleteTask = (taskId,content) => {
        setLoading(true)
        fetchDeleteTask(taskId,content)
    }

    const toCompleteTask = (taskId,content) => {
        setLoading(true)
        fetchToCompleteTask(taskId,content)
    }
    
    const closeSnackbar = () => {
        setSnackbar(false)
    }

    const search = (e) => {
        const searchName = e.target.value
        if (searchName.length > 0) {
            const idx = task.filter((taskSearch) => taskSearch.content.toLowerCase() === searchName.toLowerCase())
            setDisplay(idx)
        } else {
            setDisplay(task)
        }
            
    }

    if (!loading ) {
        return (
            <Layout>
                <Wrapper title="Add Task">
                    <div className='flex flex-col gap-4'>
                        <TextField id="outlined-basic" error={contentCheck} value={newContent} label="Task Content" variant="outlined" className='w-full' helperText="*Please fill this field" onChange={(e)=>setNewContent(e.target.value)} />
                        <TextField id="outlined-basic" error={descriptionCheck} value={newDescription} label="Task Description" variant="outlined" className='w-full' helperText="*Please fill this field" multiline minRows={3} onChange={(e) => setNewDescription(e.target.value)} />
                        <Button variant='contained' color="success" onClick={()=>createTask()}><FaPlus className='mr-1'/> Task</Button> 
                    </div>
                </Wrapper>
                <Wrapper title="List Task">
                    <div className='my-4'>
                        <TextField id="outlined-basic" label="Search Task..." variant="outlined" className='w-full' onChange={(e) =>search(e)} />
                    </div>
                    {display.length > 0 ? (
                        <div className='grid grid-cols-1 xl:grid-cols-3 gap-2'>
                            {display.map((item) => {
                                return (
                                    <div className='flex border-2 rounded-md p-3 justify-between items-center' key={item.id}>
                                        <div className='w-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/Detail/${item.id}`)}>
                                            <p className='font-bold truncate'>{item.content}</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button variant='outlined' className='p-0' onClick={()=>toCompleteTask(item.id,item.content)}><BsCheckLg /></Button>
                                            <Button variant='outlined' color='error' onClick={()=>deleteTask(item.id,item.content)}><FaTimes /></Button>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>) : (
                            <div className='flex flex-col h-[50vh] items-center justify-center'>
                                <p className='text-slate-400 text-xl xl:text-5xl'> No Results </p>
                                <p className='font-bold mt-4'>Clear search to show all task</p>
                            </div>
                    )}
                    <Snackbar
                        anchorOrigin={{vertical:'top',horizontal:'center'}}
                        open={snackbar}
                        onClose={closeSnackbar}
                        autoHideDuration={2000}
                        >
                        <Alert variant='filled' onClose={closeSnackbar} severity={alertColor} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>  
                </Wrapper>
            </Layout>
        )
    } else {
        let skeleton = []
        for (let i = 0; i < 6; i++) {
            skeleton.push(<Box key={i}>
                        <Skeleton animation="wave" height={80}/>
                    </Box>)
        }
        return (
            <Layout>
                <div className='xl:p-4'>
                    {skeleton}
                </div>
            </Layout>
        )
    }
}
export default Homepage