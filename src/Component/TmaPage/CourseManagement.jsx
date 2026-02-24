import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { useApp } from '../../store';

export default function CourseManagement() {
    const { user, t } = useApp();
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', content: '' });

    const fetchCourses = async () => {
        try {
            const res = await axios.get('/api/courses');
            if (res.data.success) setCourses(res.data.courses);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleAddCourse = async () => {
        if (!newCourse.name) return alert(t('courseName') + '?');
        try {
            const res = await axios.post('/api/create_course', {
                teacher_email: user.email,
                course_name: newCourse.name,
                course_content: newCourse.content,
            });
            if (res.data.success) {
                alert(res.data.message);
                setNewCourse({ name: '', content: '' });
                fetchCourses();
            }
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>{t('courseTitle')}</Typography>

            <Card sx={{ mb: 4, p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>{t('addCourse')}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth label={t('courseName')} value={newCourse.name}
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label={t('courseContent')} value={newCourse.content}
                            onChange={(e) => setNewCourse({ ...newCourse, content: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleAddCourse}>
                            {t('createCourse')}
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            <Typography variant="h6" sx={{ mb: 2 }}>{t('currentCourses')}</Typography>
            <Grid container spacing={2}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="primary">{course.course_name}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {course.course_content || t('noCourseContent')}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 2, color: 'gray' }}>
                                    {t('instructor')}: {course.teacher_email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {courses.length === 0 && (
                    <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
                        {t('noCoursesYet')}
                    </Typography>
                )}
            </Grid>
        </Box>
    );
}
