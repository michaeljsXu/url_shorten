// cleans a url of everything except its domain
// this is then passed to dns to check if exists
export function clean_url(url) {
  let cleaned_url;

  if (url.indexOf("://") != -1)
  {
    // remove protocol
    cleaned_url = url.split('/')[2];
  } 

  // remove everything after .com
  cleaned_url = url.split('/')[0];
  // remove port
  cleaned_url = cleaned_url.split(':')[0];
  // remove params
  cleaned_url = cleaned_url.split('?')[0];

  return cleaned_url;
}

// given a url, if it does not have the protocol, add one
export function http_url(url) {
  if (url.indexOf("://") == -1)
  {
    url = "http://" + url;
  }
  return url;
}