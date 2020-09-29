import { HealthLevel } from '../../../shared/HealthLevel';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

export function backgroundColorFromHealthLevel(healthLevel: HealthLevel) {
  switch (healthLevel) {
    case HealthLevel.Green: {
      return '#66bb6a';
    }
    case HealthLevel.Yellow: {
      return '#c18223';
    }
    case HealthLevel.Red: {
      return '#d32f2f';
    }
    default: {
      throw new Error(`Unsupported health level of ${healthLevel}`);
    }
  }
}
