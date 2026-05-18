// load-test.js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,          // 50 concurrent virtual users
  duration: '30s',  // run for 30 seconds
};

export default function () {
  http.get('https://zwemvereniginglanaken.be/');
  sleep(1);  // each user waits 1s between requests
}