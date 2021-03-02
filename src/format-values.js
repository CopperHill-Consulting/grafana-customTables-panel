import { getValueFormat, getValueFormats } from "@grafana/data";
import * as JS from './external/YourJS.min';

// Add our custom CHC functionality to the list of unit formats.
const GRAFANA_FORMATS = getValueFormats().concat([
  {
    text: 'Advanced (CHC)',
    submenu: [
      { text: 'Custom Date Format', value: 'dateTimeYourJS' }
    ]
  }
]);

function getGrafanaFormats() {
  return GRAFANA_FORMATS;
}

function getGrafanaFormat(formatName) {
  return formatName === 'dateTimeYourJS'
    ? (date, format) => ({ text: JS.formatDate(date, format || '') })
    : getValueFormat(formatName);
}

export { getGrafanaFormats as getValueFormats, getGrafanaFormat as getValueFormat };
