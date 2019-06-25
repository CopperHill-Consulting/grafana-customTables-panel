import { getValueFormat, getValueFormats } from '@grafana/ui';
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
    : getValueFormat(formatName);
}

module.exports = { getValueFormats: getGrafanaFormats, getValueFormat: getGrafanaFormat };
