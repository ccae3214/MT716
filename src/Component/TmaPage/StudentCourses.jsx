import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Divider, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import { useApp } from '../../store';

export default function StudentCourses() {
    const { user, t } = useApp();
    const [allCourses, setAllCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);

    const fetchAllCourses = async () => {
        try {
            const res = await axios.get('/api/courses');
            if (res.data.success) setAllCourses(res.data.courses);
        } catch (err) { console.error(err); }
    };

    const fetchMyCourses = async () => {
        try {
            const res = await axios.get(`/api/student_courses?email=${user.email}`);
            if (res.data.success) setMyCourses(res.data.courses);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        fetchAllCourses();
        fetchMyCourses();
    }, [user.email]);

    const handleEnroll = async (course_id) => {
        try {
            const res = await axios.post('/api/enroll_course', { student_email: user.email, course_id });
            if (res.data.success) {
                alert(res.data.message);
                fetchMyCourses();
            }
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    const myCourseIds = myCourses.map(c => c.id);

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>{t('myCoursesTitle')}</Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>{t('enrolledCourses')}</Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                {myCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <Card sx={{ height: '100%', borderTop: '4px solid #1976d2', boxShadow: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <SchoolIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6" color="primary" noWrap>{course.course_name}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 40 }}>
                                    {course.course_content || t('noCourseContent')}
                                </Typography>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="caption" display="block" sx={{ color: 'gray' }}>
                                    {t('instructor')}: {course.teacher_email}
                                </Typography>
                                <Chip label={t('studying')} color="success" size="small" sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {myCourses.length === 0 && (
                    <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                        {t('noEnrolled')}
                    </Typography>
                )}
            </Grid>

            <Typography variant="h6" sx={{ mb: 2 }}>{t('allCourses')}</Typography>
            <Grid container spacing={2}>
                {allCourses.map((course) => {
                    const isEnrolled = myCourseIds.includes(course.id);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card sx={{ height: '100%', opacity: isEnrolled ? 0.6 : 1 }}>
                                <CardContent>
                                    <Typography variant="h6" color="secondary">{course.course_name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {course.course_content || t('noCourseContent')}
                                    </Typography>
                                    <Typography variant="caption" display="block" sx={{ mt: 2, mb: 2, color: 'gray' }}>
                                        {t('openedBy')}: {course.teacher_email}
                                    </Typography>
                                    <Button variant={isEnrolled ? "outlined" : "contained"} color={isEnrolled ? "secondary" : "primary"}
                                        fullWidth size="small" disabled={isEnrolled} onClick={() => handleEnroll(course.id)}>
                                        {isEnrolled ? t('enrolled') : t('enroll')}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
