import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl, Card, Grid } from '@mui/material';
import axios from 'axios';
import { useApp } from '../../store';

export default function AssignTasks() {
    const { user, t } = useApp();
    const [courses, setCourses] = useState([]);
    const [newTask, setNewTask] = useState({ course_id: '', task_name: '', task_req: '', due_date: '' });

    useEffect(() => {
        axios.get('/api/courses').then(res => { if (res.data.success) setCourses(res.data.courses); });
    }, []);

    const handleAssignTask = async () => {
        if (!newTask.course_id || !newTask.task_name) return alert(t('selectCourse') + ' / ' + t('taskTitle'));
        try {
            const res = await axios.post('/api/create_task', { teacher_email: user.email, ...newTask });
            if (res.data.success) {
                alert(res.data.message);
                setNewTask({ ...newTask, task_name: '', task_req: '', due_date: '' });
            }
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>{t('assignTitle')}</Typography>

            <Card sx={{ mb: 4, p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('assignTitle')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>{t('selectCourse')}</InputLabel>
                            <Select value={newTask.course_id} onChange={(e) => setNewTask({ ...newTask, course_id: e.target.value })} label={t('selectCourse')}>
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>{course.course_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth label={t('taskTitle')} value={newTask.task_name}
                            onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField fullWidth type="date" label={t('dueDate')} InputLabelProps={{ shrink: true }}
                            value={newTask.due_date} onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label={t('taskReq')} value={newTask.task_req}
                            onChange={(e) => setNewTask({ ...newTask, task_req: e.target.value })} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleAssignTask}>
                            {t('publishTask')}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}
