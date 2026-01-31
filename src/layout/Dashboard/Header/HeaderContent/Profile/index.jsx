import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';

// ==============================|| TAB PANEL ||============================== //
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const theme = useTheme();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 🔐 Logout logic (replace with real auth later)
  const handleLogout = () => {
    console.log('User logged out');
    setOpen(false);
    // example:
    // localStorage.clear();
    // navigate('/login');
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 'auto' }}>
      <Tooltip title="Account" disableInteractive>
        <ButtonBase
          ref={anchorRef}
          onClick={handleToggle}
          sx={{
            p: 0.25,
            borderRadius: 1,
            '&:focus-visible': {
              outline: `2px solid ${theme.vars.palette.primary.main}`,
              outlineOffset: 2
            }
          }}
        >
          <Avatar
            alt="TurboEats User"
            src={avatar1}
            size="sm"
            sx={{ '&:hover': { outline: '1px solid', outlineColor: 'primary.main' } }}
          />
        </ButtonBase>
      </Tooltip>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: { offset: [0, 9] }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.vars.customShadows.z1, width: 290 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar src={avatar1} sx={{ width: 32, height: 32 }} />
                        <Stack>
                          <Typography variant="h6">TurboEats Admin</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Restaurant Manager
                          </Typography>
                        </Stack>
                      </Stack>

                      <Tooltip title="Logout">
                        <IconButton color="text.primary" onClick={handleLogout}>
                          <LogoutOutlined />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                      <Tab
                        icon={<UserOutlined />}
                        label="Profile"
                        {...a11yProps(0)}
                        sx={{ textTransform: 'capitalize', gap: 1 }}
                      />
                      <Tab
                        icon={<SettingOutlined />}
                        label="Settings"
                        {...a11yProps(1)}
                        sx={{ textTransform: 'capitalize', gap: 1 }}
                      />
                    </Tabs>
                  </Box>

                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab handleLogout={handleLogout} />
                  </TabPanel>

                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};
