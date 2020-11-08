import { HealthLevel } from '../shared/HealthLevel';

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
    case HealthLevel.Gray: {
      return '#808080';
    }
    default: {
      throw new Error(`Unsupported health level of ${healthLevel}`);
    }
  }
}
