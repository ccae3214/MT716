import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Divider,
    Accordion, AccordionSummary, AccordionDetails,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Stack, LinearProgress, Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';
import { useApp } from '../../store';

export default function TeacherProgress() {
    const { user } = useApp();
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`/api/teacher_tasks?email=${user.email}`);
            if (res.data.success) setTasks(res.data.tasks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchTasks(); }, [user.email]);

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
                📊 Student Progress（學生任務進度）
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                點擊展開每項任務，可查看所有選修學生的完成情況與回報內容。
            </Typography>

            {tasks.length === 0 && (
                <Paper sx={{ p: 4, textAlign: 'center', boxShadow: 0 }}>
                    <AssignmentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 1 }} />
                    <Typography color="text.secondary">目前還沒有指派任何任務。</Typography>
                </Paper>
            )}

            {tasks.map((task) => {
                const total = task.submissions?.length || 0;
                const done = task.submissions?.filter(s => s.is_completed).length || 0;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;

                return (
                    <Accordion key={task.id} sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' }, boxShadow: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ width: '100%' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="bold">{task.task_name}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            課程：{task.course_name} ｜ 截止：{task.due_date || '未設定'}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 2 }}>
                                        <Chip icon={<GroupIcon />} label={`${done} / ${total} 已完成`}
                                            color={pct === 100 ? 'success' : pct > 0 ? 'warning' : 'default'} size="small" />
                                    </Stack>
                                </Stack>

                                {/* Progress bar */}
                                <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={pct}
                                        color={pct === 100 ? 'success' : 'primary'}
                                        sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                                    />
                                    <Typography variant="caption" fontWeight="bold" sx={{ minWidth: 35 }}>
                                        {pct}%
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>

                        <AccordionDetails sx={{ pt: 0 }}>
                            {task.task_req && (
                                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                                    <Typography variant="caption" fontWeight="bold" color="text.secondary">任務要求：</Typography>
                                    <Typography variant="body2">{task.task_req}</Typography>
                                </Box>
                            )}

                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                                            <TableCell><b>學生 Email</b></TableCell>
                                            <TableCell align="center"><b>狀態</b></TableCell>
                                            <TableCell><b>回報內容</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {task.submissions?.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={3} align="center" sx={{ color: 'text.secondary' }}>
                                                    尚無學生選修此課程
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {task.submissions?.map((sub, idx) => (
                                            <TableRow key={idx} sx={{ '&:last-child td': { border: 0 } }}>
                                                <TableCell>{sub.student_email}</TableCell>
                                                <TableCell align="center">
                                                    {sub.is_completed
                                                        ? <Chip icon={<CheckCircleIcon />} label="已繳交" color="success" size="small" />
                                                        : <Chip icon={<PendingIcon />} label="未繳交" color="default" size="small" />
                                                    }
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 300 }}>
                                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                        {sub.submission_content || <span style={{ color: 'gray' }}>（尚未回報）</span>}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
}
