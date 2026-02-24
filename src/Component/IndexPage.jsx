import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Iframe from 'react-iframe';
import { useApp } from '../store';

export default function IndexPage() {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 },
        px: 2,
        textAlign: 'center',
        borderBottomLeftRadius: '50px',
        borderBottomRightRadius: '50px',
        mb: 6,
        boxShadow: 3
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            {t('heroTitle')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
            {t('heroSubtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/signup')}
              sx={{ px: 4, py: 1.5, fontSize: '1.2rem', borderRadius: 8 }}>
              {t('getStarted')}
            </Button>
            <Button variant="outlined" color="inherit" size="large" onClick={() => navigate('/signin')}
              sx={{ px: 4, py: 1.5, fontSize: '1.2rem', borderRadius: 8 }}>
              {t('logIn')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom sx={{ mb: 5 }}>
          {t('platformFeatures')}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2, borderRadius: 4, boxShadow: 2 }}>
              <CardContent>
                <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>{t('feature1Title')}</Typography>
                <Typography variant="body1" color="text.secondary">{t('feature1Desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2, borderRadius: 4, boxShadow: 2 }}>
              <CardContent>
                <AssignmentIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>{t('feature2Title')}</Typography>
                <Typography variant="body1" color="text.secondary">{t('feature2Desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2, borderRadius: 4, boxShadow: 2 }}>
              <CardContent>
                <EmojiPeopleIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>{t('feature3Title')}</Typography>
                <Typography variant="body1" color="text.secondary">{t('feature3Desc')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom sx={{ mb: 3 }}>
          {t('findUs')}
        </Typography>
        <Box sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
          <Iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.3390826391515!2d121.00146461483348!3d14.636683439779487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b74509509373%3A0x8f90c0140664e47e!2sMatch+Trend+training+and+assessment+center!5e0!3m2!1sfil!2sph!4v1566435916439!5m2!1sfil!2sph"
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
          />
        </Box>
      </Container>
    </Box>
  );
}
