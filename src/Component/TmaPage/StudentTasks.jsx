import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, Divider,
    Paper, Stack, Chip, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, LinearProgress, Tooltip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useApp } from '../../store';

export default function StudentTasks() {
    const { user, t } = useApp();
    const [tasks, setTasks] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [reportContent, setReportContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`/api/my_submissions?email=${user.email}`);
            if (res.data.success) setTasks(res.data.tasks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchTasks(); }, [user.email]);

    const openSubmitDialog = (task) => {
        setSelectedTask(task);
        setReportContent(task.submission_content || '');
        setDialogOpen(true);
    };

    const handleSubmit = async () => {
        if (!reportContent.trim()) return alert('請填寫回報內容');
        setSubmitting(true);
        try {
            const res = await axios.post('/api/submit_task', {
                student_email: user.email,
                task_id: selectedTask.task_id,
                submission_content: reportContent,
            });
            if (res.data.success) {
                setDialogOpen(false);
                fetchTasks(); // Refresh task statuses
            }
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3 }}>{t('myTasksTitle')}</Typography>

            <Grid container spacing={3}>
                {tasks.map((task) => {
                    const done = !!task.is_completed;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={task.task_id}>
                            <Card sx={{
                                height: '100%', position: 'relative', overflow: 'visible', mt: 2,
                                borderTop: `4px solid ${done ? '#4caf50' : '#ff9800'}`,
                            }}>
                                {/* Icon badge */}
                                <Box sx={{
                                    position: 'absolute', top: -20, left: 16,
                                    bgcolor: done ? 'success.main' : 'warning.main',
                                    color: 'white', borderRadius: '50%', p: 1, boxShadow: 3
                                }}>
                                    {done ? <CheckCircleIcon /> : <AssignmentIcon />}
                                </Box>

                                <CardContent sx={{ pt: 4 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                            {task.course_name}
                                        </Typography>
                                        <Chip
                                            label={done ? '已繳交' : '待繳交'}
                                            color={done ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </Stack>

                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {task.task_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
                                        {task.task_req || '無詳細說明'}
                                    </Typography>

                                    <Divider sx={{ my: 1.5 }} />

                                    {done && task.submission_content && (
                                        <Box sx={{ mb: 1.5, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                                            <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                                我的回報：
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
                                                {task.submission_content}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                        <AssignmentLateIcon fontSize="small" color="error" />
                                        <Typography variant="caption" color="error" fontWeight="bold">
                                            {t('deadline')}: {task.due_date || t('noDeadline')}
                                        </Typography>
                                    </Stack>

                                    <Button
                                        variant={done ? 'outlined' : 'contained'}
                                        color={done ? 'success' : 'primary'}
                                        fullWidth
                                        endIcon={done ? <CheckCircleIcon /> : <SendIcon />}
                                        onClick={() => openSubmitDialog(task)}
                                    >
                                        {done ? '修改回報' : t('goSubmit')}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}

                {tasks.length === 0 && (
                    <Paper sx={{ p: 4, textAlign: 'center', width: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
                        <EventAvailableIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">{t('noTasksYet')}</Typography>
                        <Typography variant="body2" color="text.secondary">{t('noTasksDesc')}</Typography>
                    </Paper>
                )}
            </Grid>

            {/* Dialog: 提交/修改回報 */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    📋 {selectedTask?.task_name}
                    <Typography variant="body2" color="text.secondary">
                        課程：{selectedTask?.course_name}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedTask?.task_req && (
                        <Box sx={{ mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                            <Typography variant="caption" fontWeight="bold" color="text.secondary">任務要求：</Typography>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>{selectedTask.task_req}</Typography>
                        </Box>
                    )}
                    <TextField
                        label="回報內容"
                        multiline
                        rows={6}
                        fullWidth
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="請在此填寫你的回報、心得或進度說明..."
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDialogOpen(false)} disabled={submitting}>取消</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={submitting}
                        endIcon={<SendIcon />}
                    >
                        {submitting ? '提交中...' : '確認提交'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
