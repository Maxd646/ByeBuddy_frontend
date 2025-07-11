import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  AlertTitle,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  AlternateEmail as MentionIcon,
  Group as GroupIcon,
  AccountCircle as AccountIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  CloudDownload as CloudDownloadIcon,
  Clear as ClearIcon,
  Backup as BackupIcon,
  ViewList as ViewListIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    // Account Settings
    username: 'john_doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about open source',
    website: 'https://johndoe.dev',
    company: 'Tech Corp',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    securityAlerts: true,
    marketingEmails: false,
    followerUpdates: true,
    mentionNotifications: true,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowDirectMessages: true,
    showOnlineStatus: true,
    allowAnalytics: true,
    
    // Theme Settings
    theme: 'auto',
    fontSize: 16,
    contrast: 'normal',
    animations: true,
    reducedMotion: false,
    
    // Data Settings
    autoBackup: true,
    dataRetention: 365,
    exportFormat: 'json',
    syncFrequency: 'daily'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate saving
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      username: 'john_doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Full-stack developer passionate about open source',
      website: 'https://johndoe.dev',
      company: 'Tech Corp',
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      securityAlerts: true,
      marketingEmails: false,
      followerUpdates: true,
      mentionNotifications: true,
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowDirectMessages: true,
      showOnlineStatus: true,
      allowAnalytics: true,
      theme: 'auto',
      fontSize: 16,
      contrast: 'normal',
      animations: true,
      reducedMotion: false,
      autoBackup: true,
      dataRetention: 365,
      exportFormat: 'json',
      syncFrequency: 'daily'
    });
  };

  const tabs = [
    { label: 'Account', icon: <AccountIcon /> },
    { label: 'Notifications', icon: <NotificationsIcon /> },
    { label: 'Privacy', icon: <SecurityIcon /> },
    { label: 'Appearance', icon: <PaletteIcon /> },
    { label: 'Data', icon: <ViewListIcon /> }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(240,248,255,0.9) 0%, rgba(255,248,220,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      pt: 10,
      pb: 4,
      px: { xs: 2, md: 4 }
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 4, 
        textAlign: 'center',
        animation: `${fadeIn} 1s ease-out`,
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 2 
        }}>
          <Avatar sx={{ 
            width: 60, 
            height: 60, 
            background: 'linear-gradient(135deg, #43b649 0%, #f9d923 100%)',
            animation: `${pulse} 2s ease-in-out infinite`,
          }}>
            <SettingsIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Settings
            </Typography>
            <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
              Customize your experience
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Paper sx={{ 
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
        border: '2px solid rgba(255,255,255,0.3)',
        overflow: 'hidden',
        animation: `${fadeIn} 1s ease-out 0.2s both`,
      }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&.Mui-selected': {
                  color: '#43b649',
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#43b649',
                height: 3,
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab 
                key={tab.label}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {tab.icon}
                    {tab.label}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 4 }}>
          {activeTab === 0 && (
            <Box animation={`${fadeIn} 0.5s ease-out`}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1976d2' }}>
                Account Settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={settings.username}
                    onChange={(e) => handleSettingChange('username', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={settings.location}
                    onChange={(e) => handleSettingChange('location', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={3}
                    value={settings.bio}
                    onChange={(e) => handleSettingChange('bio', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={settings.website}
                    onChange={(e) => handleSettingChange('website', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={settings.company}
                    onChange={(e) => handleSettingChange('company', e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1976d2' }}>
                Social Links
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="GitHub"
                    placeholder="https://github.com/username"
                    // InputProps={{
                    //   startAdornment: <GitHubIcon sx={{ mr: 1, color: '#666' }} />
                    // }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    placeholder="https://twitter.com/username"
                    // InputProps={{
                    //   startAdornment: <TwitterIcon sx={{ mr: 1, color: '#1DA1F2' }} />
                    // }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    placeholder="https://linkedin.com/in/username"
                    // InputProps={{
                    //   startAdornment: <LinkedInIcon sx={{ mr: 1, color: '#0077B5' }} />
                    // }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 1 && (
            <Box animation={`${fadeIn} 0.5s ease-out`}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1976d2' }}>
                Notification Preferences
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                      Email Notifications
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Email Notifications" 
                          secondary="Receive notifications via email"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.emailNotifications}
                            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <ScheduleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Weekly Digest" 
                          secondary="Get a summary of your activity"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.weeklyDigest}
                            onChange={(e) => handleSettingChange('weeklyDigest', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <SecurityIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Security Alerts" 
                          secondary="Important security notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.securityAlerts}
                            onChange={(e) => handleSettingChange('securityAlerts', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                      Push Notifications
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <NotificationsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Push Notifications" 
                          secondary="Real-time notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.pushNotifications}
                            onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <GroupIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Follower Updates" 
                          secondary="When someone follows you"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.followerUpdates}
                            onChange={(e) => handleSettingChange('followerUpdates', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <MentionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Mentions" 
                          secondary="When someone mentions you"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.mentionNotifications}
                            onChange={(e) => handleSettingChange('mentionNotifications', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box animation={`${fadeIn} 0.5s ease-out`}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1976d2' }}>
                Privacy & Security
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Profile Visibility</InputLabel>
                    <Select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      label="Profile Visibility"
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                      <MenuItem value="friends">Friends Only</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Data Retention</InputLabel>
                    <Select
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
                      label="Data Retention"
                    >
                      <MenuItem value={30}>30 days</MenuItem>
                      <MenuItem value={90}>90 days</MenuItem>
                      <MenuItem value={365}>1 year</MenuItem>
                      <MenuItem value={0}>Forever</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                  Privacy Controls
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showEmail}
                          onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Email Address"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showPhone}
                          onChange={(e) => handleSettingChange('showPhone', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Phone Number"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showLocation}
                          onChange={(e) => handleSettingChange('showLocation', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Location"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.allowDirectMessages}
                          onChange={(e) => handleSettingChange('allowDirectMessages', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Allow Direct Messages"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>
          )}

          {activeTab === 3 && (
            <Box animation={`${fadeIn} 0.5s ease-out`}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1976d2' }}>
                Appearance & Accessibility
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      label="Theme"
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto (System)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Contrast</InputLabel>
                    <Select
                      value={settings.contrast}
                      onChange={(e) => handleSettingChange('contrast', e.target.value)}
                      label="Contrast"
                    >
                      <MenuItem value="normal">Normal</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                  Font Size
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={settings.fontSize}
                    onChange={(e, value) => handleSettingChange('fontSize', value)}
                    min={12}
                    max={24}
                    step={1}
                    marks={[
                      { value: 12, label: 'Small' },
                      { value: 16, label: 'Medium' },
                      { value: 20, label: 'Large' },
                      { value: 24, label: 'Extra Large' }
                    ]}
                    valueLabelDisplay="auto"
                    sx={{ color: '#43b649' }}
                  />
                </Box>
              </Card>

              <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                  Accessibility Options
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.animations}
                          onChange={(e) => handleSettingChange('animations', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Enable Animations"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.reducedMotion}
                          onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Reduced Motion"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>
          )}

          {activeTab === 4 && (
            <Box animation={`${fadeIn} 0.5s ease-out`}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1976d2' }}>
                Data Management
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                      Backup & Sync
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <BackupIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Auto Backup" 
                          secondary="Automatically backup your data"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.autoBackup}
                            onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CloudDownloadIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Export Data" 
                          secondary="Download your data"
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon />}
                            sx={{ color: '#43b649', borderColor: '#43b649' }}
                          >
                            Export
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, background: 'rgba(67,182,73,0.05)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#43b649' }}>
                      Data Controls
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <ClearIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Clear Cache" 
                          secondary="Free up storage space"
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ color: '#f44336', borderColor: '#f44336' }}
                          >
                            Clear
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DeleteIcon color="error" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Delete Account" 
                          secondary="Permanently delete your account"
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                          >
                            Delete
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mt: 3 }}>
                <AlertTitle>Data Privacy</AlertTitle>
                Your data is encrypted and stored securely. You can export your data at any time or request deletion of your account.
              </Alert>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        mt: 4,
        animation: `${fadeIn} 1s ease-out 0.5s both`,
      }}>
        <Button
          variant="outlined"
          onClick={handleReset}
          startIcon={<RefreshIcon />}
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: 3,
            borderColor: '#666',
            color: '#666',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#333',
              color: '#333',
            }
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #43b649 0%, #66bb6a 100%)',
            fontWeight: 600,
            boxShadow: '0 4px 20px rgba(67,182,73,0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #388e3c 0%, #43b649 100%)',
              boxShadow: '0 6px 25px rgba(67,182,73,0.4)',
            }
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
} 