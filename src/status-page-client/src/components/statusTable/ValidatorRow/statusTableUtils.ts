import { HealthLevel } from '../../../shared/HealthLevel';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

export function backgroundColorFromHealthLevel(healthLevel: HealthLevel) {
  switch (healthLevel) {
    case HealthLevel.Green: {
      return green['500'];
    }
    case HealthLevel.Yellow: {
      return yellow['500'];
    }
    case HealthLevel.Red: {
      return red['500'];
    }
    default: {
      throw new Error(`Unsupported health level of ${healthLevel}`);
    }
  }
}
