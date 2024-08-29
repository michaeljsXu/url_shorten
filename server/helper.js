import dns from 'dns';

export function clean_url(url) {
  let full_url = url;
  if (!full_url.startsWith("http://") && !full_url.startsWith("https://")) {
    full_url = "http://" + url;
  }
  return full_url;
}

export async function lookupPromise(url) {
  return new Promise((resolve, reject) => {
    dns.lookup(url, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });
}