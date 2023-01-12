import {HealthLevel} from '../shared/HealthLevel';

export function backgroundColorFromHealthLevel(healthLevel: HealthLevel, infra: boolean) {
    switch (healthLevel) {
        case HealthLevel.Green: {
            return infra ? '#66bb6a' : '#539a54';
        }
        case HealthLevel.Yellow: {
            return '#bcc900';
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
