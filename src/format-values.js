import { getValueFormat, getValueFormats } from "@grafana/data";
import * as JS from './external/YourJS.min';

const GRAFANA_FORMATS = getValueFormats().map(item => {
  if (item.text === 'Date & Time') {
    item.submenu.unshift({ text: 'Custom Format', value: 'dateTimeYourJS' });
  }
  return item;
});

function getGrafanaFormats() {
  return GRAFANA_FORMATS;
}

function getGrafanaFormat(formatName) {
  return formatName === 'dateTimeYourJS'
    ? (date, format) => JS.formatDate(date, format || '')
    : getValueFormat(formatName).text;
}

export { getGrafanaFormats as getValueFormats, getGrafanaFormat as getValueFormat };
