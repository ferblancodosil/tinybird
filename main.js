import './style.css';
import { DATE_PARAMETER, FILTER_PARAMETERS } from '@/env.js';
import { getUrlParam } from '@/utils';
import * as tablesComponent from '@/components/table/index.js';

const refreshDate = async (event) => {
  if (document.getElementById(DATE_PARAMETER).value) document.getElementById(FILTER_PARAMETERS).value = `toDate(tpep_pickup_datetime) = '${document.getElementById('tpep_pickup_datetime').value}'`;
}
const initPickup = async () => {
  document.getElementById(`${DATE_PARAMETER}_form`).onsubmit = refreshDate;
  const date = getUrlParam(DATE_PARAMETER);
  if (date) document.getElementById(DATE_PARAMETER).value = date;
}
const init = async () => {
  await initPickup()
  tablesComponent.load();
}
init()
