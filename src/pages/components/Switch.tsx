import React from 'react';
import { withStyles, createStyles } from '@mui/styles';
import { Switch, SwitchClassKey, SwitchProps, FormControlLabel } from '@mui/material';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme) =>
  createStyles({
    root: {
      width: 40,
      height: 21,
      padding: 0,
      // margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: 'theme.palette.primary.main',
          opacity: 1,
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 13,
      height: 13,
      position: 'relative',
      top: '3px',
      left: '5px'
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: '#BCC6BC',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function CustomizedSwitches(props: any) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props?.setValue(!props.value)
  };

  return (
    <>
      <FormControlLabel
        //@ts-ignore
        control={<IOSSwitch checked={props.value} onChange={handleChange} name="checkedB" />}
        label=''
      />
    </>
  );
}